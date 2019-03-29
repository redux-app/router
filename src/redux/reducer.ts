import { IRouteMatch } from '../classes/Router';
import { QueryParams } from 'route-recognizer';
import { Action } from 'redux';
import {
  ROUTER,
  IRouterNavigateAction,
  IRouterSetMatchAction,
  IRouterNavigateActionPayload,
  IRouterSetMatchActionPayload
} from './actions';
import getRouter from '../helpers/getRouter';

export interface IRouterState {
  routes: IRouteMatch[];
  queryParams: QueryParams;
  path: string;
  search: string;
  hash: string;
  isNavigating: boolean;
}

const defaultState: IRouterState = {
  routes: [],
  queryParams: {},
  path: '',
  search: '',
  hash: '',
  isNavigating: false
}

export function routerReducer(state: IRouterState = defaultState, action: Action): IRouterState {

  switch (action.type) {

    case ROUTER.NAVIGATE:
      return handleNavigateAction(state, (action as IRouterNavigateAction).payload);

    case ROUTER.SET_MATCH:
      return handleSetMatchAction(state, (action as IRouterSetMatchAction).payload);

    default:
      return state;

  }

}

function handleNavigateAction(state: IRouterState, { route, params, queryParams }: IRouterNavigateActionPayload): IRouterState {
  getRouter().navigate(route, params, queryParams);
  return { ...state, isNavigating: true };
}

function handleSetMatchAction(state: IRouterState, { match, location }: IRouterSetMatchActionPayload): IRouterState {
  const { pathname: path, search, hash } = location;
  const routes = match.slice();
  const queryParams = match.queryParams;
  const isNavigating = false;

  return { ...state, routes, queryParams, path, search, hash, isNavigating }
}
