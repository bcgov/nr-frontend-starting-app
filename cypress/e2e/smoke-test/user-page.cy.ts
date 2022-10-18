describe('user form test', () => {
  let testUser: {
    firstName: string,
    lastName: string
  };
  let validMessage: string;

  beforeEach(() => {
    cy.visit('/form');

    // Loading test data
    cy.fixture('user').then((user) => {
      testUser = user;
    });
    cy.fixture('messages').then((msg) => {
      validMessage = msg.validFeedback;
    });
  });

  it('create a valid user', () => {
    // Removing the user first to avoid false negatives
    cy.deleteUser(testUser.firstName, testUser.lastName);

    // Create the test user
    cy.get('#first-name').type(testUser.firstName);
    cy.getByDataTest('feedback-element').should('have.class', 'valid-feedback').and('have.text', validMessage);
    cy.get('#last-name').type(testUser.lastName);
    cy.getByDataTest('feedback-element').last().should('have.class', 'valid-feedback').and('have.text', validMessage);
    cy.get('button').contains('Submit').click();

    // Check that the user is created in the UI
    cy.intercept(`${Cypress.env('apiUrl')}/users/find-all`).as('getUsers');
    cy.wait('@getUsers');
    cy.contains(testUser.firstName);
    cy.contains(testUser.lastName);
  });

  it('delete a user', () => {
    // Creating the user first to avoid false negatives
    cy.createUser(testUser.firstName, testUser.lastName);
    cy.reload();

    // Delete user and verify that is deleted in the API
    cy.contains('td', testUser.firstName).parent('tr').within(() => {
      cy.get('td').eq(2).contains('button', 'Delete me').click();
    });
    cy.intercept('DELETE', `${Cypress.env('apiUrl')}/users/${testUser.firstName}/${testUser.lastName}`).as('delUser');
    cy.wait('@delUser').its('response.statusCode').should('eq', 200);
  });
});
