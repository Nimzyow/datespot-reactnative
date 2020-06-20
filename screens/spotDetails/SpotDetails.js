import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Container, Text} from 'native-base';

export const SpotDetails = ({route, navigation}) => {
  const {spot} = route.params;
  return (
    <Container>
      <Image
        style={styles.imageContainer}
        accessibilityLabel="imageElement"
        source={{uri: spot.url}}
      />
      <Text>Spot Details page</Text>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(246,246,246)',
  },
  imageContainer: {
    height: 200,
    width: null,
  },
});
