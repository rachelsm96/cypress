context("check your infomation page tests", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com", { failOnStatusCode: false });
    cy.fixture("product_info").then(function (product) {
      this.product = product;
    });
    cy.readFile("cypress/fixtures/users.json").then((users) => {
      cy.signIn(users[0].username, users[0].password);
    });
    cy.get("#add-to-cart-sauce-labs-backpack").click();
    cy.get(".shopping_cart_link").click();
    cy.get("button#checkout").click();
    cy.get("input#first-name").type("Jane");
    cy.get("input#last-name").type("Doe");
    cy.get("input#postal-code").type("90210");
    cy.get("#continue").click();
  });

  it("User is navagated to complete page after checkout is complete", () => {
    cy.get("button#finish").click();
    cy.get(".title").should("have.text", "Checkout: Complete!");
    cy.get("div.complete-text").should(
      "have.text",
      "Your order has been dispatched, and will arrive just as fast as the pony can get there!",
    );
    cy.get("button#back-to-products").should("be.enabled");
  });

  it("item infomation is displayed", function () {
    cy.get(".inventory_item_name").should(
      "have.text",
      this.product["backpack"].name,
    );
    cy.get(".inventory_item_desc").should(
      "have.text",
      this.product["backpack"].description,
    );
    cy.get()
  });
});
