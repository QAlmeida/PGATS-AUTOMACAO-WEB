describe('TC10 - Verify Subscription in home page', () => {
  it('Deve cadastrar email na seção de subscription da home', () => {
    const email = `pgats_sub_${Date.now()}@example.com`;

    cy.visit('/');

    cy.contains('Subscription').scrollIntoView().should('be.visible');

    cy.get('#susbscribe_email').type(email);
    cy.get('#subscribe').click();

    cy.contains('You have been successfully subscribed!', { timeout: 10000 }).should('be.visible');
  });
});
