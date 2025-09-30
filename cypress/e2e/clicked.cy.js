describe("Click to replace button", () => {
  it("should replace content when button is clicked", () => {
    cy.visit("/");
    cy.wait(500);

    cy.get('[data-testid="replace-button"]').click();
    cy.get('[data-testid="clicked-button"]').should("exist");
  });
});
