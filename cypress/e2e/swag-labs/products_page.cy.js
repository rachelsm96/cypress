context("add and remove items on product page", () => {
    before(() => {
      cy.visit("https://www.saucedemo.com/", {failOnStatusCode: false} )
      cy.readFile("cypress/fixtures/users.json").then((users) => {
        cy.signIn(users[0].username, users[0].password)
      })
    })

    it("add and remove all items to cart", () => {
      cy.get("button[id*=add-to-cart]").each(($els) => {
        cy.wrap($els).click()
      })
      cy.get("button[id*=remove]").should("have.length", 6)
      cy.get("span[data-test=shopping-cart-badge]").should("have.text", "6")
      cy.get("button[id*=remove]").each(($els) => {
        cy.wrap($els).click()
      })
      cy.get("button[id*=add-to-cart]").should("have.length", 6)
      cy.get("a[data-test=shopping-cart-link]").should("not.have.class", "shopping_cart_badge")
      
    })
  })

  context("filter section", () => {
    beforeEach(() => {
      cy.fixture("product_info").then(function(product) {
        this.product = product
        cy.log(this.product["backpack"].name)
      })
      cy.visit("https://www.saucedemo.com/", {failOnStatusCode: false} )
      cy.readFile("cypress/fixtures/users.json").then((users) => {
        cy.signIn(users[0].username, users[0].password)
      })
    })

    it("all filter options are shown", () => {
      cy.get("option").should("have.length", 4).then(($els) => {
        return(
          Cypress.$.makeArray($els).map((e1) => e1.innerText)
        )
      }).should("deep.equal", ["Name (A to Z)", "Name (Z to A)", "Price (low to high)", "Price (high to low)"]) 
    })
    
    it("Sort from high to low", function() {
      cy.log(this.product["backpack"].name)
      cy.get("[data-test='product-sort-container']").select(["Price (high to low)"])
      cy.get(".inventory_item_name").should("have.length", 6).then(($els) => {
        return(
          Cypress.$.makeArray($els).map((e1) => e1.innerText)
        )
      }).should("deep.equal", [this.product["jacket"].name, this.product["backpack"].name, this.product["boltShirt"].name, this.product["redShirt"].name, this.product["bikeLight"].name, this.product["onesie"].name])
      
      cy.get(".inventory_item_price").should("have.length", 6).then(($els) => {
        return(
          Cypress.$.makeArray($els).map((e1) => e1.innerText)
        )
      }).should("deep.equal", [this.product["jacket"].price, this.product["backpack"].price, this.product["boltShirt"].price, this.product["redShirt"].price, this.product["bikeLight"].price, this.product["onesie"].price])
    })

    it("Sort from low to high", function() {
      cy.get("[data-test='product-sort-container']").select(["Price (low to high)"])
      cy.get(".inventory_item_name").should("have.length", 6).then(($els) => {
        return(
          Cypress.$.makeArray($els).map((e1) => e1.innerText)
        )
      }).should("deep.equal", [this.product["onesie"].name, this.product["bikeLight"].name, this.product["boltShirt"].name, this.product["redShirt"].name, this.product["backpack"].name, this.product["jacket"].name])
      
      cy.get(".inventory_item_price").should("have.length", 6).then(($els) => {
        return(
          Cypress.$.makeArray($els).map((e1) => e1.innerText)
        )
      }).should("deep.equal", ["$7.99", "$9.99", "$15.99", "$15.99", "$29.99", "$49.99"])
      
    })

    it("Sort A to Z", function() {
      cy.get("[data-test='product-sort-container']").select(["Name (A to Z)"])
      cy.get(".inventory_item_name").should("have.length", 6).then(($els) => {
        return(
          Cypress.$.makeArray($els).map((e1) => e1.innerText)
        )
      }).should("deep.equal", [this.product["backpack"].name, this.product["bikeLight"].name, this.product["boltShirt"].name, this.product["jacket"].name, this.product["onesie"].name, this.product["redShirt"].name])
      cy.log(this.product["backpack"].name)
      cy.get(".inventory_item_price").should("have.length", 6).then(($els) => {
        return(
          Cypress.$.makeArray($els).map((e1) => e1.innerText)
        )
      }).should("deep.equal", ["$29.99", "$9.99", "$15.99", "$49.99", "$7.99", "$15.99", ])

    })

    it("Sort Z to A", function() {
      cy.get("[data-test='product-sort-container']").select(["Name (Z to A)"])
      cy.get(".inventory_item_name").should("have.length", 6).then(($els) => {
        return(
          Cypress.$.makeArray($els).map((e1) => e1.innerText)
        )
      }).should("deep.equal", [this.product["redShirt"].name, this.product["onesie"].name, this.product["jacket"].name, this.product["boltShirt"].name, this.product["bikeLight"].name, this.product["backpack"].name, ])
      
      cy.get(".inventory_item_price").should("have.length", 6).then(($els) => {
        return(
          Cypress.$.makeArray($els).map((e1) => e1.innerText)
        )
      }).should("deep.equal", ["$15.99", "$7.99", "$49.99", "$15.99", "$9.99", "$29.99", ])

    })

  })