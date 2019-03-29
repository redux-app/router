import { BrowserHistoryBuildOptions } from 'history';
import { IRouterConfig, Router } from '../classes/Router';
import { Store } from 'redux';
export interface IBrowserRouterConfig<T extends Store> extends BrowserHistoryBuildOptions, IRouterConfig<T> {
}
export declare function createBrowserRouter<T extends Store>(config: IBrowserRouterConfig<T>): Router<T>;
