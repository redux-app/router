import { Router } from '../classes/Router';
import { Store } from 'redux';

export default function getRouter<T extends Store>(): Router<T> {
  return Router.getInstance();
}
