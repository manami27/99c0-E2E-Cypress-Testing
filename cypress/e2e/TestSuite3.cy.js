import HomePage from "../pageObjects/HomePage";

let BASE_URL = `${Cypress.config("baseUrl")}`;

describe("Search Filters - Buy & Rent", () => {
  const homePage = new HomePage();
  beforeEach(() => {
    homePage.visit();
  });

  it("Verify buy filters element", () => {
    cy.get("._2dHwl")
      .contains("Buy")
      .should("be.visible")
      .click({ force: true });
    cy.contains("Price range").should("be.visible");
    cy.contains("Property type").should("be.visible");
    cy.contains("Bedrooms").should("be.visible");
  });

  it("Should buy filter based on price", () => {
    cy.get("._2dHwl")
      .contains("Buy")
      .should("be.visible")
      .click({ force: true });
    cy.contains("Price range").should("be.visible");

    cy.get("._3oL_Q > ._2rxBL > ._1dg5o").click({ force: true });
    cy.get("[name='price_min']").should("be.visible");
    cy.get("[name='price_max']").should("be.visible");

    const selectedMinPrice = "$100,000";
    const formattedMinPrice = selectedMinPrice.replace(/\$|\,/g, "");

    cy.get("div._1mSEz ul._3H3Wz li")
      .contains(selectedMinPrice)
      .click({ force: true });
    cy.get("[name='price_min']").should(
      "have.attr",
      "value",
      formattedMinPrice
    );

    const selectedMaxPrice = "$500,000";
    const formattedMaxPrice = selectedMaxPrice.replace(/\$|\,/g, "");

    cy.get("div._1mSEz ul._3H3Wz._2QS3q li")
      .contains(selectedMaxPrice)
      .click({ force: true });
    cy.get("[name='price_max']").should(
      "have.attr",
      "value",
      formattedMaxPrice
    );

    cy.get("[data-cy='search']").click({ force: true });
    const expectedUrl = `${BASE_URL}/sale?price_range=${formattedMinPrice}%2C${formattedMaxPrice}`;
    cy.url().should("eq", expectedUrl);
  });

  it("Should buy filter based on property type", () => {
    cy.get("._2dHwl")
      .contains("Buy")
      .should("be.visible")
      .click({ force: true });
    cy.contains("Property type").should("be.visible");
    cy.get(":nth-child(2) > ._2rxBL").click({ force: true });

    const propertyTypes = [
      "All",
      "HDB",
      "Condo",
      "Resale",
      "New Launch",
      "Landed",
    ];
    propertyTypes.forEach((type) => {
      cy.contains("span._2NcKP", type).should("be.visible");
    });

    const selectedTypes = ["HDB", "Condo"];
    selectedTypes.forEach((type) => {
      cy.contains("span._2NcKP", type)
        .parent()
        .find('input[type="checkbox"]')
        .check({ force: true })
        .should("be.checked");
    });

    cy.get("[data-cy='search']").click({ force: true });
    const expectedURL = `${BASE_URL}/sale?main_category=${selectedTypes
      .map((t) => t.toLowerCase())
      .join(",")}`;
    cy.url().should("eq", expectedURL);
  });

  it("Should buy filter based on bedrooms", () => {
    cy.get("._2dHwl")
      .contains("Buy")
      .should("be.visible")
      .click({ force: true });
    cy.contains("Bedrooms").should("be.visible");
    cy.get(":nth-child(3) > ._2rxBL").click({ force: true });

    const bedroomOptions = [
      "All",
      "Studio",
      "1 Bedroom",
      "2 Bedroom",
      "3 Bedroom",
      "4 Bedroom",
      "5+ Bedroom",
    ];
    bedroomOptions.forEach((type) => {
      cy.contains("span._2NcKP", type).should("be.visible");
    });

    const selectedBedrooms = ["1 Bedroom", "3 Bedroom"];
    selectedBedrooms.forEach((type) => {
      cy.contains("span._2NcKP", type)
        .parent()
        .find('input[type="checkbox"]')
        .check({ force: true })
        .should("be.checked");
    });

    cy.get("[data-cy='search']").click({ force: true });

    const roomMapping = {
      Studio: 0,
      "1 Bedroom": 1,
      "2 Bedroom": 2,
      "3 Bedroom": 3,
      "4 Bedroom": 4,
      "5+ Bedroom": 5,
    };

    const selectedRoomNumbers = selectedBedrooms
      .map((bedroom) => roomMapping[bedroom])
      .join(",");
    const expectedURL = `${BASE_URL}/sale?rooms=${selectedRoomNumbers}`;
    cy.url().should("eq", expectedURL);
  });

  it("Verify rent filters element", () => {
    cy.get("._2dHwl")
      .contains("Rent")
      .should("be.visible")
      .click({ force: true });
    cy.contains("Price range").should("be.visible");
    cy.contains("Property type").should("be.visible");
    cy.contains("Bedrooms").should("be.visible");
    cy.contains("Rental type").should("be.visible");
  });

  it("Should rent filter based on price", () => {
    cy.get("._2dHwl")
      .contains("Rent")
      .should("be.visible")
      .click({ force: true });
    cy.contains("Price range").should("be.visible");

    cy.get("._3oL_Q > ._2rxBL > ._1dg5o").click({ force: true });
    cy.get("[name='price_min']").should("be.visible");
    cy.get("[name='price_max']").should("be.visible");

    const selectedMinPrice = "$1,000";
    const formattedMinPrice = selectedMinPrice.replace(/\$|\,/g, "");

    cy.get("div._1mSEz ul._3H3Wz li")
      .contains(selectedMinPrice)
      .click({ force: true });
    cy.get("[name='price_min']").should(
      "have.attr",
      "value",
      formattedMinPrice
    );

    const selectedMaxPrice = "$5,000";
    const formattedMaxPrice = selectedMaxPrice.replace(/\$|\,/g, "");

    cy.get("div._1mSEz ul._3H3Wz._2QS3q li")
      .contains(selectedMaxPrice)
      .click({ force: true });
    cy.get("[name='price_max']").should(
      "have.attr",
      "value",
      formattedMaxPrice
    );

    cy.get("[data-cy='search']").click({ force: true });
    const expectedUrl = `${BASE_URL}/rent?price_range=${formattedMinPrice}%2C${formattedMaxPrice}`;
    cy.url().should("eq", expectedUrl);
  });

  it("Should rent filter based on property type", () => {
    cy.get("._2dHwl")
      .contains("Rent")
      .should("be.visible")
      .click({ force: true });
    cy.contains("Property type").should("be.visible");
    cy.get(":nth-child(2) > ._2rxBL").click({ force: true });

    const propertyTypes = ["All", "HDB", "Condo", "Landed"];
    propertyTypes.forEach((type) => {
      cy.contains("span._2NcKP", type).should("be.visible");
    });

    const selectedTypes = ["HDB", "Condo"];
    selectedTypes.forEach((type) => {
      cy.contains("span._2NcKP", type)
        .parent()
        .find('input[type="checkbox"]')
        .check({ force: true })
        .should("be.checked");
    });

    cy.get("[data-cy='search']").click({ force: true });
    const expectedURL = `${BASE_URL}/rent?main_category=${selectedTypes
      .map((t) => t.toLowerCase())
      .join(",")}`;
    cy.url().should("eq", expectedURL);
  });

  it("Should rent filter based on room", () => {
    cy.get("._2dHwl")
      .contains("Rent")
      .should("be.visible")
      .click({ force: true });
    cy.get(".lSFa5 > ._2rxBL").should("be.visible").click({ force: true });

    const unitTypes = ["Entire unit", "Room", "Master room", "Common room"];

    let selectedUnitTypes = ["Room"];
    let selectedRoomTypes = ["Master room", "Common room"];

    // Jika hanya "Room" yang dipilih, pastikan "Entire Unit" tetap tidak dicentang
    if (selectedUnitTypes.length === 1 && selectedUnitTypes.includes("Room")) {
      cy.contains("span._2NcKP", "Entire unit")
        .parent()
        .find("input[type='checkbox']")
        .uncheck({ force: true })
        .should("not.be.checked");

      // Jika hanya satu room type yang dipilih, pastikan room type lain tidak dicentang
      if (selectedRoomTypes.length === 1) {
        const selectedRoom = selectedRoomTypes[0];
        const otherRoomType =
          selectedRoom === "Common room" ? "Master room" : "Common room";

        // Pastikan selectedRoom tetap checked
        cy.contains("span._2NcKP", selectedRoom)
          .parent()
          .find("input[type='checkbox']")
          .check({ force: true })
          .should("be.checked");

        // Uncheck the other room type
        cy.contains("span._2NcKP", otherRoomType)
          .parent()
          .find("input[type='checkbox']")
          .uncheck({ force: true })
          .should("not.be.checked");
      }
    }

    // Get all available unit type options
    const unitMapping = {
      "Entire unit": "unit",
      Room: "room",
      "Master room": "master",
      "Common room": "common",
    };

    // Klik tombol Search
    cy.get("[data-cy='search']").click({ force: true });

    // Construct expected URL
    let rentalTypeParam = selectedUnitTypes
      .map((type) => unitMapping[type])
      .join("%2C");
    let roomTypeParam = selectedRoomTypes
      .map((type) => unitMapping[type])
      .join("%2C");

    let expectedURL = `${BASE_URL}/rent`;

    // Jika hanya "Entire Unit" yang dipilih, tidak ada parameter tambahan
    if (selectedUnitTypes.includes("Entire unit")) {
      expectedURL = `${BASE_URL}/rent`;
    } else {
      if (rentalTypeParam) {
        expectedURL += `?rental_type=${rentalTypeParam}`;
        if (roomTypeParam) {
          expectedURL += `&room_type=${roomTypeParam}`;
        }
      }
    }
    // Verify the URL
    cy.url().should("eq", expectedURL);
  });
});
