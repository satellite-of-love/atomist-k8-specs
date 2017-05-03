Feature: Make sure the sample TypeScript Editor has some tests
  This is just a sample Gherkin feature file for the
  take a service out of deployment.

  Scenario: RemoveService is added to your project by AddRemoveService
    Given the archive root
    When the RemoveService is run
    Then parameters were valid
    Then changes were made
    Then the hello file says hello
