describe("Lazy DemoComp loading", () => {
  it("should load DemoComp only when scrolled into view", () => {
    cy.visit("/");

    cy.contains("Component placeholder");
    cy.contains("This is a React Component loaded by htmx").should("not.exist");
    cy.scrollTo(0, 1500);
    cy.contains("This is a React Component loaded by htmx").should("exist");
  });
});
