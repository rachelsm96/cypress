/// <reference types="cypress" />

context('login page', () => {
    beforeEach(() => {
      cy.visit('https://www.saucedemo.com', {failOnStatusCode: false} )
    })

    it('login with standard user', () => {
      cy.get('[id="user-name"]').type('standard_user')
      cy.get('[id="password"]').type('secret_sauce')
      cy.get('[id="login-button"]').click()
    })

    it('login with locked out user', () => {
        cy.get('[id="user-name"]').type('locked_out_user')
        cy.get('[id="password"]').type('secret_sauce')
        cy.get('[id="login-button"]').click()
        cy.get('.error-message-container').should('have.text', 'Epic sadface: Sorry, this user has been locked out.')
    })

    it('invalid password', () => {
      cy.get('[id="user-name"]').type('standard_user')
      cy.get('[id="password"]').type('password')
      cy.get('[id="login-button"]').click()
      cy.get('.error-message-container').should('have.text', 'Epic sadface: Username and password do not match any user in this service')
    })

    it('invalid user', () => {
      cy.get('[id="user-name"]').type('not_a_user')
      cy.get('[id="password"]').type('secret_sauce')
      cy.get('[id="login-button"]').click()
      cy.get('.error-message-container').should('have.text', 'Epic sadface: Username and password do not match any user in this service')
    })
    

})