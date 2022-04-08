/// <reference types="cypress" />
const ProductPage = require('../support/page_objects/Product.page')
context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('/minha-conta')
        cy.fixture('perfil').then(profile => {
            cy.login(profile.usuario, profile.senha)
        });
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        cy.get('.page-title').should('contain', 'Minha conta')
        cy.fixture('products').then(async products => {
            for (const product of products) {
                await ProductPage.addToCart(product.name, product.size, product.color);
            }
            cy.get('.woocommerce-message > .button').click()
            cy.get('.checkout-button').click()
            cy.get('#terms').check()
            cy.wait(1000)
            cy.get('#place_order').click()
            cy.get('.woocommerce-notice').should('contain','Obrigado. Seu pedido foi recebido.')
        })
    });


})