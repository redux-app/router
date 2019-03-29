import RouteRecognizer from 'route-recognizer';
import { RouterException } from '../exceptions/RouterException';
import { setMatch } from '../redux/actions';
const recognizer = new RouteRecognizer();
export class Router {
    constructor(config, history) {
        this.config = config;
        this.history = history;
        this.urlChangeHandlers = [];
        this.unsubscribe = () => { };
        if (!this.config.routerKey)
            this.config.routerKey = 'router';
        this.mapRoutes();
    }
    static createInstance(config, history) {
        this.instance = new Router(config, history);
        return this.instance;
    }
    static getInstance() {
        if (!this.instance)
            throw new RouterException('Router is not initialized yet');
        return this.instance;
    }
    navigate(route, params = {}, queryParams = {}) {
        if (route.visitable)
            setTimeout(() => this.history.push(route.generateUrl(params) + this.serializeQueryParams(queryParams)), 0);
    }
    onUrlChange(handler) {
        this.urlChangeHandlers.push(handler);
    }
    start() {
        this.unsubscribe = this.history.listen(this.handleUrlChange.bind(this));
        this.handleUrlChange(this.history.location);
    }
    stop() {
        this.unsubscribe();
    }
    mapRoutes() {
        const { routeMap } = this.config;
        const routes = Object.keys(routeMap).map((name) => routeMap[name]);
        Object.keys(routeMap).forEach((name) => {
            const route = routeMap[name];
            const parts = [];
            let unresolvedPath = '';
            route.path.replace(/^\//, '').split('/').reduce((path, segment) => {
                const next = `${path}/${segment}`;
                unresolvedPath += `/${segment}`;
                const route = routes.find(route => route.path === next);
                if (route) {
                    parts.push({ path: `/${unresolvedPath}`, handler: route });
                    unresolvedPath = '';
                }
                return next;
            }, '');
            recognizer.add(parts, { as: name });
        });
    }
    handleUrlChange(location) {
        const { pathname, search, hash } = location;
        const match = recognizer.recognize(pathname + search + hash) || this.createNotFoundMatch();
        this.config.store.dispatch(setMatch({ match, location }));
        this.urlChangeHandlers.forEach(handler => handler({ match, location }));
    }
    createNotFoundMatch() {
        const result = [{ handler: this.config.notFoundRoute, params: {}, }];
        result.queryParams = {};
        return result;
    }
    serializeQueryParams(queryParams = {}) {
        const params = Object.keys(queryParams).reduce((result, key) => {
            const value = queryParams[key];
            return `${result}&${key}=${value}`;
        }, '');
        return params.length ? `?${params}` : '';
    }
}
Router.instance = null;
