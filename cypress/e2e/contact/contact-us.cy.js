describe('TC6 - Contact Us Form', () => {
  it('Deve enviar o formulário de contato com sucesso', () => {
    cy.fixture('messages').then((msgs) => {
      const contact = msgs.contactUs;

      cy.visit('/');

      // clica no link Contact Us
      cy.contains('Contact us').click();

      cy.url().should('include', '/contact_us');
      cy.contains('Get In Touch').should('be.visible');

      // preenche o formulário
      cy.get('[data-qa="name"]').type(contact.name);
      cy.get('[data-qa="email"]').type(contact.email);
      cy.get('[data-qa="subject"]').type(contact.subject);
      cy.get('[data-qa="message"]').type(contact.message);

      // upload de arquivo
      cy.get('input[name="upload_file"]').selectFile('cypress/fixtures/pdf_test.pdf', {
        force: true,
      });
        

      cy.get('[data-qa="submit-button"]').click();

      // o site abre um alert do browser
      cy.on('window:alert', (txt) => {
        expect(txt).to.contain('Press OK to proceed!');
      });

      cy.contains('Success! Your details have been submitted successfully.').should('be.visible');

      // volta para home
      cy.contains('Home').click();
      cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
    });
  });
});
