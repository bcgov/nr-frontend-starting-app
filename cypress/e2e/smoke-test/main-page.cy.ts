describe('user form test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('main page is displayed and loads correctly', () => {
    cy.contains('NR Front End Testing App');
    cy.getByDataTest('card-title').first().should('have.text', 'Sample User Form');
  });
});
