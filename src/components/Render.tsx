import * as React from 'react';
import Route from '../classes/Route';
import { IRouterState } from '../redux/reducer';
import { Router } from '../classes/Router';
import { IRouterSetMatchActionPayload } from '../redux/actions';

export interface IRenderProps {
  on: Route | Route[];
  exact?: boolean;
  component?: React.ComponentType;
  children?: React.ReactNode;
}

interface IRenderState {
  pathname: string;
  search: string;
  hash: string;
}

export class Render extends React.Component<IRenderProps, IRenderState> {

  public state: IRenderState = {
    pathname: '',
    search: '',
    hash: ''
  }

  componentDidMount() {
    Router.getInstance().onUrlChange(({ location: { pathname, search, hash } }: IRouterSetMatchActionPayload) => {
      this.setState({ pathname, search, hash });
    })
  }

  render() {
    const {
      on,
      exact = false,
      component: ComponentToRender = React.Fragment,
      children,
    } = this.props;

    const { routerKey, store } = Router.getInstance().config;
    const state = store && store.getState();
    const routerState =  state && state[routerKey || 'router'] as IRouterState;
    const routes: Route[] = !!routerState ? routerState.routes.map(match => match.handler) : [];
    const targets = on instanceof Array ? on : [ on ];

    const shouldRender = exact ?
      routes.every(route => targets.indexOf(route) > -1) :
      routes.some(route => targets.indexOf(route) > -1)

    return !shouldRender ? null : (
      <ComponentToRender>
        { children }
      </ComponentToRender>
    )
  }
}
