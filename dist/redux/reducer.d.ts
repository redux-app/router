import { IRouteMatch } from '../classes/Router';
import { QueryParams } from 'route-recognizer';
import { Action } from 'redux';
export interface IRouterState {
    routes: IRouteMatch[];
    queryParams: QueryParams;
    path: string;
    search: string;
    hash: string;
    isNavigating: boolean;
}
export declare function routerReducer(state: IRouterState | undefined, action: Action): IRouterState;
