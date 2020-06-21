import React from 'react';
import {Footer as FooterNB, FooterTab, Button, Icon} from 'native-base';

export const Footer = ({navigation}) => {
  return (
    <FooterNB accessibilityLabel="footerContainer">
      <FooterTab>
        <Button
          testID="homeTest"
          accessibilityLabel="homeElement"
          onPress={() => navigation.navigate('spots')}>
          <Icon name="home" />
        </Button>
        <Button
          testID="profileTest"
          accessibilityLabel="profileElement"
          onPress={() => navigation.navigate('profile')}>
          <Icon name="person" />
        </Button>
      </FooterTab>
    </FooterNB>
  );
};
