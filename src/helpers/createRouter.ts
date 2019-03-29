import { IRouterConfig, Router } from '../classes/Router';
import { History } from 'history';
import { Store } from 'redux';

export function createRouter<T extends Store>(config: IRouterConfig<T>, history: History): Router<T> {
  return Router.createInstance(config, history);
}
