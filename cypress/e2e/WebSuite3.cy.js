import HomePage from "../pageObjects/HomePage";

let BASE_URL = `${Cypress.config("baseUrl")}`;

describe("Search Filters - Buy & Rent", () => {
  const homePage = new HomePage();
  beforeEach(() => {
    cy.fixture("filters").as("filtersData");
    homePage.visit();
  });

  it("Verify BUY filters element", function () {
    cy.selectFilter("Buy");
    cy.verifyFiltersExist(this.filtersData.buyFilters);
  });

  it("Verify RENT filters element", function () {
    cy.selectFilter("Rent");
    cy.verifyFiltersExist(this.filtersData.rentFilters);
  });

  // Test case 1
  it("Should BUY filter based on price", function () {
    cy.selectFilter("Buy");
    cy.selectPriceRange(
      this.filtersData.buy.price[0],
      this.filtersData.buy.price[1]
    );
    cy.clickSearch();
    const expectedUrl = `${BASE_URL}/sale?price_range=${this.filtersData.buy.price[0].replace(
      /\$|,/g,
      ""
    )}%2C${this.filtersData.buy.price[1].replace(/\$|,/g, "")}`;
    cy.url().should("eq", expectedUrl);
  });

  // Test case 2
  it("Should RENT filter based on price", function () {
    cy.selectFilter("Rent");
    cy.selectPriceRange(
      this.filtersData.rent.price[0],
      this.filtersData.rent.price[1]
    );
    cy.clickSearch();
    const expectedUrl = `${BASE_URL}/rent?price_range=${this.filtersData.rent.price[0].replace(
      /\$|,/g,
      ""
    )}%2C${this.filtersData.rent.price[1].replace(/\$|,/g, "")}`;
    cy.url().should("eq", expectedUrl);
  });

  // Test Case 3
  it("Should BUY filter based on property type", function () {
    cy.selectFilter("Buy");
    cy.clickPropertyType();
    cy.verifyPropertyTypes(this.filtersData.buy.propertyTypes);
    this.filtersData.buy.selectedTypes.forEach((type) => {
      cy.selectPropertyType(type);
    });
    cy.clickSearch();
    const expectedURL = `${BASE_URL}/sale?main_category=${this.filtersData.buy.selectedTypes
      .map((t) => t.toLowerCase())
      .join(",")}`;
    cy.url().should("eq", expectedURL);
  });

  // Test Case 4
  it("Should RENT filter based on property type", function () {
    cy.selectFilter("Rent");
    cy.clickPropertyType();
    cy.verifyPropertyTypes(this.filtersData.rent.propertyTypes);
    this.filtersData.rent.selectedTypes.forEach((type) => {
      cy.selectPropertyType(type);
    });
    cy.clickSearch();
    const expectedURL = `${BASE_URL}/rent?main_category=${this.filtersData.rent.selectedTypes
      .map((t) => t.toLowerCase())
      .join(",")}`;
    cy.url().should("eq", expectedURL);
  });

  // Test case 5
  it("Should BUY filter based on bedrooms", function () {
    cy.selectFilter("Buy");
    cy.clickBedrooms();
    cy.selectBedrooms(this.filtersData.buy.bedroom);
    cy.clickSearch();
    const selectedRoomNumbers = this.filtersData.buy.bedroom
      .map((bedroom) => this.filtersData.buy.roomMapping[bedroom])
      .join(",");
    const expectedUrl = `${BASE_URL}/sale?rooms=${selectedRoomNumbers}`;
    cy.url().should("eq", expectedUrl);
  });

  // Test case 6
  it("Should RENT filter based on bedrooms", function () {
    cy.selectFilter("Rent");
    cy.clickBedrooms();
    cy.selectBedrooms(this.filtersData.rent.bedroom);
    cy.clickSearch();
    const selectedRoomNumbers = this.filtersData.rent.bedroom
      .map((bedroom) => this.filtersData.rent.roomMapping[bedroom])
      .join(",");
    const expectedUrl = `${BASE_URL}/rent?rooms=${selectedRoomNumbers}`;
    cy.url().should("eq", expectedUrl);
  });

  // Test Case 7
  it.only("Should rent filter based on room", function () {
    cy.selectFilter("Rent");
    cy.clickRentalTypes();

    if (
      this.filtersData.rent.selectedUnitTypes.length === 1 &&
      this.filtersData.rent.selectedUnitTypes.includes("Room")
    ) {
      cy.unselectRentalType("Entire unit");

      if (this.filtersData.rent.selectedRoomTypes.length === 1) {
        cy.selectRentalType(this.filtersData.rent.selectedRoomTypes[0]);
        const otherRoomType =
          this.filtersData.rent.selectedRoomTypes[0] === "Common room"
            ? "Master room"
            : "Common room";
        cy.unselectRentalType(otherRoomType);
      }
    }

    cy.clickSearch();

    let rentalTypeParam = this.filtersData.rent.selectedUnitTypes
      .map((type) => this.filtersData.rent.unitMapping[type])
      .join("%2C");
    let roomTypeParam = this.filtersData.rent.selectedRoomTypes
      .map((type) => this.filtersData.rent.unitMapping[type])
      .join("%2C");

    let expectedURL = `${BASE_URL}/rent`;
    if (!this.filtersData.rent.selectedUnitTypes.includes("Entire unit")) {
      expectedURL += `?rental_type=${rentalTypeParam}`;
      if (roomTypeParam) {
        expectedURL += `&room_type=${roomTypeParam}`;
      }
    }

    cy.url().should("eq", expectedURL);
  });
});
