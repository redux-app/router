let routesCounter = 0;
export default class Route {
    constructor(options) {
        const { path, title = '', disabled = false, visitable = true } = options;
        this.id = ++routesCounter;
        this.path = path;
        this.title = title;
        this.disabled = disabled;
        this.visitable = visitable;
    }
    generateUrl(params = {}) {
        return Object.keys(params).reduce((path, key) => {
            const value = params[key];
            return path.replace(`:${key}`, value).replace(`*${key}`, value);
        }, this.path);
    }
}
