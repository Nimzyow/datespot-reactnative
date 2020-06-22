import React from 'react';
import {render} from 'react-native-testing-library';

import {SpotDetails} from './SpotDetails';

describe('SpotDetails', () => {
  let defaultProps;
  beforeEach(() => {
    jest.clearAllMocks();
    defaultProps = {
      route: {
        params: {
          spot: {
            _id: 'spotId',
            url: 'imageUrl',
            description: 'this is a description',
            location: 'random location',
            avgCost: '40',
            dress: 'Casual',
            bestTimes: 'Avoid Wednesday',
            advice: 'this is great advice',
            comments: [
              {
                _id: 'commentId1',
                userId: 'user1',
                comment: 'this is a comment',
              },
              {
                _id: 'commentId2',
                userId: 'user2',
                comment: 'this is a second comment',
              },
            ],
            longitude: '1',
            latitude: '2',
          },
        },
      },
      navigation: jest.fn(),
      auth: {
        user: {_id: 'userId'},
      },
      spot: {
        spots: {_id: 'userId'},
      },
    };
  });

  it('should display spot image', () => {
    const {getAllByA11yLabel} = render(<SpotDetails {...defaultProps} />);

    const imageElement = getAllByA11yLabel('imageElement');

    expect(imageElement.length).toBe(1);
  });
  it('should display icon and text for info at a glance section', () => {
    const {getAllByA11yLabel, getByText} = render(
      <SpotDetails {...defaultProps} />,
    );

    const iconToFind = [
      getAllByA11yLabel('moneyIcon'),
      getAllByA11yLabel('timeIcon'),
      getAllByA11yLabel('dressIcon'),
      getAllByA11yLabel('infoIcon'),
      getAllByA11yLabel('mapIcon'),
    ];
    const {
      avgCost,
      bestTimes,
      dress,
      description,
    } = defaultProps.route.params.spot;

    const textToFind = [
      getByText(`£${avgCost}`),
      getByText(bestTimes),
      getByText(dress),
      getByText(description),
      getByText('Tap here to see this spot on a map!'),
    ];

    iconToFind.forEach(element => {
      expect(element.length).toBe(1);
    });

    textToFind.forEach(element => {
      expect(element).toBeTruthy();
    });
  });
  it('should display "no feedback yet" if there is no feedback', () => {
    defaultProps.route.params.spot.comments = [];
    const {getByText} = render(<SpotDetails {...defaultProps} />);
    expect(getByText('No feedback yet!')).toBeTruthy();
  });
  it('should display all comments in feedback', () => {
    const {getAllByA11yLabel} = render(<SpotDetails {...defaultProps} />);

    const commentElement = getAllByA11yLabel('commentElement');

    expect(commentElement.length).toBe(2);
  });
});
