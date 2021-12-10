import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getAltText, getByPlaceholderText, getByAltText, queryByText, queryByAltText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    // the Promise chain can be hidden by using the await keyword
    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });


  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    // render the application
    const { container } = render(<Application />);

    // wait until the text "Archie Cohen is displayed"
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // get all the appointment articles
    const appointments = getAllByTestId(container, "appointment");

    // retrieves the first appointment article which is an empty appointment from the mock data
    const appointment = appointments[0];

    // click the "Add" button on the first empty appointment
    fireEvent.click(getByAltText(appointment, "Add"));

    //Enter the name "Lydia MIller-Jones" into the input with the placeholder "Enter Student Name"
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    // click the first interviewer in the list
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    // click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));

    // check that the element with the text "Saving" is displayed
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // wait until the element with the text "Lydia Miller-Jones" is displayed
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    // check that the DayListItem with the text "Monday" also has the text "no spots remaining"
    const day = getAllByTestId(container, "day").find(day =>
      //use queryByText because we want to have the value null returned if it doesn't find the day specified
      queryByText(day, "Monday"));

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();

  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async() => {

    // 1. render the Application
    const { container, debug } = render(<Application />);
 
   // 2. wait until the text "Archie Cohen" is displayed
   await waitForElement(() => getByText(container, "Archie Cohen"));

   // 3. click the "Delete" button on the booked appointment
   const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"));

   fireEvent.click(queryByAltText(appointment, "Delete"));

   expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();

   // 4. check that the confirmation message is shown
 
   // 5. click the "Confirm" button on the confirmation
 
   // 6. check that the element with the text "Deleting" is displayed
 
 
   // 7. wait until the element with the "Add" button is displayed
 
 
   // 8. check that the DayListItem with the text "Monday" also has the text "2 spots remaining"

   debug();
 
});


// "loads data, edits an interview and keeps the spots remaining for Monday the same"


// "shows the save error when failing to save an appointment"


// "shows the delete error when failing to delete an existing appointment"

});
