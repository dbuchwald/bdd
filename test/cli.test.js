const { cli } = require('../lib/cli');
const expect = require('chai').expect;

describe('CLI operation', function() {
  it('should work correctly with single parameter', function() {
    const result = cli(['node', 'pesel', '44051401458']);
    expect(result.error).to.be.false;
  })

  it('should work correctly with single parameter and a flag', function() {
    const result = cli(['node', 'pesel', '44051401458', '--verify']);
    expect(result.error).to.be.false;
  })

  it('should fail with multiple parameters', function() {
    const result = cli(['node', 'pesel', '44051401458', 'another one']);
    expect(result.error).to.be.true;
    expect(result.errorMessage).to.be.equal('Incorrect number of parameters given');
  })

  it('should fail with incorrect flag', function() {
    const result = cli(['node', 'pesel', '44051401458', '--wrong']);
    expect(result.error).to.be.true;
    expect(result.errorMessage).to.be.equal('Unknown or unexpected option: --wrong');
  })
})