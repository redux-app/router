let routesCounter = 0;

export default class Route {

  public readonly id: number;
  public readonly path: string;
  public readonly title: string;
  public readonly disabled: boolean;
  public readonly visitable: boolean;

  constructor(options: IRouteOptions) {
    const {
      path,
      title = '',
      disabled = false,
      visitable = true
    } = options;

    this.id = ++routesCounter;
    this.path = path;
    this.title = title;
    this.disabled = disabled;
    this.visitable = visitable;
  }

  public generateUrl(params: IRouteParams = {}) : string {
    return Object.keys(params).reduce((path: string, key: string) => {
      const value = params[key];
      return path.replace(`:${key}`, value).replace(`*${key}`, value)
    }, this.path);
  }

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
