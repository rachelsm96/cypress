/// <reference types="cypress" />

context('go to login', () => {
    beforeEach(() => {
      cy.visit('https://www.saucedemo.com', {failOnStatusCode: false} )
    })

    it('login with standard user', () => {
      // https://on.cypress.io/type
      cy.get('[id="user-name"]').type('locked_out_user')
      cy.get('[id="password"]').type('secret_sauce')
      cy.get('[id="login-button"]').click()
    })

    it('login with locked out user', () => {
        // https://on.cypress.io/type
        cy.get('[id="user-name"]').type('locked_out_user')
        cy.get('[id="password"]').type('secret_sauce')
        cy.get('[id="login-button"]').click()
        cy.get('.error-message-container').should('have.text', 'Epic sadface: Sorry, this user has been locked out.')
})
    

})