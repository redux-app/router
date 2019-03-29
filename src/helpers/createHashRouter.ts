import { HashHistoryBuildOptions, createHashHistory } from 'history';
import { IRouterConfig, Router } from '../classes/Router';
import { createRouter } from './createRouter';
import { Store } from 'redux';

export interface IHashRouterConfig<T extends Store> extends HashHistoryBuildOptions, IRouterConfig<T> {
}

export function createHashRouter<T extends Store>(config: IHashRouterConfig<T>): Router<T> {
  const history = createHashHistory(config);
  return createRouter(config, history);
}
