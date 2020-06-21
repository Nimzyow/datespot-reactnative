import React from 'react';
import {render, fireEvent} from 'react-native-testing-library';

import {Profile} from './Profile';

describe('Profile', () => {
  let defaultProps;
  beforeEach(() => {
    defaultProps = {
      auth: {
        user: {
          _id: 'userId',
          username: 'testy',
          email: 'testy@testy.com',
        },
      },
    };
  });
  it('should display Profile container', () => {
    const {getAllByA11yLabel} = render(<Profile {...defaultProps} />);
    const spotsContainer = getAllByA11yLabel('profileContainer');

    expect(spotsContainer.length).toBe(1);
  });
  it('should display username and email containers', () => {
    const {getAllByA11yLabel} = render(<Profile {...defaultProps} />);
    const allElements = [
      getAllByA11yLabel('usernameContainer'),
      getAllByA11yLabel('emailContainer'),
    ];

    allElements.forEach(element => {
      expect(element.length).toBe(1);
    });
  });
  it('should display icon and correct text', () => {
    const {getAllByA11yLabel, getByText} = render(
      <Profile {...defaultProps} />,
    );
    const allIconElements = [
      getAllByA11yLabel('usernameIcon'),
      getAllByA11yLabel('emailIcon'),
    ];
    allIconElements.forEach(element => {
      expect(element.length).toBe(1);
    });
    expect(getByText(defaultProps.auth.user.username)).toBeTruthy();
    expect(getByText(defaultProps.auth.user.email)).toBeTruthy();
  });
});
