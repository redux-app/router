import { History, Location } from 'history';
import RouteRecognizer, { Result, QueryParams } from 'route-recognizer';
import Route, { IRouteParams } from './Route';
import { ServiceRoute } from './ServiceRoute';
import { RouterException } from '../exceptions/RouterException';
import { Store } from 'redux';
import { setMatch, IRouterSetMatchActionPayload } from '../redux/actions';

const recognizer = new RouteRecognizer();

export class Router<T extends Store> {

  private static instance: Router<any> | null = null;

  public static createInstance<T extends Store>(config: IRouterConfig<T>, history: History) : Router<T> {
    this.instance = new Router(config, history);
    return this.instance;
  }

  public static getInstance<T extends Store>() : Router<T> {
    if (!this.instance) throw new RouterException('Router is not initialized yet');
    return this.instance;
  }

  private readonly urlChangeHandlers: UrlChangeHandler[] = [];
  private unsubscribe = () => {};

  private constructor(
    public readonly config: IRouterConfig<T>,
    private readonly history: History
  ) {
    if (!this.config.routerKey)
      this.config.routerKey = 'router';
    this.mapRoutes();
  }

  public navigate(route: Route, params: IRouteParams = {}, queryParams: QueryParams = {}) {
    if (route.visitable) setTimeout(() =>
      this.history.push(route.generateUrl(params) + this.serializeQueryParams(queryParams)), 0
    )
  }

  public onUrlChange(handler: UrlChangeHandler): void {
    this.urlChangeHandlers.push(handler);
  }

  public start() : void {
    this.unsubscribe = this.history.listen(this.handleUrlChange.bind(this));
    this.handleUrlChange(this.history.location);
  }

  public stop() : void {
    this.unsubscribe();
  }

  private mapRoutes() {
    const { routeMap } = this.config;
    const routes = Object.keys(routeMap).map((name: string) => routeMap[name]);

    Object.keys(routeMap).forEach((name: string) => {
      const route = routeMap[name];
      const parts: RouteRecognizerSegment[] = [];
      let unresolvedPath = '';

      route.path.replace(/^\//, '').split('/').reduce((path: string, segment: string) => {
        const next = `${path}/${segment}`;
        unresolvedPath += `/${segment}`;

        const route = routes.find(route => route.path === next);
        if (route) {
          parts.push({ path: `/${unresolvedPath}`, handler: route });
          unresolvedPath = '';
        }

        return next;
      }, '')

      recognizer.add(parts, { as: name });
    })
  }

  private handleUrlChange(location: Location) : void {
    const { pathname, search, hash } = location;
    const match = (recognizer.recognize(pathname + search + hash) as unknown as IRouteMatches) || this.createNotFoundMatch();
    this.config.store.dispatch(setMatch({ match, location }));
    this.urlChangeHandlers.forEach(handler => handler({ match, location }));
  }

  private createNotFoundMatch() : IRouteMatches {
    const result: any = [{ handler: this.config.notFoundRoute, params: {},  }];
    result.queryParams = {};
    return result as IRouteMatches;
  }

  private serializeQueryParams(queryParams: QueryParams = {}) : string {
    const params =  Object.keys(queryParams).reduce((result: string, key: string) => {
      const value = queryParams[key];
      return `${result}&${key}=${value}`;
    }, '');
    return params.length ? `?${params}` : '';
  }

}

export interface IRouterConfig<T extends Store> {
  routeMap: IRouteMap;
  notFoundRoute: ServiceRoute;
  store: T;
  routerKey?: string;
}

export interface IRouteMap {
  [name: string]: Route;
}

export interface IRouteMatch extends Result {
  handler: Route;
}

export interface IRouteMatches extends ArrayLike<IRouteMatch | undefined> {
  queryParams: QueryParams;
  slice: (start?: number, end?: number) => IRouteMatch[];
}

export type UrlChangeHandler = (payload: IRouterSetMatchActionPayload) => void;

type RouteRecognizerSegment = { path: string, handler: Route }
