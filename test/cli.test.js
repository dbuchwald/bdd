const { cli } = require('../lib/cli');
const expect = require('chai').expect;

describe('CLI operation', function() {
  it('should work correctly with single parameter', function() {
    const result = cli(['node', 'pesel', '44051401458']);
    expect(result).to.be.equal(0);
  })

  it('should work correctly with single parameter and a flag', function() {
    const result = cli(['node', 'pesel', '44051401458', '--verify']);
    expect(result).to.be.equal(0);
  })

  it('should fail with multiple parameters', function() {
    const result = cli(['node', 'pesel', '44051401458', 'another one']);
    expect(result).to.be.equal(1);
  })
})