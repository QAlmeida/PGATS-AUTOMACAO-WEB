function ensureLoggedOut() {
  cy.visit('/');

  cy.get('body').then(($body) => {
    if ($body.text().includes('Logout')) {
      cy.contains('Logout').click();
      cy.contains('Signup / Login').should('be.visible');
    }
  });
}

describe('Register and Authenticate (TC1, TC2, TC3, TC4, TC5)', () => {
  it('TC1 - Deve registrar um novo usuário com sucesso', () => {
    cy.registerNewUser('newUser');

    cy.contains('Logged in as').should('contain.text', 'PGATS Student');

    // OBS: não deletar a conta aqui, para que o email seja utilizado nos demais TCs
    // cy.contains('Delete Account').click();
    // cy.contains('Account Deleted!').should('be.visible');
  });
  it('TC2 - Deve fazer login com email e senha corretos', () => {
    cy.fixture('users').then((users) => {
      const lastEmail = Cypress.env('lastRegisteredEmail');
      const password = users.newUser.password;

      ensureLoggedOut();

      cy.login(lastEmail, password);

      cy.contains('Logged in as').should('contain.text', 'PGATS Student');
    });
  });

  it('TC3 - Deve exibir erro ao fazer login com email/senha incorretos', () => {
    // Garantir que está deslogado
      ensureLoggedOut();

    cy.login('wrong_email@example.com', 'wrongPassword123');

    cy.contains('Your email or password is incorrect!', { timeout: 10000 }).should('be.visible');
  });

  it('TC4 - Deve fazer logout do usuário logado', () => {
    cy.fixture('users').then((users) => {
      const lastEmail = Cypress.env('lastRegisteredEmail');
      const password = users.newUser.password;

      ensureLoggedOut();

      cy.login(lastEmail, password);
      cy.contains('Logged in as').should('be.visible');

      cy.logout();
      cy.contains('Signup / Login').should('be.visible');
    });
  });

  it('TC5 - Deve exibir erro ao tentar registrar com email já existente', () => {
    const lastEmail = Cypress.env('lastRegisteredEmail');

    expect(lastEmail, 'Email do usuário registrado no TC1 deve existir').to.be.a('string').and.not.be.empty;

    cy.fixture('users').then((users) => {
      const user = users.newUser;

      ensureLoggedOut();

      cy.visit('/');
      cy.contains('Signup / Login').click();
      cy.contains('New User Signup!').should('be.visible');

      cy.get('[data-qa="signup-name"]').type(user.name);
      cy.get('[data-qa="signup-email"]').type(lastEmail);
      cy.get('[data-qa="signup-button"]').click();

      // espera a mensagem de email já existente
      cy.contains('Email Address already exist!', { timeout: 10000 }).should('be.visible');
    });
  });
});
