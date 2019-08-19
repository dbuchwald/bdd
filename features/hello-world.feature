Feature: Hello World
  In order to check environment sanity
  As a developer
  I want to invoke simple Hello World function

  Scenario: say hello!
    Given system is initialized
    When getGreeting function is called
    Then the response should be 'Hello World!'