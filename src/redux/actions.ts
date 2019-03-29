import { Route } from '..';
import { IRouteParams } from '../classes/Route';
import { QueryParams } from 'route-recognizer';
import { IRouteMatches } from '../classes/Router';
import { Location } from 'history';

export enum ROUTER {
  NAVIGATE = '@router::navigate',
  SET_MATCH = '@router::setMatch'
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

export function navigate(payload: IRouterNavigateActionPayload): IRouterNavigateAction {
  const type = ROUTER.NAVIGATE;
  return { type, payload };
}

export interface IRouterSetMatchActionPayload {
  match: IRouteMatches;
  location: Location;
}

export interface IRouterSetMatchAction {
  type: ROUTER.SET_MATCH;
  payload: IRouterSetMatchActionPayload;
}

export function setMatch(payload: IRouterSetMatchActionPayload): IRouterSetMatchAction {
  const type = ROUTER.SET_MATCH;
  return { type, payload };
}

export type TRouterAction =
  IRouterNavigateAction |
  IRouterSetMatchAction;
