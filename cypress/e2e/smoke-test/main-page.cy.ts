describe('main page test', () => {

  let mainPageData: {
    title: string,
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
    cy.getByDataTest('home-title').should('have.text', mainPageData.title);
    cy.getByDataTest('home-desc').should('have.text', mainPageData.description);
    cy.getByDataTest('landing-button__idir').should('be.visible')
    cy.getByDataTest('landing-button__bceid').should('be.visible')
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