import React from 'react';
import {fireEvent, render} from 'react-native-testing-library';

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
  it('should display two Spots with images, titles and summary', () => {
    const {getAllByA11yLabel, getByText} = render(<Spots {...defaultProps} />);
    const allElements = [
      getAllByA11yLabel('imageElement'),
      getAllByA11yLabel('titleElement'),
      getAllByA11yLabel('summaryElement'),
    ];

    allElements.forEach(element => {
      expect(element.length).toBe(2);
    });
    defaultProps.spot.spots.forEach(element => {
      expect(getByText(element.title)).toBeTruthy();
      expect(getByText(element.summary)).toBeTruthy();
    });
  });
  it('should display two Spots with buttons', () => {
    const {getAllByA11yLabel} = render(<Spots {...defaultProps} />);
    const buttonElement = getAllByA11yLabel('buttonElement');

    expect(buttonElement.length).toBe(2);
  });
  it('should display two Spots with 2 heart icons', () => {
    const {getAllByA11yLabel} = render(<Spots {...defaultProps} />);
    const likeElement = getAllByA11yLabel('likeElement');

    expect(likeElement.length).toBe(2);
  });
  it('should display 2 likes for a spot', () => {
    const {getByText} = render(<Spots {...defaultProps} />);

    expect(getByText('2 Likes')).toBeTruthy();
  });
  it('should mention "like" for a spot that only has 1 like', () => {
    const {getByText} = render(<Spots {...defaultProps} />);

    expect(getByText('1 Like')).toBeTruthy();
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
