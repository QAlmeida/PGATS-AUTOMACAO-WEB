describe('Verify All Products and Search Product (TC8, TC9)', () => {
    it('TC8 - Deve listar todos os produtos e exibir detalhes de um produto', () => {
        cy.visit('/');

        cy.contains('Products').click();
        cy.url().should('include', '/products');

        cy.contains('All Products').should('be.visible');

        // Verifica que a lista de produtos está aparecendo
        cy.get('.features_items .col-sm-4').should('have.length.greaterThan', 0);

        // Clica em "View Product" do primeiro produto
        cy.get('.features_items .col-sm-4')
            .first()
            .contains('View Product')
            .click();

        cy.url().should('include', '/product_details');

        // Verifica informações básicas do produto
        cy.get('.product-information').within(() => {
            cy.get('h2').should('be.visible'); // nome do produto
            cy.contains('Category').should('be.visible');
            cy.contains('Availability').should('be.visible');
            cy.contains('Condition').should('be.visible');
            cy.contains('Brand').should('be.visible');
        });
    });

    it('TC9 - Deve buscar um produto pelo nome', () => {
        const productName = 'Dress';

        cy.visit('/products');

        cy.get('#search_product').type(productName);
        cy.get('#submit_search').click();

        cy.contains('Searched Products').should('be.visible');

        cy.get('.features_items .col-sm-4').should('have.length.greaterThan', 0);

        // Verifica que pelo menos um produto contém o termo buscado
        cy.get('.features_items .col-sm-4').contains(productName, { matchCase: false }).should('exist');
    });


});
