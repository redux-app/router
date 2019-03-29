export interface IException {
  message: string;
}

export default class Exception implements IException {

  constructor(readonly message: string) {
  }

}
