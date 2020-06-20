import React from 'react';
import {render} from 'react-native-testing-library';

import {Header} from './Header';

describe('Header', () => {
  it('should display title', () => {
    const {getAllByA11yLabel, getByText} = render(
      <Header title="random title" />,
    );

    const textElement = getAllByA11yLabel('textElement');

    expect(textElement.length).toBe(1);
    expect(getByText('Random title')).toBeTruthy();
  });
});
