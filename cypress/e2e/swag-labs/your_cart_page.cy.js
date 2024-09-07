context('checkout page info and actions', () => {
    beforeEach(() => {
      cy.visit('https://www.saucedemo.com', {failOnStatusCode: false} )
      cy.get('[id="user-name"]').type('standard_user')
      cy.get('[id="password"]').type('secret_sauce')
      cy.get('[id="login-button"]').click()
      cy.get('#add-to-cart-sauce-labs-backpack').click()
      cy.get('.shopping_cart_link').click()
    })

    it('info of item is correct', () => {
        cy.get('.inventory_item_name').should('have.text', 'Sauce Labs Backpack')
        cy.get('.inventory_item_desc').should('have.text', 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.')
        cy.get('.inventory_item_price').should('have.text', '$29.99')
    })

    it('can navigate back to product page', () => {
        cy.get('#continue-shopping').click()
        cy.get('.title').should('have.text', 'Products')
    })

    it('can remove item from cart', () => {
        cy.get('#remove-sauce-labs-backpack').click()
        cy.get('.cart_contents_container').should('not.have.class', 'cart_item')
        cy.get('a[data-test=shopping-cart-link]').should('not.have.class', 'shopping_cart_badge')
    })

})