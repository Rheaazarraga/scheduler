describe("Appointments", () => {
  // since state will change throughout testing, reset db at the beginning of each test
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");

    // visit the root of our web server
    cy.visit("/");

    // verify the data has loaded and Monday exists in the DOM
    cy.contains("Monday");
  });

  it("should book an interview", () => {
  // clicks on the "Add" button in the second appointment slot
    cy.get("[alt=Add]")
      .first()
      .click();

      // student enters their name
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    // selects an interviewer
    cy.get("[alt='Sylvia Palmer']").click();

    // clicks the save button
    cy.contains("Save").click();

    // sees the booked appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");    
    cy.contains(".appointment__card--show", "Sylvia Palmer");

  });

  it("should edit an interview", () => {
    // clicks the edit button for an existing appointment
    cy.get("[alt=Edit]")
      .first()
      .click({ force: true });
  
      // clears the input, changes the name and interviewer
      cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");
      cy.get("[alt='Tori Malcolm']").click();

      // clicks the save button
      cy.contains("Save").click();

      // sees the edited appointment
      cy.contains(".appointment__card--show", "Lydia Miller-Jones");    
      cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should delete an interview", () => {
  // clicks the delete button for the existing appointment
    cy.get("[alt=Delete]")
      .click({ force: true });

  // clicks the confirm button
    cy.contains("Confirm").click();

    // sees the appointment slot is empty
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");

    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });

});
