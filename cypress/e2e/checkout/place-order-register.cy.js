describe('TC15 - Place Order: Register before Checkout', () => {
  it('Deve registrar usuário, adicionar produtos ao carrinho e concluir o pedido', () => {
    cy.fixture('users').then((users) => {
      const user = users.newUser;

      // 1. Registrar novo usuário (reutilizando o comando que já funciona)
      cy.registerNewUser('newUser');

      // 2. Verificar que está logado
      cy.contains('Logged in as').should('contain.text', user.name);

      // 3. Adicionar produtos ao carrinho
      cy.contains('Products').click();
      cy.url().should('include', '/products');

      // Adicionar primeiro produto
      cy.get('.features_items .col-sm-4')
        .first()
        .contains('Add to cart')
        .click();

      cy.contains('Continue Shopping').click();

      // Adicionar segundo produto
      cy.get('.features_items .col-sm-4')
        .eq(1)
        .contains('Add to cart')
        .click();

      cy.contains('View Cart').click();

      // 4. Verificar que está na página do carrinho
      cy.url().should('include', '/view_cart');
      cy.contains('Shopping Cart').should('be.visible');

      // 5. Clicar em Proceed To Checkout
      cy.contains('Proceed To Checkout').click();

      // 6. Verificar Address Details e Review Your Order
      cy.url().should('include', '/checkout');
      cy.contains('Review Your Order').should('be.visible');
      cy.contains('Address Details').should('be.visible');

      // 7. Inserir comentário e clicar em Place Order
      cy.get('[name="message"]').type('Pedido de teste automatizado - TCC PGATS');
      cy.contains('Place Order').click();

      // 8. Preencher dados de pagamento
      cy.get('[data-qa="name-on-card"]').type(user.firstName + ' ' + user.lastName);
      cy.get('[data-qa="card-number"]').type('4111111111111111');
      cy.get('[data-qa="cvc"]').type('123');
      cy.get('[data-qa="expiry-month"]').type('12');
      cy.get('[data-qa="expiry-year"]').type('2025');

      // 9. Clicar em Pay and Confirm Order
      cy.get('[data-qa="pay-button"]').click();
      cy.wait(2000);

      // 10. Verificar mensagem de sucesso
      cy.contains('Congratulations! Your order has been confirmed!', { timeout: 15000 }).should('be.visible');

      // 11. Deletar a conta
      cy.contains('Delete Account').click();
      cy.contains('Account Deleted!', { timeout: 10000 }).should('be.visible');
      cy.get('[data-qa="continue-button"]').click();
    });
  });
});
