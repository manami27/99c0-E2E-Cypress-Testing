import HomePage from "../pageObjects/HomePage";
import PopularProjectsPage from "../pageObjects/PopularProjectsPage";

describe("Popular Projects - Link Verification", () => {
  const homePage = new HomePage();
  const popularProjectsPage = new PopularProjectsPage();

  beforeEach(() => {
    homePage.visit();
  });

  it("should verify all links under Popular Projects are working", function () {
    popularProjectsPage.getPopularProjectsLinks().each(($el) => {
      const href = $el.prop("href");

      expect(href, "Href should not be empty").to.not.be.empty;

      cy.request(href).its("status").should("eq", 200);
    });
  });
});
