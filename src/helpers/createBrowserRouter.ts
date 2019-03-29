import { BrowserHistoryBuildOptions, createBrowserHistory } from 'history';
import { IRouterConfig, Router } from '../classes/Router';
import { createRouter } from './createRouter';
import { Store } from 'redux';

export interface IBrowserRouterConfig<T extends Store> extends BrowserHistoryBuildOptions, IRouterConfig<T> {
}

export function createBrowserRouter<T extends Store>(config: IBrowserRouterConfig<T>): Router<T> {
  const history = createBrowserHistory(config);
  return createRouter(config, history);
}
