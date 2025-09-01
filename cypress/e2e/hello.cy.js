describe("Hello endpoint", () => {
  it("should load and display the hello message", () => {
    cy.visit("http://localhost:5173/");
    cy.get("h1").should("contain.text", "Hello");
  });
});
