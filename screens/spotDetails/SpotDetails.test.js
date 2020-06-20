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
});
