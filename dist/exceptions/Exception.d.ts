export interface IException {
    message: string;
}
export default class Exception implements IException {
    readonly message: string;
    constructor(message: string);
}
