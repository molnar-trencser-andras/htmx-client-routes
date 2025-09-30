describe("Hello endpoint", () => {
  it("should load and display the hello message", () => {
    cy.visit("/");
    cy.get('[data-testid="hello-title"]').should("contain.text", "Hello");
  });
});
