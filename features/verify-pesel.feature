Feature: Verify PESEL
  In order to filter out invalid PESEL numbers
  As a developer
  I want to verify PESEL validity

  Scenario: simple validation (empty PESEL given)
    Given PESEL number is ''
    When PESEL is verified
    Then the response should be invalid

  Scenario Outline: parameterized PESEL validations
    Given PESEL number is <pesel>
    When PESEL is verified
    Then the response should be <result>
    Examples:
      | pesel            | result  |
      | 'abcdefghijk'    | invalid |
      | '12345678901'    | invalid |
      | '  123afga  '    | invalid |
      | '44051401458'    | valid   |
      | '44051401459'    | invalid |
      | '  44051401458'  | valid   |
      | '44051401458  '  | valid   |
      | ' 44051401458 '  | valid   |
