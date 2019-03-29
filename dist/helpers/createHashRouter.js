import { createHashHistory } from 'history';
import { createRouter } from './createRouter';
export function createHashRouter(config) {
    const history = createHashHistory(config);
    return createRouter(config, history);
}
