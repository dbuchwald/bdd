const hello = require('../lib/hello');
const expect = require('chai').expect;

describe('Hello World function', function() {
  it('should return correct message', function() {
    const greeting = hello.getGreeting();
  
    expect(greeting).to.be.equal('Hello World!');
  })
})

