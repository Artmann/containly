import { assert } from 'chai';
import 'mocha';
import Container from './container';

class MyClass { }
class AnotherClass { }
class Singleton { }

describe('Container', () => {
  describe('bind', () => {
    it('adds a binding', () => {
      Container.bind(MyClass);

      assert.isTrue(Container.has(MyClass));
    });

    it('can bind a different class', () => {
      Container.bind(MyClass, () => new AnotherClass);
      const instance = Container.get(MyClass);

      assert.instanceOf(instance, AnotherClass);
      assert.notInstanceOf(instance, MyClass);
    });
  });

  describe('get', () => {
    it('throws an error if the class has not been bound', () => {
      const fn = () => Container.get<AnotherClass>(AnotherClass);
      assert.throw(fn, Error, 'Trying to get AnotherClass, but it has not been bound yet.');
    });

    it('returns an instance', () => {
      Container.bind(MyClass);
      const instance = Container.get<MyClass>(MyClass);

      assert.instanceOf(instance, MyClass, 'is correct class');
    });

    it('returns a new instance each time', () => {
      Container.bind(MyClass);
      const instance1 = Container.get<MyClass>(MyClass);
      const instance2 = Container.get<MyClass>(MyClass);

      assert.notEqual(instance1, instance2);
    });
  });

  describe('singleton', () => {
    it('returns the same instance each time', () => {
      Container.singleton(Singleton);
      const instance1 = Container.get<Singleton>(Singleton);
      const instance2 = Container.get<Singleton>(Singleton);

      assert.equal(instance1, instance2);
    });
  });
});
