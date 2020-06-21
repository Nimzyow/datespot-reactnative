import React from 'react';
import {render, fireEvent} from 'react-native-testing-library';

import {Profile} from './Profile';

describe('Profile', () => {
  let defaultProps;
  beforeEach(() => {
    jest.clearAllMocks();
    defaultProps = {
      spot: {
        spots: [{_id: 'spotId1'}, {_id: 'spotId2'}, {_id: 'spotId3'}],
        filteredByLiked: [
          {_id: 'spotId1', likes: []},
          {_id: 'spotId2', likes: []},
        ],
      },
      auth: {
        user: {
          _id: 'userId',
          username: 'testy',
          email: 'testy@testy.com',
        },
      },
      filterSpotsBasedOnLike: jest.fn(),
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
  it('should call filterSpotsBasedOnLike on mount', () => {
    render(<Profile {...defaultProps} />);
    expect(defaultProps.filterSpotsBasedOnLike).toHaveBeenCalledTimes(1);
    expect(defaultProps.filterSpotsBasedOnLike).toHaveBeenCalledWith(
      defaultProps.auth.user,
    );
  });
  it('should display a list of spots the user has liked', () => {
    const {getAllByA11yLabel} = render(<Profile {...defaultProps} />);

    const likedItemElement = getAllByA11yLabel('spotItemElement');

    expect(likedItemElement.length).toBe(2);
  });
  it('should display a message if user has not liked any spots', () => {
    defaultProps.spot.filteredByLiked = [];
    const {getByText} = render(<Profile {...defaultProps} />);

    expect(
      getByText(
        "You haven't liked any spots yet. Liked spots will appear below",
      ),
    ).toBeTruthy();
  });
  it('should display Liked Spots if user has liked spots', () => {
    const {getByText} = render(<Profile {...defaultProps} />);

    expect(getByText('Liked Spots')).toBeTruthy();
  });
});
