import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {

});

it("defaults to Monday and changes the schedule when a new day is selected", async() => {
  const { getByText } = render(<Application />);
  
//The Promise chain can be hidden by using the await keyword
  await waitForElement(() => getByText("Monday"));

  fireEvent.click(getByText("Tuesday"));

  expect(getByText("Leopold Silvers")).toBeInTheDocument();
});

