describe('Landing page test', () => {

  let landingPageData: {
    title: string,
    description: string
  };

  beforeEach(() => {
    cy.visit('/');

    // Loading test data
    cy.fixture('landing-page').then((ttls) => {
      landingPageData = ttls;
    });
  });

  it('main page is displayed and loads correctly', () => {
    cy.getByDataTest('home-title').should('have.text', landingPageData.title);
    cy.getByDataTest('home-desc').should('have.text', landingPageData.description);
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