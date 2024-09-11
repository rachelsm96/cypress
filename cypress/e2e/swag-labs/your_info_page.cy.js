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
  });

  it("no info inputed", () => {
    cy.get("#continue").click();
    cy.get(".error").should("have.length", 4);
    cy.get(".error-message-container").should(
      "have.text",
      "Error: First Name is required",
    );
  });

  it("required infomation is provided", () => {
    cy.get("input#first-name").type("Jane");
    cy.get("input#last-name").type("Doe");
    cy.get("input#postal-code").type("90210");
    cy.get("#continue").click();
    cy.get(".title").should("have.text", "Checkout: Overview");
  });
});
