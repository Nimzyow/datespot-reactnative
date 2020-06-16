import React from "react";
import { View } from "react-native";
import { render, fireEvent } from "react-native-testing-library";
import { Input, Item } from "native-base";

import { FormCreater } from "./Form";

describe("Form", () => {
  let onSubmitSpy = jest.fn();
  let defaultProps;
  beforeEach(() => {
    jest.clearAllMocks();
    defaultProps = {
      handleSubmit: onSubmitSpy,
      initialState: {},
      formName: "a random name, yay",
      buttonLabel: "submit me",
    };
  });
  it("should render the form container", () => {
    const { getAllByA11yLabel } = render(
      <FormCreater {...defaultProps}>{() => {}}</FormCreater>,
    );

    const formContainer = getAllByA11yLabel("formContainer");

    expect(formContainer.length).toBe(1);
  });
  it("can render children", () => {
    const { getAllByA11yLabel } = render(
      <FormCreater {...defaultProps}>
        {() => {
          return <View accessibilityLabel="test">meow</View>;
        }}
      </FormCreater>,
    );

    const viewElement = getAllByA11yLabel("test");

    expect(viewElement.length).toBe(1);
  });
  it("should display correct form name", () => {
    const { getByText } = render(
      <FormCreater {...defaultProps}>{() => {}}</FormCreater>,
    );

    expect(getByText(defaultProps.formName)).toBeTruthy();
  });
  it("triggers the onChange event on input", () => {
    defaultProps.initialState = { email: "" };

    const { getByPlaceholder, getByTestId } = render(
      <FormCreater {...defaultProps}>
        {({ state, onChange }) => {
          const { email } = state;
          return (
            <View>
              <Item>
                <Input
                  placeholder="email"
                  value={email}
                  onChangeText={(value) => onChange({ email: value })}
                  testID="messageText"
                />
              </Item>
            </View>
          );
        }}
      </FormCreater>,
    );

    fireEvent(getByPlaceholder("email"), "onChangeText", "test@test.com");

    expect(getByTestId("messageText").props.value).toEqual("test@test.com");
  });
  it("clicking submit button calls handleSubmit with state", () => {
    defaultProps.initialState = { email: "" };
    const { getByPlaceholder, getByText } = render(
      <FormCreater {...defaultProps}>
        {({ state, onChange }) => {
          const { email } = state;
          return (
            <View>
              <Item>
                <Input
                  placeholder="email"
                  value={email}
                  onChangeText={(value) => onChange({ email: value })}
                  accessibilityLabel="emailInput"
                />
              </Item>
            </View>
          );
        }}
      </FormCreater>,
    );

    fireEvent(getByPlaceholder("email"), "onChangeText", "test@test.com");

    fireEvent.press(getByText(defaultProps.buttonLabel));

    expect(defaultProps.handleSubmit).toHaveBeenCalledTimes(1);
    expect(defaultProps.handleSubmit).toHaveBeenCalledWith({
      email: "test@test.com",
    });
  });
});
