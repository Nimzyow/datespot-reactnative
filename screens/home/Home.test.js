import React from "react";
import { render } from "react-native-testing-library";
import { Home } from "./Home";

it("renders app view without error", () => {
  const { getAllByA11yLabel } = render(<Home />);

  const homeContainer = getAllByA11yLabel("homeContainer");

  expect(homeContainer.length).toBe(1);
});

it("renders get started button", () => {
  const { getAllByA11yLabel } = render(<Home />);

  const getStarted = getAllByA11yLabel("getStarted");

  expect(getStarted.length).toBe(1);
});
