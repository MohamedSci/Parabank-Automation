Feature: Comprehensive Testing of Parabank Features
  As a user of Parabank,
  I want to test all major functionalities
  So that I can ensure the application works as expected.

  # =====================================
  # Account Services
  # =====================================
  Scenario: View account services
    Given I am logged in
    When I navigate to the account services page
    Then I should see all available account service options

  # =====================================
  # Open New Account
  # =====================================
  Scenario: Successfully open a new account
    Given I am logged in
    When I navigate to the Open New Account page
    And I select "SAVINGS" as the account type
    And I choose an existing account "13011" as the funding account
    And I submit the request
    Then I should see a confirmation with the new account number

  # =====================================
  # Accounts Overview
  # =====================================
  Scenario: View account balances
    Given I am logged in
    When I navigate to the Accounts Overview page
    Then I should see a list of my accounts with their balances

  # =====================================
  # Transfer Funds
  # =====================================
  Scenario: Successfully transfer funds
    Given I am logged in
    When I navigate to the Transfer Funds page
    And I enter the amount "500"
    And I select the "Checking" account as the source
    And I select the "Savings" account as the destination
    And I submit the transfer
    Then I should see a confirmation of the transfer

  # =====================================
  # Bill Pay
  # =====================================
  Scenario: Successfully pay a bill
    Given I am logged in
    When I navigate to the Bill Pay page
    And I fill in the payee details
      | Field         | Value            |
      | Name          | John Doe         |
      | Address       | 123 Elm Street   |
      | City          | Anytown          |
      | State         | CA               |
      | Zip Code      | 90210            |
      | Phone         | 555-555-5555     |
      | Account       | 12345678         |
    And I enter the amount "100"
    And I submit the payment
    Then I should see a confirmation of the payment

  # =====================================
  # Find Transactions
  # =====================================
  Scenario: Search transactions by date range
    Given I am logged in
    When I navigate to the Find Transactions page
    And I enter the date range "01/01/2023" to "01/31/2023"
    And I submit the search
    Then I should see a list of transactions within the date range

  # =====================================
  # Update Contact Info
  # =====================================
  Scenario: Successfully update contact info
    Given I am logged in
    When I navigate to the Update Contact Info page
    And I update the phone number to "555-123-4567"
    And I submit the changes
    Then I should see a confirmation message

  # =====================================
  # Request Loan
  # =====================================
  Scenario: Successfully request a loan
    Given I am logged in
    When I navigate to the Request Loan page
    And I enter the loan amount "5000"
    And I select "1000" as the down payment
    And I select "Checking" as the account to fund the loan
    And I submit the loan request
    Then I should see a confirmation of the loan approval

  # =====================================
  # Log Out
  # =====================================
  Scenario: Successfully log out
    Given I am logged in
    When I click the "Log Out" link
    Then I should be redirected to the login page
