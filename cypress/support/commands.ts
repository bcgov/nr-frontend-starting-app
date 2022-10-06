// @ts-check
///<reference path="../global.d.ts" />

Cypress.Commands.add("getByDataTest", (selector) => {
  return cy.get(`[data-testid=${selector}]`);
});

Cypress.Commands.add("deleteUser", (firstname, lastname) => {
	cy.request({
		method: 'DELETE', 
		url: `${Cypress.env('apiUrl')}/users/${firstname}/${lastname}`, 
		failOnStatusCode: false
	}).then((response) => {
		console.log(response.status);
		console.log(response.body);
	});
});
	
Cypress.Commands.add("createUser", (firstname, lastname) => {
	cy.request({
		method: 'GET', 
		url: `${Cypress.env('apiUrl')}/users/`, 
		failOnStatusCode: false,
		body: {
			firstName: firstname,
			lastName: lastname
		}
	}).then((response) => {
		console.log(response.status);
		console.log(response.body);
	});
});

