import { HashHistoryBuildOptions } from 'history';
import { IRouterConfig, Router } from '../classes/Router';
import { Store } from 'redux';
export interface IHashRouterConfig<T extends Store> extends HashHistoryBuildOptions, IRouterConfig<T> {
}
export declare function createHashRouter<T extends Store>(config: IHashRouterConfig<T>): Router<T>;
