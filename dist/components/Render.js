import * as React from 'react';
import { Router } from '../classes/Router';
export class Render extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            pathname: '',
            search: '',
            hash: ''
        };
    }
    componentDidMount() {
        Router.getInstance().onUrlChange(({ location: { pathname, search, hash } }) => {
            this.setState({ pathname, search, hash });
        });
    }
    render() {
        const { on, exact = false, component: ComponentToRender = React.Fragment, children, } = this.props;
        const { routerKey, store } = Router.getInstance().config;
        const state = store && store.getState();
        const routerState = state && state[routerKey || 'router'];
        const routes = !!routerState ? routerState.routes.map(match => match.handler) : [];
        const targets = on instanceof Array ? on : [on];
        const shouldRender = exact ?
            routes.every(route => targets.indexOf(route) > -1) :
            routes.some(route => targets.indexOf(route) > -1);
        return !shouldRender ? null : (React.createElement(ComponentToRender, null, children));
    }
}
