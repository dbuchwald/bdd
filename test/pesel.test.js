const pesel = require('../lib/pesel');
const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-datetime'));

describe('PESEL handling library', function() {

  describe('verifyPESEL function', function() {
    it('should return false when no data passed', function() {
      expect(pesel.verifyPESEL()).to.be.false;
    })
    
    it('should return false when null data passed', function() {
      expect(pesel.verifyPESEL(null)).to.be.false;
    })
    
    it('should return false when empty PESEL passed', function() {
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
    
    it('should return false when passing PESEL with invalid date', function() {
      expect(pesel.verifyPESEL('99043318946')).to.be.false;
    })
    
    it('should return false when passing PESEL with invalid date format', function() {
      expect(pesel.verifyPESEL('99023118940')).to.be.false;
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

  describe('decodePESEL function', function() {

    it('should return empty object when no data passed', function() {
      const decoded = pesel.decodePESEL(undefined);
      expect(decoded.dateOfBirth, 'date of birth should be undefined').to.be.undefined;
      expect(decoded.gender, 'gender should be undefined').to.be.undefined;
      expect(decoded.valid, 'PESEL should not be valid').to.be.false;
    })

    it('should return empty object when empty data passed', function() {
      const decoded = pesel.decodePESEL('');
      expect(decoded.dateOfBirth, 'date of birth should be undefined').to.be.undefined;
      expect(decoded.gender, 'gender should be undefined').to.be.undefined;
      expect(decoded.valid, 'PESEL should not be valid').to.be.false;
    })

    it('should return empty object when invalid data passed', function() {
      const decoded = pesel.decodePESEL('abcdefghij');
      expect(decoded.dateOfBirth, 'date of birth should be undefined').to.be.undefined;
      expect(decoded.gender, 'gender should be undefined').to.be.undefined;
      expect(decoded.valid, 'PESEL should not be valid').to.be.false;
    })

    it('should return empty object when invalid PESEL passed', function() {
      const decoded = pesel.decodePESEL('44051401459');
      expect(decoded.dateOfBirth, 'date of birth should be undefined').to.be.undefined;
      expect(decoded.gender, 'gender should be undefined').to.be.undefined;
      expect(decoded.valid, 'PESEL should not be valid').to.be.false;
    })

    it('should decode PESEL correctly when valid value passed (1800s)', function() {
      const decoded = pesel.decodePESEL('89821985910');
      expect(decoded.dateOfBirth, 'date of birth should be correctly parsed').to.equalDate(new Date('1889-02-19'));
      expect(decoded.gender, 'gender should be correctly recognized').to.be.equal('M');
      expect(decoded.valid, 'PESEL should be valid').to.be.true;
    })

    it('should decode PESEL correctly when valid value passed (1900s)', function() {
      const decoded = pesel.decodePESEL('44051401458');
      expect(decoded.dateOfBirth, 'date of birth should be correctly parsed').to.equalDate(new Date('1944-05-14'));
      expect(decoded.gender, 'gender should be correctly recognized').to.be.equal('M');
      expect(decoded.valid, 'PESEL should be valid').to.be.true;
    })

    it('should decode PESEL correctly when valid value passed (2000s)', function() {
      const decoded = pesel.decodePESEL('06260742168');
      expect(decoded.dateOfBirth, 'date of birth should be correctly parsed').to.equalDate(new Date('2006-06-07'));
      expect(decoded.gender, 'gender should be correctly recognized').to.be.equal('F');
      expect(decoded.valid, 'PESEL should be valid').to.be.true;
    })

    it('should decode PESEL correctly when valid value passed (2100s)', function() {
      const decoded = pesel.decodePESEL('42452109995');
      expect(decoded.dateOfBirth, 'date of birth should be correctly parsed').to.equalDate(new Date('2142-05-21'));
      expect(decoded.gender, 'gender should be correctly recognized').to.be.equal('M');
      expect(decoded.valid, 'PESEL should be valid').to.be.true;
    })

    it('should decode PESEL correctly when valid value passed (2200s)', function() {
      const decoded = pesel.decodePESEL('19670873489');
      expect(decoded.dateOfBirth, 'date of birth should be correctly parsed').to.equalDate(new Date('2219-07-08'));
      expect(decoded.gender, 'gender should be correctly recognized').to.be.equal('F');
      expect(decoded.valid, 'PESEL should be valid').to.be.true;
    })
  })
})