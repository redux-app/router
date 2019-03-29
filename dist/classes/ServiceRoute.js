import Route from './Route';
export class ServiceRoute extends Route {
    constructor(options) {
        options.visitable = false;
        super(options);
    }
}
