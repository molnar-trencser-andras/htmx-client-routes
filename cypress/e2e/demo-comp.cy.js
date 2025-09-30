describe("Lazy DemoComp loading", () => {
  it("should load DemoComp only when scrolled into view", () => {
    cy.visit("/");

    cy.get('[data-testid="demo-placeholder"]').should('exist');
    cy.get('[data-testid="DemoComp"]').should("not.exist");
    cy.scrollTo(0, 1500);
    cy.get('[data-testid="DemoComp"]').should("exist");
  });
});
