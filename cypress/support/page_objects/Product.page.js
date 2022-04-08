// a classe foi criada dessa forma prq criando através de class dá problema de async/await
class ProductPage {
    show(product){
        cy.visit('/produtos')
        if(typeof product=='string'){
            cy.log('asdf')
            return cy.get('.product-block > .caption > .meta > .infor > .name > a')
            .filter(`:contains(${product})`)
            .first()
            .click()
        }else{
            return cy.get('.product-block > .caption > .meta > .infor > .name > a').then(products=>{
                products[product].click()
            })
        }
    }
    addToCart(product,size,color){
        this.show(product)
        cy.get(`[data-attribute_name="attribute_size"] [data-value=${size}]`).click()
        cy.get(`[data-attribute_name="attribute_color"] [data-value=${color}]`).click()
        cy.get('.single_add_to_cart_button').click()
        return cy.get('.woocommerce-message').should('contain','foi adicionado no seu carrinho.')
    }

}
export default new ProductPage