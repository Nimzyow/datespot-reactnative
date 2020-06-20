import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {
  Card as CardNB,
  CardItem,
  Left,
  Body,
  Text,
  Icon,
  Button,
} from 'native-base';

export const Card = ({spot, navigation}) => {
  return (
    <CardNB key={spot._id} accessibilityLabel="spotItemElement">
      <CardItem cardBody>
        <Image
          accessibilityLabel="imageElement"
          source={{uri: spot.url}}
          style={styles.imageContainer}
        />
      </CardItem>
      <CardItem>
        <Left>
          <Button transparent>
            <Icon
              accessibilityLabel="likeElement"
              type="FontAwesome"
              name="heart-o"
            />
          </Button>
          <Text>
            {spot.likes.length} {spot.likes.length === 1 ? 'Like' : 'Likes'}
          </Text>
        </Left>
      </CardItem>
      <CardItem>
        <Body>
          <Text accessibilityLabel="titleElement">{spot.title}</Text>
        </Body>
      </CardItem>
      <CardItem>
        <Body>
          <Text accessibilityLabel="summaryElement">{spot.summary}</Text>
        </Body>
      </CardItem>
      <CardItem header button onPress={() => alert('This is Card Header')}>
        <Button
          accessibilityLabel="buttonElement"
          danger
          onPress={() => navigation.navigate('spotDetails')}>
          <Text>Find out more</Text>
        </Button>
      </CardItem>
    </CardNB>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(246,246,246)',
  },
  imageContainer: {
    height: 200,
    width: null,
    flex: 1,
  },
});
