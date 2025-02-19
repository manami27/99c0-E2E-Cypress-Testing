class PopularProjectsPage {
  getPopularProjectsLinks() {
    return cy.get('[data-cy="projectsListingCard"] > ._2gMFW > a._2aXf0');
  }
}

export default PopularProjectsPage;
