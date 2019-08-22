const { Given, When, Then } = require("cucumber");
const { expect } = require("chai");
const { cli } = require('../../lib/cli.js');

Given('Parameter is {string}', function (string) {
  this.addParameter(string);
});

When('Application is launched', function () {
  this.result = cli(this.args);
});

Then('It should run correctly', function () {
  expect(this.result.error).to.be.false;
});

Then('It should fail', function () {
  expect(this.result.error).to.be.true;
});

Then('The message should be {string}', function (string) {
  expect(this.result.errorMessage).to.be.equal(string);
});