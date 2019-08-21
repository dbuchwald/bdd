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
  expect(this.result).to.be.equal(0);
});

Then('It should fail', function () {
  expect(this.result).to.be.equal(1);
});