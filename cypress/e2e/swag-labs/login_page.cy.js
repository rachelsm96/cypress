context("login page", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com", { failOnStatusCode: false });
  });

  it("Login and logout with multiple users", () => {
    cy.readFile("cypress/fixtures/users.json").then((users) => {
      users.forEach((user) => {
        cy.signIn(user.username, user.password);
        cy.get(".bm-burger-button button").click();
        cy.get("#logout_sidebar_link").click();
      });
    });
  });

  it("login with standard user", () => {
    cy.signIn("standard_user", "secret_sauce");
    cy.get(".title").should("have.text", "Products");
  });

  it("login with locked out user", () => {
    cy.signIn("locked_out_user", "secret_sauce");
    cy.get(".error-message-container").should(
      "have.text",
      "Epic sadface: Sorry, this user has been locked out.",
    );
  });

  it("invalid password", () => {
    cy.signIn("standard_user", "password");
    cy.get(".error-message-container").should(
      "have.text",
      "Epic sadface: Username and password do not match any user in this service",
    );
  });

  it("invalid user", () => {
    cy.signIn("not_a_user", "secret_sauce");
    cy.get(".error-message-container").should(
      "have.text",
      "Epic sadface: Username and password do not match any user in this service",
    );
  });
});
