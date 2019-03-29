import { Route } from '..';
import { IRouteParams } from '../classes/Route';
import { QueryParams } from 'route-recognizer';
import { IRouteMatches } from '../classes/Router';
import { Location } from 'history';
export declare enum ROUTER {
    NAVIGATE = "@router::navigate",
    SET_MATCH = "@router::setMatch"
}
export interface IRouterNavigateActionPayload {
    route: Route;
    params?: IRouteParams;
    queryParams?: QueryParams;
}
export interface IRouterNavigateAction {
    type: ROUTER.NAVIGATE;
    payload: IRouterNavigateActionPayload;
}
export declare function navigate(payload: IRouterNavigateActionPayload): IRouterNavigateAction;
export interface IRouterSetMatchActionPayload {
    match: IRouteMatches;
    location: Location;
}
export interface IRouterSetMatchAction {
    type: ROUTER.SET_MATCH;
    payload: IRouterSetMatchActionPayload;
}
export declare function setMatch(payload: IRouterSetMatchActionPayload): IRouterSetMatchAction;
export declare type TRouterAction = IRouterNavigateAction | IRouterSetMatchAction;
