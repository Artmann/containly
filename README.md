# Containly

An easy to use IOC Container for TypeScript.

## Usage

Add it as a dependency.

```sh
yarn add containly
```

Enable decorators in `tsconfig.json`

```json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

Create a class that you want to inject, like a Logger.

```ts
export default class Logger {
  info(message: string): void {
    console.log(message);
  }

  error(message: string): void {
    console.error(message);
  }
}
```

Bind the class to the Container.

```ts
import { Container } from 'containly';
import Logger from './log';

Container.bind(Logger);
```

Inject an instance of your class.

```ts
export default class MyController {
  @Inject()
  private logger: Logger;

  show() {
    this.logger.info('Hello World!');
  }
}
```

### Singletons

Per default, the container will give you a new instance of the class every time you request it. If you want a Singleton instead, you can use the `singleton` method.

```ts
class Counter {
  private number: number = 0;

  count(): void {
    this.number += 1;
    console.log(this.number);
  }
}

Container.singleton(Counter);

Container.get<Counter>(Counter).count(); // => 1
Container.get<Counter>(Counter).count(); // => 2
Container.get<Counter>(Counter).count(); // => 3
```

### Testing

Using dependecy injection makes mocking in tests super easy.

```ts
class UserRepository {
  find(id: number): User {
    // Your real logic
  }
}

class MockUserRepository {
  find(id: number): User {
    return { firstName: 'Harry', lastName: 'Hacker' } as User;
  }
}

class UserController {
  @Inject()
  private userRepository: UserRepository;

  show(id: number) {
    const user = this.userRepository.find(id);

    return {
      name: `${user.firstName} ${user.lastName}`;
    }
  }
}

describe('UserController', () => {
  describe('show', () => {
    it('returns the name of the user', () => {
      Container.bind(UserRepository, () => {
        return new MockUserRepository();
      });

      const controller = new UserController();
      const { name } = controller.show(1);

      assert.equal(name, 'Harry Hacker');
    });
  });
});
````

## Contribute

Feel free to open a Pull Request 😃
