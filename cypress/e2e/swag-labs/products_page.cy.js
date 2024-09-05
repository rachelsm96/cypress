  context('filter section', () => {
    beforeEach(() => {
      cy.visit('https://www.saucedemo.com/', {failOnStatusCode: false} )
      cy.get('[id="user-name"]').type('standard_user')
      cy.get('[id="password"]').type('secret_sauce')
      cy.get('[id="login-button"]').click()
      cy.on('window:alert', (text)=> true)
    })

    it('all filter options are shown', () => {
      cy.get('option').should('have.length', 4).then(($els) => {
        return(
          Cypress.$.makeArray($els).map((e1) => e1.innerText)
        )
      }).should('deep.equal', ['Name (A to Z)', 'Name (Z to A)', 'Price (low to high)', 'Price (high to low)']) 
    })
    
    it('Sort from high to low', () => {
      cy.get('[data-test="product-sort-container"]').select(['Price (high to low)'])
      cy.get('.inventory_item_name').should('have.length', 6).then(($els) => {
        return(
          Cypress.$.makeArray($els).map((e1) => e1.innerText)
        )
      }).should('deep.equal', ['Sauce Labs Fleece Jacket', 'Sauce Labs Backpack', 'Sauce Labs Bolt T-Shirt', 'Test.allTheThings() T-Shirt (Red)', 'Sauce Labs Bike Light', 'Sauce Labs Onesie'])
      
      cy.get('.inventory_item_price').should('have.length', 6).then(($els) => {
        return(
          Cypress.$.makeArray($els).map((e1) => e1.innerText)
        )
      }).should('deep.equal', ['$49.99', '$29.99', '$15.99', '$15.99', '$9.99', '$7.99'])
    })

    it('Sort from low to high', () => {
      cy.get('[data-test="product-sort-container"]').select(['Price (low to high)'])
      cy.get('.inventory_item_name').should('have.length', 6).then(($els) => {
        return(
          Cypress.$.makeArray($els).map((e1) => e1.innerText)
        )
      }).should('deep.equal', ['Sauce Labs Onesie', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt', 'Test.allTheThings() T-Shirt (Red)', 'Sauce Labs Backpack', 'Sauce Labs Fleece Jacket'])
      
      cy.get('.inventory_item_price').should('have.length', 6).then(($els) => {
        return(
          Cypress.$.makeArray($els).map((e1) => e1.innerText)
        )
      }).should('deep.equal', ['$7.99', '$9.99', '$15.99', '$15.99', '$29.99', '$49.99'])
      
    })

    it('Sort A to Z', ()=> {
      cy.get('[data-test="product-sort-container"]').select(['Name (A to Z)'])
      cy.get('.inventory_item_name').should('have.length', 6).then(($els) => {
        return(
          Cypress.$.makeArray($els).map((e1) => e1.innerText)
        )
      }).should('deep.equal', ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt', 'Sauce Labs Fleece Jacket', 'Sauce Labs Onesie', 'Test.allTheThings() T-Shirt (Red)'])
      
      cy.get('.inventory_item_price').should('have.length', 6).then(($els) => {
        return(
          Cypress.$.makeArray($els).map((e1) => e1.innerText)
        )
      }).should('deep.equal', ['$29.99', '$9.99', '$15.99', '$49.99', '$7.99', '$15.99', ])

    })

    it('Sort Z to A', ()=> {
      cy.get('[data-test="product-sort-container"]').select(['Name (Z to A)'])
      cy.get('.inventory_item_name').should('have.length', 6).then(($els) => {
        return(
          Cypress.$.makeArray($els).map((e1) => e1.innerText)
        )
      }).should('deep.equal', ['Test.allTheThings() T-Shirt (Red)', 'Sauce Labs Onesie', 'Sauce Labs Fleece Jacket', 'Sauce Labs Bolt T-Shirt', 'Sauce Labs Bike Light', 'Sauce Labs Backpack', ])
      
      cy.get('.inventory_item_price').should('have.length', 6).then(($els) => {
        return(
          Cypress.$.makeArray($els).map((e1) => e1.innerText)
        )
      }).should('deep.equal', ['$15.99', '$7.99', '$49.99', '$15.99', '$9.99', '$29.99', ])

    })

  })