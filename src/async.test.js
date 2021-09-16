import React from "react";
import axios from "axios";
import { render, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./async";

// manually mocking the axios to use our own test data
jest.mock("axios");

// test data
const hits = [
  { objectID: "1", title: "1" },
  { objectID: "2", title: "2" },
];

describe("async test", () => {
  // positive test case
  test("successful news fetch", async () => {
    // mocking the .get method with promise.resolve
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: { hits } }));
    const { getByRole, findAllByRole } = render(<App />);

    userEvent.click(getByRole("button"));

    // waiting for the "response" when checking items existence
    const items = await findAllByRole("listitem");
    expect(items).toHaveLength(2);
  });

  // negative test case
  test("unsuccessful news fetch", async () => {
    // mocking the .get method with promise.reject
    axios.get.mockImplementationOnce(() => Promise.reject(new Error()));
    const { getByRole, findByText } = render(<App />);

    // look up info on act() at the end of this file
    act(() => userEvent.click(getByRole("button")));

    // waiting for the "response" when checking the error message existence
    const errorMessage = await findByText(/Something went wrong/i);
    expect(errorMessage).toBeInTheDocument();
  });
});

// "act" is a way of putting 'boundaries' around those bits of your code that
// actually 'interact' with your React app - these could be user interactions,
// apis, custom event handlers and subscriptions firing; anything that looks
// like it 'changes' something in your ui. React will make sure your UI is
// updated as 'expected', so you can make assertions on it.
