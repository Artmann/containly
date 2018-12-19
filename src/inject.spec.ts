import { assert } from 'chai';
import 'mocha';
import Container from './container';
import Inject from './inject';

class MyClass {
  public message: string = 'Hello World';
}

describe('Inject', () => {
  it('it gets an instance from the container set the property', () => {
    Container.bind(MyClass);

    const myObject = {
      myClass: null
    };

    Inject(MyClass)(myObject, 'myClass');

    assert.isNotNull(myObject.myClass);
    assert.instanceOf(myObject.myClass, MyClass);
    assert.equal((<any>myObject.myClass).message, 'Hello World');
  });
});
