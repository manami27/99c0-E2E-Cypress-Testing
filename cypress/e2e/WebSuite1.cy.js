import HomePage from "../pageObjects/HomePage";

describe("99.co Home Page - H2 Title Verification", () => {
  const homePage = new HomePage();

  beforeEach(() => {
    homePage.visit();
  });

  it("should verify all required H2 titles exist with correct text", function () {
    cy.fixture("titles.json").then((data) => {
      data.h2Titles.forEach(({ title, selector }) => {
        homePage
          .getTitle(selector)
          .should("be.visible")
          .and("contain.text", title);
      });
    });
  });
});
