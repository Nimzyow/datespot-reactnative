import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, Container} from 'native-base';

export const Header = ({title}) => {
  const capitalise = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <Text style={styles.header} accessibilityLabel="textElement">
      {capitalise(title)}
    </Text>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    textAlign: 'center',
  },
});
