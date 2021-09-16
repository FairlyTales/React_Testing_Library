import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./basics";

describe("Basics", () => {
  // search variants & assertive functions
  test("search variants & assertive functions", async () => {
    render(<App />);
    screen.debug();

    expect(screen.getByText(/Search:/i)).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByLabelText(/search/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("search text olololo")
    ).toBeInTheDocument();
    expect(screen.getByAltText("search img")).toBeInTheDocument();
    expect(screen.getByDisplayValue("")).toBeInTheDocument();

    // * testing async react elements
    expect(screen.queryByText(/Logged in as/i)).toBeNull();
    expect(await screen.findByText(/Logged in as/i)).toBeInTheDocument();

    // ! in short:
    // * need to check if element is present - getBy...
    // * need to check if element is missing - queryBy...
    // * need to check if async element was missing in first & then showed up - findBy...
  });

  // fireEvent & userEvent
  test("fireEvent & userEvent", async () => {
    render(<App />);
    await screen.findByText(/Logged in as/i);

    expect(screen.queryByText(/inputted value/i)).toBeNull();
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "inputted value" },
    });
    expect(screen.queryByText(/inputted value/i)).toBeInTheDocument();
  });
});

describe("events", () => {
  test("checkbox click", () => {
    // adding a mock function
    const handleChangeMock = jest.fn();

    // getting the rendered element
    const { container } = render(
      <input type="checkbox" onChange={handleChangeMock} />
    );
    const checkbox = container.firstChild;

    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(handleChangeMock).toBeCalled();
    expect(checkbox).toBeChecked();
  });
  test("input focus", () => {
    const { getByTestId } = render(
      <input type="text" data-testid="ourInput" />
    );
    const input = getByTestId("ourInput");

    expect(input).not.toHaveFocus();
    input.focus();
    expect(input).toHaveFocus();
  });
});

describe("user event", () => {
  test("checkbox click by user", () => {
    const handleChangeMock = jest.fn();
    const { container } = render(
      <input type="checkbox" onChange={handleChangeMock} />
    );
    const checkbox = container.firstChild;

    expect(checkbox).not.toBeChecked();
    userEvent.click(checkbox);
    expect(handleChangeMock).toBeCalled();
    expect(checkbox).toBeChecked();
  });
});
