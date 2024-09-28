context("checkout page info and actions", () => {
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
  });

  it("info of item is correct", function () {
    cy.get(".inventory_item_name").should(
      "have.text",
      product["backpack"].name,
    );
    cy.get(".inventory_item_desc").should(
      "have.text",
      product["backpack"].description,
    );
    cy.get(".inventory_item_price").should(
      "have.text",
      product["backpack"].price,
    );
  });

  it("can navigate back to product page", () => {
    cy.get("#continue-shopping").click();
    cy.get(".title").should("have.text", "Products");
  });

  it("can remove item from cart", () => {
    cy.get("#remove-sauce-labs-backpack").click();
    cy.get(".cart_contents_container").should("not.have.class", "cart_item");
    cy.get("a[data-test=shopping-cart-link]").should(
      "not.have.class",
      "shopping_cart_badge",
    );
  });
});
