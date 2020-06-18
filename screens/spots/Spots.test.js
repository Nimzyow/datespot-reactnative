import React from 'react';
import {fireEvent, render} from 'react-native-testing-library';

import {Spots} from './Spots';

describe('Spots', () => {
  const defaultProps = {
    navigation: jest.fn(),
    auth: {
      isAuthenticated: true,
    },
    loadUser: jest.fn(),
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should display Spots container', () => {
    const {getAllByA11yLabel} = render(<Spots {...defaultProps} />);
    const spotsContainer = getAllByA11yLabel('spotsContainer');

    expect(spotsContainer.length).toBe(1);
  });
  it('should display Spots available', () => {
    const {getAllByA11yLabel} = render(<Spots {...defaultProps} />);
    const spotItemsContainer = getAllByA11yLabel('spotItemsContainer');

    expect(spotItemsContainer.length).toBe(1);
  });
});
