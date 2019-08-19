const { Given, When, Then } = require("cucumber");
const { expect } = require("chai");
const { getGreeting } = require('../../lib/hello.js');

Given("system is initialized", function() {
});

When("getGreeting function is called", function() {
  this.setGreeting(getGreeting());
});

Then("the response should be {string}", function(text) {
  expect(this.greeting).to.equal(text);
});