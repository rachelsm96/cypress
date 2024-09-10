context('add and remove items on product page', () => {
    before(() => {
      cy.visit('https://www.saucedemo.com/', {failOnStatusCode: false} )
      cy.readFile('cypress/fixtures/users.json').then((users) => {
        cy.signIn(users[0].username, users[0].password)
      })
    })

    it('add and remove all items to cart', () => {
      cy.get('button[id*=add-to-cart]').each(($els) => {
        cy.wrap($els).click()
      })
      cy.get('button[id*=remove]').should('have.length', 6)
      cy.get('span[data-test=shopping-cart-badge]').should('have.text', '6')
      cy.get('button[id*=remove]').each(($els) => {
        cy.wrap($els).click()
      })
      cy.get('button[id*=add-to-cart]').should('have.length', 6)
      cy.get('a[data-test=shopping-cart-link]').should('not.have.class', 'shopping_cart_badge')
      
    })
  })

  context('filter section', () => {
    beforeEach(() => {
      cy.visit('https://www.saucedemo.com/', {failOnStatusCode: false} )
      cy.readFile('cypress/fixtures/users.json').then((users) => {
        cy.signIn(users[0].username, users[0].password)
      })
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