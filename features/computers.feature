Feature: CRUD computers

  As a user on computers app
  I want to be able to create, search,
  update and delete computers

  @Automated
  Scenario: Verify that it is possible to add a new computer
    Given I am on the computers page
    And I ensure there is no computer with name "comp1"
    And I select to add a new computer
    When I enter the computer data:
      | name  | introduced date | discontinued date | company |
      | comp1 | 2018-04-30      | 2018-05-30        | IBM     |
    And I select to save the computer
    And I search the computer "comp1"
    Then I verify that the following computer exists:
      | name  | introduced date | discontinued date | company |
      | comp1 | 30 Apr 2018     | 30 May 2018       | IBM     |

  @Automated
  Scenario: Verify that it is possible to add a new computer only entering its name
    Given I am on the computers page
    And I ensure there is no computer with name "compnametest"
    And I select to add a new computer
    When I enter the computer data:
      | name         | introduced date | discontinued date | company |
      | compnametest |                 |                   |         |
    And I select to save the computer
    And I search the computer "compnametest"
    Then I verify that the following computer exists:
      | name         | introduced date | discontinued date | company |
      | compnametest | -               | -                 | -       |

  @Automated
  Scenario: Verify that it is NOT possible to add a new computer without its name
    Given I am on the computers page
    And I select to add a new computer
    When I enter the computer data:
      | name | introduced date | discontinued date | company |
      |      | 2018-04-30      | 2018-04-30        | IBM     |
    And I select to save the computer
    Then an error is shown in the computer field "name"

  @Automated
  Scenario: Verify that it is NOT possible to add a new computer when user enters an invalid date format
    Given I am on the computers page
    And I select to add a new computer
    When I enter the computer data:
      | name        | introduced date | discontinued date | company |
      | testingcomp | 22/04/2018      | 2018-04-30        | IBM     |
    And I select to save the computer
    Then an error is shown in the computer field "introduced"

  @Manual
  Scenario: Verify that it is possible to cancel when the user is adding a new computer
    Given I am on the computers page
    And I select to add a new computer
    When I enter the computer data:
      | name   | introduced date | discontinued date | company |
      | mycomp | 2018-04-30      | 2018-04-30        | IBM     |
    And I select to cancel the operation
    Then The computer is NOT added

  @Automated
  Scenario: Verify that it is possible to update an existing computer
    Given I am on the computers page
    And The following computer exists:
      | name   | introduced date | discontinued date | company |
      | mycomp | 2018-04-30      | 2018-04-30        | IBM     |
    When I search the computer "mycomp"
    And I open the computer "mycomp"
    And I enter the computer data:
      | name          | introduced date | discontinued date | company |
      | comp1_updated | 2017-04-30      | 2017-04-30        | RCA     |
    And I select to save the computer
    And I search the computer "comp1_updated"
    Then I verify that the following computer exists:
      | name          | introduced date | discontinued date | company |
      | comp1_updated | 30 Apr 2017     | 30 Apr 2017       | RCA     |

  @Manual
  Scenario: Verify that it is possible to cancel when the user is updating a new computer
    Given I am on the computers page
    And The following computer exists:
      | name  | introduced date | discontinued date | company |
      | comp1 | 2018-04-30      | 2018-04-30        | IBM     |
    When I enter the computer data:
      | name          | introduced date | discontinued date | company |
      | comp1_updated | 2017-04-30      | 2017-04-30        | RCA     |
    And I select to cancel the operation
    Then The computer is NOT updated

  @Manual
  Scenario: Verify that it is NOT possible to update an existing computer without its name
    Given I am on the computers page
    And The following computer exists:
      | name  | introduced date | discontinued date | company |
      | comp1 | 2018-04-30      | 2018-04-30        | IBM     |
    And I search the computer "comp1"      
    And I open the computer "comp1"
    When I enter the computer data:
      | name          | introduced date | discontinued date | company |
      | comp1_updated | 30 Apr 2017     | 30 Apr 2017       | RCA     |
    And I select to cancel the operation
    Then an error is shown in the computer name field
      | name          | introduced date | discontinued date | company |
      | comp1_updated | 30 Apr 2017     | 30 Apr 2017       | RCA     |

  @Manual
  Scenario: Verify that it is NOT possible to update an existing computer when user enters an invalid date format
    Given I am on the computers page
    And The following computer exists:
      | name  | introduced date | discontinued date | company |
      | comp1 | 2018-04-30      | 2018-04-30        | IBM     |
    When I enter the computer data:
      | name  | introduced date | discontinued date | company |
      | comp1 | 2017/04/30      | 2017-04-30        | RCA     |
    And I select to save the computer
    Then an error is shown in the introduced date

  @Automated
  Scenario: Verify that it is possible to delete a computer
    Given I am on the computers page
    And The following computer exists:
    | name       | introduced date | discontinued date | company |
    | compdelete |                 |                   | IBM     |
    When I search the computer "compdelete"
    And I open the computer "compdelete"
    And I select to delete the computer
    Then I verify that the following computer does not exist:
    | name       | introduced date | discontinued date | company |
    | compdelete |                 |                   | IBM     |

  @Automated
  Scenario: Verify that I can search a computer by its exact name
    Given I am on the computers page
    And The following computer exists:
      | name         | introduced date | discontinued date | company |
      | comptosearch | 2018-04-30      | 2018-04-30        | IBM     |
    When I search the computer "comptosearch"
    Then I verify that the following computer exists:
      | name         | introduced date | discontinued date | company |
      | comptosearch | 30 Apr 2018     | 30 Apr 2018       | IBM     |

  @Automated      
  Scenario: Verify that the search retrieve all the computers that contains the given filter
    Given I am on the computers page
    And The following computer exists:
      | name           | introduced date | discontinued date | company |
      | searchingcomp1 | 2018-04-30      | 2018-04-30        | IBM     |
      | searchingcomp2 | 2018-04-30      | 2018-04-30        | IBM     |
    When I search the computer "searchingcomp"
    Then I verify that the following computer exists:
      | name           | introduced date | discontinued date | company |
      | searchingcomp1 | 30 Apr 2018     | 30 Apr 2018       | IBM     |
      | searchingcomp2 | 30 Apr 2018     | 30 Apr 2018       | IBM     |
