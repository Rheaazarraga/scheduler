import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getAltText, getByPlaceholderText, getByAltText, debug } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {

it("defaults to Monday and changes the schedule when a new day is selected", async() => {
  const { getByText } = render(<Application />);
  
//The Promise chain can be hidden by using the await keyword
  await waitForElement(() => getByText("Monday"));

  fireEvent.click(getByText("Tuesday"));

  expect(getByText("Leopold Silvers")).toBeInTheDocument();
});

it("loads data, books an interview and reduces the spots remaining for the first day by 1", async() => {
  // render the application
  const { container, debug } = render(<Application />);

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

  console.log(prettyDOM(appointment));

  // check that the element with the text "Saving" is displayed
  expect(getByText(appointment, "Saving")).toBeInTheDocument();
  
  // wait until the element with the text "Lydia Miller-Jones" is displayed
  await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
  
  // check that the DayListItem with the text "Monday" also has the text "no spots remaining"
});
  
});
