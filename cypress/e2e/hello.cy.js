describe("Hello endpoint", () => {
  it("should load and display the hello message", () => {
    cy.visit("/");
    cy.get("h1").should("contain.text", "Hello");
  });
});
