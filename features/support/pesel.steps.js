const { Given, When, Then } = require("cucumber");
const { verifyPESEL, decodePESEL } = require('../../lib/pesel.js');
const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-datetime'));

Given("PESEL number is {string}", function(pesel) {
  this.setPESEL(pesel);
});

When("PESEL is verified", function() {
  this.setValid(verifyPESEL(this.pesel));
});

When("PESEL is decoded", function() {
  this.setDecoded(decodePESEL(this.pesel));
});

Then("the response should be valid", function() {
  expect(this.validPESEL).to.be.true;
});

Then("the response should be invalid", function() {
  expect(this.validPESEL).to.be.false;
});

Then("The decoded PESEL should be valid", function() {
  expect(this.decodedPESEL.valid).to.be.true;
});

Then("The decoded PESEL should be invalid", function() {
  expect(this.decodedPESEL.valid).to.be.false;
});

Then('The decoded date of birth should be {string}', function (string) {
  expect(this.decodedPESEL.dateOfBirth).to.equalDate(new Date(string));
});

Then('The decoded gender should be {string}', function (string) {
  expect(this.decodedPESEL.gender).to.equal(string);
});