import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { reducer } from "./reducer";
import TestRedux from "./TestRedux";

// custom render function to wrap the component with store
const renderWithRedux = (
  component,
  {
    initialState,
    store = createStore(reducer, initialState),
  } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

describe("Redux testing", () => {
  test("checks initial state", () => {
    const { getByRole } = renderWithRedux(<TestRedux />);

    expect(getByRole("heading")).toHaveTextContent("0");
  });

  test("increment", () => {
    const { getByRole, getByText } = renderWithRedux(<TestRedux />, {
      initialState: { count: 5 },
    });
    userEvent.click(getByText("+1"));

    expect(getByRole("heading")).toHaveTextContent("6");
  });

  test("decrement", () => {
    const { getByRole, getByText } = renderWithRedux(<TestRedux />, {
      initialState: { count: 100 },
    });
    userEvent.click(getByText("-1"));

    expect(getByRole("heading")).toHaveTextContent("99");
  });
});
