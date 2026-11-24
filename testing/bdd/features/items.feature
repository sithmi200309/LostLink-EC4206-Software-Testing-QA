
Feature: Browse LostLink item reports
  As a LostLink user
  I want to view available item reports
  So that I can find lost or found belongings

  Scenario: Retrieve available item reports
    Given the LostLink backend is available
    When I request the available item reports
    Then the HTTP response status should be 200

  Scenario: Verify the item response structure
    Given the LostLink backend is available
    When I request the available item reports
    Then the HTTP response status should be 200
    And the response should contain an items array
    And the response should contain a count field
