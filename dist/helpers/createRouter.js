import { Router } from '../classes/Router';
export function createRouter(config, history) {
    return Router.createInstance(config, history);
}
