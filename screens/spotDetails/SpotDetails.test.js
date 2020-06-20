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
            comments: [{userId: 'user1', comment: 'this is a comment'}],
          },
        },
      },
      navigation: jest.fn(),
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
    ];
    const {
      avgCost,
      bestTimes,
      dress,
      description,
    } = defaultProps.route.params.spot;

    const textToFind = [
      getByText(avgCost),
      getByText(bestTimes),
      getByText(dress),
      getByText(description),
    ];

    iconToFind.forEach(element => {
      expect(element.length).toBe(1);
    });

    textToFind.forEach(element => {
      expect(element).toBeTruthy();
    });
  });
});
