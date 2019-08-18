const pesel = require('../lib/pesel');
const expect = require('chai').expect;

describe('verifyPESEL function', function() {
  it('When no data passed, function should return false', function() {
    expect(pesel.verifyPESEL()).to.be.false;
  })
  
  it('should be false when empty PESEL passed', function() {
    expect(pesel.verifyPESEL('')).to.be.false;
  })
  
  it('should return false when spaces passed', function() {
    expect(pesel.verifyPESEL('         ')).to.be.false;
  })
  
  it('should return false when PESEL is not 11 characters long', function() {
    expect(pesel.verifyPESEL('1234567890')).to.be.false;
  })
  
  it('should return false when non-digits are passed', function() {
    expect(pesel.verifyPESEL('abcdefghijk')).to.be.false;
  })
  
  it('should return false when passing PESEL with invalid checksum', function() {
    expect(pesel.verifyPESEL('44051401459')).to.be.false;
  })
  
  it('should return true when passing valid PESEL', function() {
    expect(pesel.verifyPESEL('44051401458')).to.be.true;
  })
  
  it('should trim leading spaces', function() {
    expect(pesel.verifyPESEL('   44051401458')).to.be.true;
  })
  
  it('should trim trailing spaces', function() {
    expect(pesel.verifyPESEL('44051401458   ')).to.be.true;
  })
})
