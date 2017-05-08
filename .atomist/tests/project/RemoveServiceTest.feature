Feature: We can remove the config for a retired service

  Scenario: RetireService deletes things
    Given the archive root
    When the RetireService editor is run on london
    Then london service file is gone
    Then london deployment file is gone
