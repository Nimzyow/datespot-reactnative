import React from 'react';
import {Footer as FooterNB, FooterTab, Button, Icon} from 'native-base';

export const Footer = ({navigation}) => {
  return (
    <FooterNB accessibilityLabel="footerContainer">
      <FooterTab>
        <Button accessibilityLabel="homeElement">
          <Icon name="home" />
        </Button>
        <Button accessibilityLabel="profileElement">
          <Icon name="person" />
        </Button>
      </FooterTab>
    </FooterNB>
  );
};
