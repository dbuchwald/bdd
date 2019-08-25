Feature: Process PESEL
  In order to process data from PESEL numbers
  As a developer
  I want to have single point of entry for both decoding and verification

  Scenario: simple validation (empty PESEL given)
    Given PESEL number is ''
      And Only verification is required
    When PESEL is processed
    Then the response should be invalid

  Scenario Outline: parameterized PESEL validations
    Given PESEL number is <pesel>
      And Only verification is required
    When PESEL is processed
    Then the response should be <result>
    Examples:
      | pesel            | result  |
      | 'abcdefghijk'    | invalid |
      | '12345678901'    | invalid |
      | '  123afga  '    | invalid |
      | '99043318946'    | invalid |
      | '99023118940'    | invalid |
      | '44051401458'    | valid   |
      | '44051401459'    | invalid |
      | '  44051401458'  | valid   |
      | '44051401458  '  | valid   |
      | ' 44051401458 '  | valid   |

  Scenario: simple negative scenario
    Given PESEL number is '44051401459'
    When PESEL is processed
    Then The decoded PESEL should be invalid

  Scenario: simple negative scenario
    Given PESEL number is '99023118940'
    When PESEL is processed
    Then The decoded PESEL should be invalid

  Scenario: simple positive scenario
    Given PESEL number is '44051401458'
    When PESEL is processed
    Then The decoded PESEL should be valid

  Scenario: simple positive scenario
    Given PESEL number is '44051401458'
    When PESEL is processed
    Then The decoded date of birth should be '1944-05-14'

  Scenario: more complex positive scenario
    Given PESEL number is '44051401458'
    When PESEL is processed
    Then The decoded PESEL should be valid
     And The decoded date of birth should be '1944-05-14'
     And The decoded gender should be 'M'

  Scenario Outline: parameterized PESEL decoding cases
    Given PESEL number is <pesel>
    When PESEL is processed
    Then The decoded PESEL should be valid
     And The decoded date of birth should be <date>
     And The decoded gender should be <gender>
    Examples:
      | pesel            | date         | gender |
      | '89821985910'    | '1889-02-19' | 'M'    |
      | '44051401458'    | '1944-05-14' | 'M'    |
      | '06260742168'    | '2006-06-07' | 'F'    |
      | '42452109995'    | '2142-05-21' | 'M'    |
      | '19670873489'    | '2219-07-08' | 'F'    |
