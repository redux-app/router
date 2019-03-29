import Route, { IRouteOptions } from './Route';

export class ServiceRoute extends Route {

  constructor(options: IRouteOptions) {
    options.visitable = false;
    super(options);
  }

}
