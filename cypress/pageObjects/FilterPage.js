class FilterPage {
  selectFilter(category) {
    cy.get("._2dHwl")
      .contains(category)
      .should("be.visible")
      .click({ force: true });
  }

  verifyFiltersExist(filters) {
    filters.forEach((filter) => {
      cy.contains(filter).should("be.visible");
    });
  }

  clickPropertyType() {
    cy.contains("Property type").should("be.visible");
    cy.get(":nth-child(2) > ._2rxBL").click({ force: true });
  }

  selectPropertyType(type) {
    cy.contains("span._2NcKP", type)
      .parent()
      .find('input[type="checkbox"]')
      .check({ force: true })
      .should("be.checked");
  }

  verifyPropertyTypes(types) {
    types.forEach((type) => {
      cy.contains("span._2NcKP", type).should("be.visible");
    });
  }

  selectPriceRange(minPrice, maxPrice) {
    cy.get("._3oL_Q > ._2rxBL > ._1dg5o").click({ force: true });
    cy.get("[name='price_min']").should("be.visible");
    cy.get("[name='price_max']").should("be.visible");

    cy.get("div._1mSEz ul._3H3Wz li").contains(minPrice).click({ force: true });
    cy.get("div._1mSEz ul._3H3Wz._2QS3q li")
      .contains(maxPrice)
      .click({ force: true });
  }

  clickBedrooms() {
    cy.contains("Bedrooms").should("be.visible");
    cy.get(":nth-child(3) > ._2rxBL").click({ force: true });
  }

  selectBedrooms(selectedBedrooms) {
    selectedBedrooms.forEach((type) => {
      cy.contains("span._2NcKP", type)
        .parent()
        .find('input[type="checkbox"]')
        .check({ force: true })
        .should("be.checked");
    });
  }
  clickRentalTypes() {
    cy.get(".lSFa5 > ._2rxBL").should("be.visible").click({ force: true });
  }

  selectRentalType(type) {
    cy.contains("span._2NcKP", type)
      .parent()
      .find("input[type='checkbox']")
      .check({ force: true })
      .should("be.checked");
  }

  unselectRentalType() {
    cy.contains("span._2NcKP", "Entire unit")
      .parent()
      .find("input[type='checkbox']")
      .uncheck({ force: true })
      .should("not.be.checked");
  }

  clickSearch() {
    cy.get("[data-cy='search']").click({ force: true });
  }
}

export default FilterPage;
