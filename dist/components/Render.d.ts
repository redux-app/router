import * as React from 'react';
import Route from '../classes/Route';
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
export declare class Render extends React.Component<IRenderProps, IRenderState> {
    state: IRenderState;
    componentDidMount(): void;
    render(): JSX.Element | null;
}
export {};
