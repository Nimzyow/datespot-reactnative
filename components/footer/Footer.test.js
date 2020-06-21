import React from 'react';
import {render, fireEvent} from 'react-native-testing-library';

import {Footer} from './Footer';

describe('Footer', () => {
  const defaultProps = {
    navigation: {
      navigate: jest.fn(),
    },
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should display Footer container', () => {
    const {getAllByA11yLabel} = render(<Footer {...defaultProps} />);

    const footerContainer = getAllByA11yLabel('footerContainer');

    expect(footerContainer.length).toBe(1);
  });
  it('should display home and button tabs', () => {
    const {getAllByA11yLabel} = render(<Footer {...defaultProps} />);

    const tabsToTest = [
      getAllByA11yLabel('homeElement'),
      getAllByA11yLabel('profileElement'),
    ];

    tabsToTest.forEach(element => {
      expect(element.length).toBe(1);
    });
  });
  it('should trigger navigation.navigate on press', () => {
    const {getByTestId} = render(<Footer {...defaultProps} />);

    fireEvent.press(getByTestId('homeTest'));
    fireEvent.press(getByTestId('profileTest'));

    expect(defaultProps.navigation.navigate).toHaveBeenCalledTimes(2);
  });
  it('Home button should trigger navigation.navigate with "spots"', () => {
    const {getByTestId} = render(<Footer {...defaultProps} />);

    fireEvent.press(getByTestId('homeTest'));
    expect(defaultProps.navigation.navigate).toHaveBeenCalledWith('spots');
  });
  it('Profile button should trigger navigation.navigate with "profile"', () => {
    const {getByTestId} = render(<Footer {...defaultProps} />);

    fireEvent.press(getByTestId('profileTest'));
    expect(defaultProps.navigation.navigate).toHaveBeenCalledWith('profile');
  });
});
