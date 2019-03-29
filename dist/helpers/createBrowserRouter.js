import { createBrowserHistory } from 'history';
import { createRouter } from './createRouter';
export function createBrowserRouter(config) {
    const history = createBrowserHistory(config);
    return createRouter(config, history);
}
