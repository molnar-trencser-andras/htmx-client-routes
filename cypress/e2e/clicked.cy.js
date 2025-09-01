describe("Click to replace button", () => {
  it("should replace content when button is clicked", () => {
    cy.visit("http://localhost:5173/");
    cy.wait(500);

    cy.contains("button", "Click to replace!").click();
    cy.contains("button", "Hey, you clicked me").should("exist");
  });
});
