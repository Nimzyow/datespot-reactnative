import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Text} from 'native-base';

export const Home = ({navigation}) => {
  return (
    <View accessibilityLabel="homeContainer">
      <Button
        accessibilityLabel="getStarted"
        onPress={() => navigation.navigate('authentication')}>
        <Text>Hello</Text>
      </Button>
    </View>
  );
};
