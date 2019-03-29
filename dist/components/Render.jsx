import * as React from 'react';
import { getConfig } from '../classes/Router';
export function Render(props) {
    const { on, exact = false, component: ComponentToRender = React.Fragment, children } = props;
    const routerConfig = getConfig();
    const routerState = routerConfig.store.getState()[routerConfig.routerKey || 'router'];
    const routes = routerState.routes.map(match => match.handler);
    const targets = on instanceof Array ? on : [on];
    const shouldRender = exact ?
        routes.every(route => targets.indexOf(route) > -1) :
        routes.some(route => targets.indexOf(route) > -1);
    return !shouldRender ? null : (<ComponentToRender>
      {children}
    </ComponentToRender>);
}
