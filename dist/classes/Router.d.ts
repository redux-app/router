import { History } from 'history';
import { Result, QueryParams } from 'route-recognizer';
import Route, { IRouteParams } from './Route';
import { ServiceRoute } from './ServiceRoute';
import { Store } from 'redux';
import { IRouterSetMatchActionPayload } from '../redux/actions';
export declare class Router<T extends Store> {
    readonly config: IRouterConfig<T>;
    private readonly history;
    private static instance;
    static createInstance<T extends Store>(config: IRouterConfig<T>, history: History): Router<T>;
    static getInstance<T extends Store>(): Router<T>;
    private readonly urlChangeHandlers;
    private unsubscribe;
    private constructor();
    navigate(route: Route, params?: IRouteParams, queryParams?: QueryParams): void;
    onUrlChange(handler: UrlChangeHandler): void;
    start(): void;
    stop(): void;
    private mapRoutes;
    private handleUrlChange;
    private createNotFoundMatch;
    private serializeQueryParams;
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
export declare type UrlChangeHandler = (payload: IRouterSetMatchActionPayload) => void;
