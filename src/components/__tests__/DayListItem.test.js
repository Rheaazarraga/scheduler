import React from "react";

import { render, cleanup, waitForElement, getByText, getAllByTestId, queryByText, debug } from "@testing-library/react";

import DayListItem from "components/DayListItem";
import Application from "components/Application";

afterEach(cleanup);


it("renders 'no spots remaining' when there are 0 spots", () => {
  const { getByText } = render(<DayListItem name="Monday" spots={0} />);
  expect(getByText("no spots remaining")).toBeInTheDocument();
});

it("renders '1 spot remaining' when there is 1 spot", () => {
  const { getByText } = render(<DayListItem name="Monday" spots={1} />);
  expect(getByText("1 spot remaining")).toBeInTheDocument();
});

it("renders '2 spots remaining' when there are 2 spots", () => {
  const { getByText } = render(<DayListItem name="Monday" spots={2} />);
  expect(getByText("2 spots remaining")).toBeInTheDocument();
});

it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async() => {

    // 1. render the Application
    const { container, debug } = render(<Application />);
 
   // 2. wait until the text "Archie Cohen" is displayed
   await waitForElement(() => getByText(container, "Archie Cohen"));

   // 3. click the "Delete" button on the booked appointment

   // 4. check that the confirmation message is shown
 
   // 5. click the "Confirm" button on the confirmation
 
   // 6. check that the element with the text "Deleting" is displayed
 
 
   // 7. wait until the element with the "Add" button is displayed
 
 
   // 8. check that the DayListItem with the text "Monday" also has the text "2 spots remaining"
 
});


// "loads data, edits an interview and keeps the spots remaining for Monday the same"


// "shows the save error when failing to save an appointment"


// "shows the delete error when failing to delete an existing appointment"