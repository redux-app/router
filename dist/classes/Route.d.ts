export default class Route {
    readonly id: number;
    readonly path: string;
    readonly title: string;
    readonly disabled: boolean;
    readonly visitable: boolean;
    constructor(options: IRouteOptions);
    generateUrl(params?: IRouteParams): string;
}
export interface IRouteOptions {
    path: string;
    title?: string;
    disabled?: boolean;
    visitable?: boolean;
}
export interface IRouteParams {
    [key: string]: string;
}
