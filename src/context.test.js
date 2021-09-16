import React, { useState, useContext, createContext, Fragment } from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const AuthContext = createContext(undefined);

const AuthProvider = ({ children }) => {
  const [isLoggedIn, toggleLoginStatus] = useState(false);

  const toggleLogin = () => {
    toggleLoginStatus(!isLoggedIn);
  };

  return (
    <AuthContext.Provider value={{ toggleLogin, isLoggedIn }}>
      <div>Message: {children}</div>
    </AuthContext.Provider>
  );
};

const ConsumerComponent = () => {
  const { isLoggedIn, toggleLogin } = useContext(AuthContext);

  return (
    <Fragment>
      <input type="button" value="Login" onClick={toggleLogin} />
      {isLoggedIn ? "Welcome!" : "Please, log in"}
    </Fragment>
  );
};

describe("Context test", () => {
  test("check default value", () => {
    const { getByText } = render(
      <AuthProvider>
        <ConsumerComponent />
      </AuthProvider>
    );

    // by default element is present and user isn't logged in
    expect(getByText(/^Message:/)).toHaveTextContent("Message: Please, log in");
  });

  test("check toggle", () => {
    const { getByText, getByRole } = render(
      <AuthProvider>
        <ConsumerComponent />
      </AuthProvider>
    );

    expect(getByText(/^Message:/)).toHaveTextContent("Message: Please, log in");

    userEvent.click(getByRole("button"));
    expect(getByText(/^Message:/)).toHaveTextContent("Message: Welcome!");

    userEvent.click(getByRole("button"));
    expect(getByText(/^Message:/)).toHaveTextContent("Message: Please, log in");
  });
});
