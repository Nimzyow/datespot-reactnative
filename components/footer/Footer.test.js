import React from 'react';
import {render} from 'react-native-testing-library';

import {Footer} from './Footer';

describe('Footer', () => {
  const defaultProps = {
    navigation: {
      navigate: jest.fn(),
    },
  };
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
});
