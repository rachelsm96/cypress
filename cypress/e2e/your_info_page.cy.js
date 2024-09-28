import InfoPage from "../../pages/info_page";

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
    InfoPage.getContiuneButton().click();
    cy.get(".title").should("have.text", "Checkout: Your Information");
    cy.get(".error").should("have.length", 4);
    cy.get(".error-message-container").should(
      "have.text",
      "Error: First Name is required",
    );
  });

  it("all infomation is provided", () => {
    InfoPage.enterCheckoutInfo("Jane", "Doe", "90210");
    cy.get(".title").should("have.text", "Checkout: Overview");
  });
});
