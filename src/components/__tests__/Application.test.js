import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  getAllByTestId,
  getAltText,
  prettyDOM,
  getByPlaceholderText,
  getByAltText,
  queryByText,
  queryByAltText,
  debug
} from "@testing-library/react";

import Application from "components/Application";

import axios from "axios";

afterEach(cleanup);

describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    // the Promise chain can be hidden by using the await keyword
    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  // --------------- BOOK INTERVIEW --------------- //

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

  // --------------- DELETE INTERVIEW --------------- //

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {

    // 1. render the Application
    const { container, debug } = render(<Application />);

    // 2. wait until the text "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. click the "Delete" button on the booked appointment
    const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. check that the confirmation message is shown
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();

    // 5. click the "Confirm" button on the confirmation
    fireEvent.click(getByText(appointment, "Confirm"));

    // 6. check that the element with the text "Deleting" is displayed
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 7. wait until the element with the "Add" button is displayed
    await waitForElement(() => getByAltText(appointment, "Add"));

    // 8. check that the DayListItem with the text "Monday" also has the text "2 spots remaining"
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();

    debug();

  });

  // --------------- EDIT INTERVIEW --------------- //

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. render the Application
    const { container, debug } = render(<Application />);

    // 2. wait until the text "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. click the "Edit" button on the booked appointment for Archie Cohen
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Edit"));

    // 4. enter the name "Rhea Jane" into the input with the placeholder "Enter Student Name"
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Rhea Jane" }
    });

    // 5. select an interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 6. click the "Save" button on that same appointment
    fireEvent.click(getByText(appointment, "Save"));

    // 7. check that the element with the text "Saving" is displayed
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 8. wait until the element with the text "Rhea Jane" is displayed
    await waitForElement(() => getByText(appointment, "Rhea Jane"));

    // 9. check that the DayListItem with the text "Monday" also contains the text "1 spot remaining"
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

  });
  
  // --------------- SAVE ERROR HANDLING --------------- //

  it("shows the save error when failing to save an appointment", () => {
    // mock will revert to default behaviour after this test request is complete
    axios.put.mockRejectedValueOnce();

    // 1. render the Application

    // 2. wait until the text "Archie Cohen" is displayed

    // 3. get all the appointments using the test ID, then get the first empty appointment

    // 4. click the "Add" button on the first empty appointment

    // 5. enter the name "Lydia Miller-Jones into the input with the placeholder "Enter Student Name"

    // 5. click the first interview on the list, "Sylvia Palmer"

    // 6. click the "Save" button on that same appointment

    // 7. check that the element with the text "Saving" is being displayed

    // 8. wait until the element with the error text is being displayed

    // 9. click the "close" button

    // 10. click the add button again

    // 11. expect that the empty form is being displayed

    // 12. expect there to still be 1 spot remaining for Monday
    
  });

});

  // "shows the delete error when failing to delete an existing appointment"


