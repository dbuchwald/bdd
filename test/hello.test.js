const hello = require('../lib/hello');

test('getGreeting should return correct message', () => {
  const greeting = hello.getGreeting();

  expect(greeting).toBe('Hello World!');
})