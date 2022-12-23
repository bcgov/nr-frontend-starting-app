describe('Home page test', () => {

    let homePageData: {
        header: string,
        title: string,
        description: string,
        sampleUserFormTitle: string,
        sampleUserDescription: string,
        sampleSearchTitle: string,
        sampleSearchDescription: string,
    };
  
    beforeEach(() => {
        cy.visit('/');

        //Login with BCeID account
        cy.getByDataTest('landing-button__bceid').click();
        cy.get('#bceidLogo').should('be.visible');
        cy.get('input[name=user]')
            .clear()
            .type(Cypress.env('USERNAME'), { delay: 50 });
        cy.get('input[name=password]')
            .clear()
            .type(Cypress.env('PASSWORD'), { delay: 50 });
        cy.get('input[name=btnSubmit]').click();
    
        // Loading test data
        cy.fixture('home-page').then((ttls) => {
            homePageData = ttls;
        });
    });
  
    it('home page is displayed and loads correctly', () => {
        cy.getByDataTest('header-name').should('have.text', homePageData.header);
        cy.getByDataTest('home-title').should('have.text', homePageData.title);
        cy.getByDataTest('home-desc').should('have.text', homePageData.description);
        cy.getByDataTest('card-form__title').should('have.text', homePageData.sampleUserFormTitle);
        cy.getByDataTest('card-form__desc').should('have.text', homePageData.sampleUserDescription);
        cy.getByDataTest('card-form__button').should('be.visible');
        cy.getByDataTest('card-table__title').should('have.text', homePageData.sampleSearchTitle);
        cy.getByDataTest('card-table__desc').should('contain.text', homePageData.sampleSearchDescription);
        cy.getByDataTest('card-table__button').should('be.visible');
    });

  });