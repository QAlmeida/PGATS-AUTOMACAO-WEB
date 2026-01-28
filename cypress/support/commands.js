// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// Gera um email único usando timestamp (evita conflito de usuários)
Cypress.Commands.add('generateUniqueEmail', (prefix = 'pgats_student_') => {
  const timestamp = Date.now();
  return `${prefix}${timestamp}@example.com`;
});

// Registro de um novo usuário completo (TC1 e TC15)
Cypress.Commands.add('registerNewUser', (userFixtureKey = 'newUser') => {
  cy.fixture('users').then((users) => {
    const user = users[userFixtureKey];

    cy.visit('/');

    cy.contains('Signup / Login').click();
    cy.contains('New User Signup!').should('be.visible');

    cy.generateUniqueEmail(user.emailPrefix).then((uniqueEmail) => {
      Cypress.env('lastRegisteredEmail', uniqueEmail);

      cy.get('[data-qa="signup-name"]').type(user.name);
      cy.get('[data-qa="signup-email"]').type(uniqueEmail);
      cy.get('[data-qa="signup-button"]').click();

      cy.url().should('include', '/signup');
      cy.get('form[action="/signup"]').should('be.visible');


      cy.get('#id_gender1').check();
      cy.get('[data-qa="password"]').type(user.password);
      cy.get('[data-qa="days"]').select('1');
      cy.get('[data-qa="months"]').select('January');
      cy.get('[data-qa="years"]').select('1990');

      cy.get('#newsletter').check();
      cy.get('#optin').check();

      cy.get('[data-qa="first_name"]').type(user.firstName);
      cy.get('[data-qa="last_name"]').type(user.lastName);
      cy.get('[data-qa="company"]').type(user.company);
      cy.get('[data-qa="address"]').type(user.address1);
      cy.get('[data-qa="address2"]').type(user.address2);
      cy.get('[data-qa="country"]').select(user.country);
      cy.get('[data-qa="state"]').type(user.state);
      cy.get('[data-qa="city"]').type(user.city);
      cy.get('[data-qa="zipcode"]').type(user.zipcode);
      cy.get('[data-qa="mobile_number"]').type(user.mobileNumber);

      cy.get('[data-qa="create-account"]').click();
      cy.contains('Account Created!').should('be.visible');
      cy.get('[data-qa="continue-button"]').click();

      cy.contains('Logged in as').should('be.visible');
    });
  });
});

// Login com email e senha
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/');
  cy.contains('Signup / Login').click();
  cy.contains('Login to your account').should('be.visible');

  cy.get('[data-qa="login-email"]').type(email);
  cy.get('[data-qa="login-password"]').type(password);
  cy.get('[data-qa="login-button"]').click();
});

// Logout
Cypress.Commands.add('logout', () => {
  cy.contains('Logout').click();
});
