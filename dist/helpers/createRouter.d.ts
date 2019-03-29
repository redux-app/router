import { IRouterConfig, Router } from '../classes/Router';
import { History } from 'history';
import { Store } from 'redux';
export declare function createRouter<T extends Store>(config: IRouterConfig<T>, history: History): Router<T>;
