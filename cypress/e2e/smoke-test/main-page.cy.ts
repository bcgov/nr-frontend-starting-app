describe('main page test', () => {
  let mainPageData: {
    title: string,
    subtitle: string,
    description: string
  };

  beforeEach(() => {
    cy.visit('/');

    // Loading test data
    cy.fixture('main-page').then((ttls) => {
      mainPageData = ttls;
    });
  });

  it('main page is displayed and loads correctly', () => {
    cy.getByDataTest('landing-title').should('have.text', mainPageData.title);
    cy.getByDataTest('landing-subtitle').should('have.text', mainPageData.subtitle);
    cy.getByDataTest('landing-desc').should('have.text', mainPageData.description);
  });

  it('navigate to the user form page IDIR', () => {
    cy.getByDataTest('landing-button__idir').click();
    cy.get('#idirLogo').should('be.visible');
  });

  it('navigate to the user form page BCeID', () => {
    cy.getByDataTest('landing-button__bceid').click();
    cy.get('#bceidLogo').should('be.visible');
  });
});
