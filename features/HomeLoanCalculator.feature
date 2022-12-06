Feature: Home loan calculator

  Scenario Outline: As a user, I should be able to find How much could I borrow?
    Given I launch the application
    When I am on the calculator page
    When I select single applicant and 0 dependents
    When I select home to live in
    When I enter <annualIncome> and <otherIncome> for single appl
    When I enter <livingExp>, <currentHL>,<otherLoan>, <commitments> and <totalCredits>
    When I click Work out how much I could borrow button
    Then I verify the estimated borrow amount could be <estimated>
    
    Examples:
      | annualIncome | otherIncome | livingExp | currentHL | otherLoan | commitments | totalCredits | estimated |
      | 80000        | 10000       | 500       | 0         | 100       | 0           | 10000        | 447000    |

  Scenario: Check to see if the Start over button clear the form and reset the value to $0.
    When I click startover to reset the form
    Then I verify the fields are reset to 0

  Scenario Outline: After submitting the form, check the error message for $1 livingExpenses
    When I enter <livingExp>, <currentHL>,<otherLoan>, <commitments> and <totalCredits>
    When I click Work out how much I could borrow button
    Then I verify the error message
    Then I close the browser
    Examples:
      | livingExp |
      | 1         |

