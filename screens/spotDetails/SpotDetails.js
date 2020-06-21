import React from 'react';
import {View, Image, StyleSheet, ScrollView} from 'react-native';
import {Container, Text, Icon} from 'native-base';

import {Header} from '../../components/header/Header';
import {Footer} from '../../components/footer/Footer';

export const SpotDetails = ({route, navigation}) => {
  const getComments = comments => {
    if (comments.length !== 0) {
      return comments.map(comment => (
        <View key={comment._id} accessibilityLabel="commentElement">
          <Text>{comment.comment}</Text>
        </View>
      ));
    }
    return <Text>No feedback yet!</Text>;
  };

  const {spot} = route.params;
  return (
    <Container>
      <ScrollView>
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
          <Icon
            accessibilityLabel="timeIcon"
            type="FontAwesome"
            name="clock-o"
          />
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
        <View style={styles.iconText}>
          <Icon accessibilityLabel="mapIcon" type="FontAwesome" name="map-o" />
          <Text
            onPress={() =>
              navigation.navigate('mapSpotDetail', {
                latitude: spot.latitude,
                longitude: spot.longitude,
                title: spot.title,
              })
            }>
            Tap here to see this spot on a map!
          </Text>
        </View>
        <Icon
          accessibilityLabel="infoIcon"
          type="FontAwesome5"
          name="info-circle"
        />
        <Text>{spot.description}</Text>
        <Header title="Feedback on this Spot" />
        {getComments(spot.comments)}
        <View style={{height: '100%'}} />
      </ScrollView>
      <Footer navigation={navigation} />
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
  map: {
    height: '100%',
  },
});
