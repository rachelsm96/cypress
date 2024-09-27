class InfoPage {
  getFirstNameField() {
    return cy.get("input#first-name");
  }
  getLastNameField() {
    return cy.get("input#last-name");
  }
  getzipcodeField() {
    return cy.get("input#postal-code");
  }
  getContiuneButton() {
    return cy.get("#continue");
  }

  enterCheckoutInfo(firstName, lastName, zipcode) {
    this.getFirstNameField().type(firstName);
    this.getLastNameField().type(lastName);
    this.getzipcodeField().type(zipcode);
    this.getContiuneButton().click();
  }
}

export default new InfoPage();
