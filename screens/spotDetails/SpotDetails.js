import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Container, Text, Icon} from 'native-base';

import {Header} from '../../components/header/Header';

export const SpotDetails = ({route, navigation}) => {
  const {spot} = route.params;
  return (
    <Container>
      <Image
        style={styles.imageContainer}
        accessibilityLabel="imageElement"
        source={{uri: spot.url}}
      />
      <Header title="info at a glance" />
      <View style={styles.iconText}>
        <Icon
          accessibilityLabel="moneyIcon"
          type="FontAwesome5"
          name="money-bill-wave"
        />
        <Text>{spot.avgCost}</Text>
      </View>
      <View style={styles.iconText}>
        <Icon accessibilityLabel="timeIcon" type="FontAwesome" name="clock-o" />
        <Text>{spot.bestTimes}</Text>
      </View>
      <View style={styles.iconText}>
        <Icon
          accessibilityLabel="dressIcon"
          type="FontAwesome5"
          name="user-astronaut"
        />
        <Text>{spot.dress}</Text>
      </View>
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
  iconText: {
    display: 'flex',
    flexDirection: 'row',
  },
});
