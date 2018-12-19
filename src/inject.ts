import { Class } from './class';
import Container from './container';

export default function Inject(type: Class) {
  return function (target: any, property: string) {
    target[property] = Container.get(type);
  }
}
