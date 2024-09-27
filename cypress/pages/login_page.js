class LoginPage {
  getUsernameField() {
    return cy.get("input#user-name");
  }
  getPasswordField() {
    return cy.get("input#password");
  }
  getLoginButton() {
    return cy.get('input[type="submit"]');
  }
  loginWithUser(username, password) {
    this.getUsernameField().type(username);
    this.getPasswordField().type(password);
    this.getLoginButton().click();
  }
  loginFails() {
    cy.get('h3[data-test="error"]').should("be.visible");
  }
}
export default new LoginPage();
