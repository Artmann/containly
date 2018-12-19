import { Class } from './class';

interface Bindings {
  [key: string]: Function;
}

interface Instances {
  [key: string]: Object;
}

class Container {
  bindings: Bindings;
  instances: Instances;

  constructor() {
    this.bindings = {};
    this.instances = {};
  }

  bind(abstract: Class, concrete?: Function): void {
    if (!concrete) {
      concrete = () => new abstract();
    }

    this.bindings[this.identifier(abstract)] = concrete;
  }

  get<T>(type: Class): T {
    const identifier = this.identifier(type);

    const binding = this.bindings[identifier];
    if (!binding) {
      throw new Error(`Trying to get ${identifier}, but it has not been bound yet.`);
    }

    return binding() as T;
  }

  has(type: Class): boolean {
    return !!this.bindings[this.identifier(type)];
  }

  singleton(type: Class) {
    const identifier = this.identifier(type);
    this.instances[identifier] = new type();

    this.bind(type, () => {
      return this.instances[identifier];
    });
  }

  private identifier(type: Class): string {
    return (<any>type).name;
  }
}

export default new Container();
