class HomePage {
  visit() {
    // Handle uncaught exceptions
    Cypress.on("uncaught:exception", (err, runnable) => {
      console.error("Uncaught exception:", err);
      return false;
    });

    // Block ads and popups
    cy.intercept("GET", "**/ads/*", { statusCode: 204, body: "" }).as(
      "blockAds"
    );
    cy.intercept("GET", "**/popup/*", { statusCode: 204, body: "" }).as(
      "blockPopup"
    );

    cy.visit("/", { failOnStatusCode: false });
    //cy.wait(5000);
    cy.url().should("eq", "https://www.99.co/");
  }

  getTitle(selector) {
    return cy.get(selector);
  }
}

export default HomePage;
