// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import FilterPage from "../pageObjects/FilterPage";
const filterPage = new FilterPage();

Cypress.Commands.add("handlePopup", () => {
  cy.get("body").then(($body) => {
    if ($body.find("#contentDiv").length > 0) {
      cy.get("#contentDiv").find(".InterstitialClose").click();
    }
  });
});

Cypress.Commands.add("selectFilter", (category) => {
  filterPage.selectFilter(category);
});

Cypress.Commands.add("verifyFiltersExist", (filters) => {
  filterPage.verifyFiltersExist(filters);
});

Cypress.Commands.add("clickPropertyType", () => {
  filterPage.clickPropertyType();
});

Cypress.Commands.add("selectPropertyType", (type) => {
  filterPage.selectPropertyType(type);
});

Cypress.Commands.add("verifyPropertyTypes", (types) => {
  filterPage.verifyPropertyTypes(types);
});

Cypress.Commands.add("selectPriceRange", (minPrice, maxPrice) => {
  filterPage.selectPriceRange(minPrice, maxPrice);
});

Cypress.Commands.add("clickBedrooms", () => {
  filterPage.clickBedrooms();
});

Cypress.Commands.add("selectBedrooms", (selectedBedrooms) => {
  filterPage.selectBedrooms(selectedBedrooms);
});

Cypress.Commands.add("clickRentalTypes", () => {
  filterPage.clickRentalTypes();
});

Cypress.Commands.add("selectRentalType", (type) => {
  filterPage.selectRentalType(type);
});

Cypress.Commands.add("unselectRentalType", () => {
  filterPage.unselectRentalType();
});

Cypress.Commands.add("clickSearch", () => {
  filterPage.clickSearch();
});
