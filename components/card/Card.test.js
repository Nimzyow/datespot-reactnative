import React from 'react';
import {Card} from './Card';
import {render} from 'react-native-testing-library';

describe('Card', () => {
  let defaultProps;
  beforeEach(() => {
    defaultProps = {
      spot: {
        _id: 'spot1',
        title: 'spot1Title',
        url: 'spot1URL',
        summary: 'spot1Summary',
        likes: [{userId: 'user1'}],
      },
      user: {
        _id: 'testy',
      },
    };
  });
  it('should display Spot with image, title and summary', () => {
    const {getAllByA11yLabel, getByText} = render(<Card {...defaultProps} />);
    const allElements = [
      getAllByA11yLabel('imageElement'),
      getAllByA11yLabel('titleElement'),
      getAllByA11yLabel('summaryElement'),
    ];

    allElements.forEach(element => {
      expect(element.length).toBe(1);
    });

    expect(getByText(defaultProps.spot.title)).toBeTruthy();
    expect(getByText(defaultProps.spot.summary)).toBeTruthy();
  });
  it('should display Spot with button', () => {
    const {getAllByA11yLabel} = render(<Card {...defaultProps} />);
    const buttonElement = getAllByA11yLabel('buttonElement');

    expect(buttonElement.length).toBe(1);
  });
  it('should display Spot with heart icon', () => {
    const {getAllByA11yLabel} = render(<Card {...defaultProps} />);
    const likeElement = getAllByA11yLabel('likeElement');

    expect(likeElement.length).toBe(1);
  });
  it('should display 2 likes for a spot', () => {
    defaultProps.spot.likes = [{userId: 'user1'}, {userId: 'user2'}];
    const {getByText} = render(<Card {...defaultProps} />);

    expect(getByText('2 Likes')).toBeTruthy();
  });
  it('should mention "like" for a spot that only has 1 like', () => {
    const {getByText} = render(<Card {...defaultProps} />);

    expect(getByText('1 Like')).toBeTruthy();
  });
});
