import React from 'react';
import {render} from 'react-native-testing-library';

import {Spots} from './Spots';

describe('Spots', () => {
  let defaultProps;
  beforeEach(() => {
    jest.clearAllMocks();
    defaultProps = {
      navigation: jest.fn(),
      loadUser: jest.fn(),
      getSpots: jest.fn(),
      auth: {
        isAuthenticated: true,
        user: {
          _id: 'testyId',
        },
      },
      spot: {
        spots: [
          {
            _id: 'spot1',
            title: 'spot1Title',
            url: 'spot1URL',
            summary: 'spot1Summary',
            likes: [{userId: 'user1'}],
          },
          {
            _id: 'spot2',
            title: 'spot2Title',
            url: 'spot2URL',
            summary: 'spot2Summary',
            likes: [{userId: 'user1'}, {userId: 'user2'}],
          },
        ],
      },
    };
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
  it('should display two Spots when there are only two spots', () => {
    const {getAllByA11yLabel} = render(<Spots {...defaultProps} />);
    const spotItemElement = getAllByA11yLabel('spotItemElement');
    expect(spotItemElement.length).toBe(2);
  });

  it('should display loading status when spots is null', () => {
    defaultProps.spot.spots = null;
    const {getAllByA11yLabel} = render(<Spots {...defaultProps} />);
    const loadingElement = getAllByA11yLabel('loading');

    expect(loadingElement.length).toBe(1);
  });
  it('should call getSpots function as soon as Spots mounts', () => {
    render(<Spots {...defaultProps} />);

    expect(defaultProps.getSpots).toHaveBeenCalled();
  });
});
