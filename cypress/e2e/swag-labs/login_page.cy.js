import login_page from "../../pages/login_page";
context("login page", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com", { failOnStatusCode: false });
  });

  it("Login and logout with multiple users", () => {
    cy.readFile("cypress/fixtures/users.json").then((users) => {
      users.forEach((user) => {
        login_page.loginWithUser(user.username, user.password);
        cy.get(".bm-burger-button button").click();
        cy.get("#logout_sidebar_link").click();
      });
    });
  });

  it("login with locked out user", () => {
    login_page.loginWithUser("locked_out_user", "secret_sauce");
    login_page.loginFails();
  });

  it("invalid password", () => {
    login_page.loginWithUser("standard_user", "password");
    login_page.loginFails();
  });

  it("invalid user", () => {
    login_page.loginWithUser("not_a_user", "secret_sauce");
    login_page.loginFails();
  });
});
