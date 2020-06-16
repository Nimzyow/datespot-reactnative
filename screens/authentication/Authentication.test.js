import React from "react";
import { fireEvent, render } from "react-native-testing-library";

import { Authentication } from "./Authentication";

describe("Authentication", () => {
  let mockRegisterUser = jest.fn();
  let mockLoginUser = jest.fn();
  let navigation = { navigate: jest.fn() };
  let defaultProps;
  beforeEach(() => {
    jest.clearAllMocks();
    defaultProps = {
      navigation,
      mockRegisterUser,
      mockLoginUser,
      auth: {
        isAuthenticated: false,
      },
    };
  });
  it("should display login form by default", () => {
    const { getAllByA11yLabel } = render(<Authentication {...defaultProps} />);

    const loginFormElement = getAllByA11yLabel("loginForm");

    expect(loginFormElement.length).toBe(1);
  });
  it("should display register form when pressing on register here", () => {
    const { getByTestId, getAllByA11yLabel } = render(
      <Authentication {...defaultProps} />,
    );

    const registerHerePrompt = getByTestId("registerHere");

    fireEvent.press(registerHerePrompt);

    const registerFormElement = getAllByA11yLabel("registerForm");

    expect(registerFormElement.length).toBe(1);
  });
  it("should display login form when pressing on login here", () => {
    const { getAllByA11yLabel, getByTestId } = render(
      <Authentication {...defaultProps} />,
    );

    const registerHerePrompt = getByTestId("registerHere");
    fireEvent.press(registerHerePrompt);

    const loginHerePrompt = getByTestId("loginHere");
    fireEvent.press(loginHerePrompt);

    const loginFormElement = getAllByA11yLabel("loginForm");

    expect(loginFormElement.length).toBe(1);
  });
  it("should navigate to spots page on authentication", () => {
    defaultProps.auth.isAuthenticated = true;
    render(<Authentication {...defaultProps} />);

    expect(navigation.navigate).toHaveBeenCalledTimes(1);
    expect(navigation.navigate).toHaveBeenCalledWith("spots");
  });
});
