import { ROUTER } from './actions';
import getRouter from '../helpers/getRouter';
const defaultState = {
    routes: [],
    queryParams: {},
    path: '',
    search: '',
    hash: '',
    isNavigating: false
};
export function routerReducer(state = defaultState, action) {
    switch (action.type) {
        case ROUTER.NAVIGATE:
            return handleNavigateAction(state, action.payload);
        case ROUTER.SET_MATCH:
            return handleSetMatchAction(state, action.payload);
        default:
            return state;
    }
}
function handleNavigateAction(state, { route, params, queryParams }) {
    getRouter().navigate(route, params, queryParams);
    return Object.assign({}, state, { isNavigating: true });
}
function handleSetMatchAction(state, { match, location }) {
    const { pathname: path, search, hash } = location;
    const routes = match.slice();
    const queryParams = match.queryParams;
    const isNavigating = false;
    return Object.assign({}, state, { routes, queryParams, path, search, hash, isNavigating });
}
