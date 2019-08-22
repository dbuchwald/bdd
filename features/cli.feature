Feature: CLI operation
  In order to use application efficiently
  As a developer
  I want to verify CLI operation validity

  Scenario: simple CLI invocation
    Given Parameter is '44051401458'
    When Application is launched
    Then It should run correctly

  Scenario: simple CLI invocation with flag
    Given Parameter is '44051401458'
      And Parameter is '--verify'
    When Application is launched
    Then It should run correctly

  Scenario: simple CLI invocation with more parameters
    Given Parameter is '44051401458'
      And Parameter is 'another one'
    When Application is launched
    Then It should fail
     And The message should be 'Incorrect number of parameters given'

  Scenario: simple CLI invocation with incorrect flag
    Given Parameter is '44051401458'
      And Parameter is '--wrong'
    When Application is launched
    Then It should fail
     And The message should be 'Unknown or unexpected option: --wrong'
