describe('user form test', () => {
  let testUser: {
    firstName: string,
    lastName: string
  };
  let msg: {
    submit: string,
    delete: string,
    empty: string,
    invalid: string,
    duplicate: string
  };

  beforeEach(() => {
    cy.visit('/form');

    // Loading test data
    cy.fixture('user').then((user) => {
      testUser = user;
    });
    cy.fixture('messages').then((messages) => {
      msg = messages;
    });
  });

  it('create a valid user', () => {
    // Removing the user first to avoid false negatives
    cy.deleteUser(testUser.firstName, testUser.lastName);

    // Create the test user
    cy.getByDataTest('input-first').type(testUser.firstName).blur();
    cy.getByDataTest('input-last').type(testUser.lastName).blur();
    cy.getByDataTest('button-submit').contains('Submit').click();

    // Check that the user is created in the UI
    cy.intercept(`${Cypress.env('apiUrl')}/users/find-all`).as('getUsers');
    cy.wait('@getUsers');
    cy.contains(msg.submit);
    cy.contains(testUser.firstName);
    cy.contains(testUser.lastName);
  });

  it('delete a user', () => {
    // Creating the user first to avoid false negatives
    cy.createUser(testUser.firstName, testUser.lastName);
    cy.reload();

    // Delete user and verify that is deleted in the UI
    cy.contains('td', testUser.firstName).parent('tr').within(() => {
      cy.get('td').eq(3).contains('button', 'Delete').click();
    });
    cy.intercept(`${Cypress.env('apiUrl')}/users/find-all`).as('getUsers');
    cy.wait('@getUsers');
    cy.contains(msg.delete);
    cy.contains(testUser.firstName).should('not.exist');
    cy.contains(testUser.lastName).should('not.exist');
  });

  it('throws error with empty username', () => {
    cy.getByDataTest('input-first').focus().blur();
    cy.getByDataTest('input-last').focus().blur();
    cy.getByDataTest('button-submit').contains('Submit').click();

    cy.get('#input-first-error-msg').should('have.text', msg.empty);
    cy.get('#input-last-error-msg').should('have.text', msg.empty);
    cy.get('#error-banner').within(() => {
      cy.get('.cds--inline-notification__subtitle').should('have.text', msg.invalid);
    });
  });

  it('throws error at duplicate username', () => {
    // Creating the user to duplicate after
    cy.createUser(testUser.firstName, testUser.lastName);
    cy.reload();

    // Try to create a duplicate user
    cy.getByDataTest('input-first').type(testUser.firstName).blur();
    cy.getByDataTest('input-last').type(testUser.lastName).blur();
    cy.getByDataTest('button-submit').contains('Submit').click();

    // Check for the error message
    cy.get('#error-banner').within(() => {
      cy.get('.cds--inline-notification__subtitle').should('have.text', msg.duplicate);
    });
  });

  it('empty fields after resetting form', () => {
    // Fill the form inputs and reset
    cy.getByDataTest('input-first').type(testUser.firstName).blur();
    cy.getByDataTest('input-last').type(testUser.lastName).blur();
    cy.getByDataTest('button-reset').contains('Reset').click();

    // Check if all the inputs are empty
    cy.getByDataTest('input-first').should('have.text', '');
    cy.getByDataTest('input-last').should('have.text', '');
  });
});
