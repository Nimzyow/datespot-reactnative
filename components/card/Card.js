import React, {useState, useEffect} from 'react';
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

export const Card = ({
  spot,
  navigation,
  user,
  addToLikeCount,
  removeFromLikeCount,
}) => {
  const [color, setColor] = useState('');

  useEffect(() => {
    if (user) {
      setColorOfHeart();
    }
  }, [spot.likes]);

  const setColorOfHeart = () => {
    if (spot.likes.length === 0) {
      setColor('black');
    } else {
      let currentUserLikedSpot = spot.likes.filter(
        like => like.userId === user._id,
      ).length;
      if (currentUserLikedSpot === 0) {
        setColor('black');
      } else {
        setColor('red');
      }
    }
  };

  const setLikeState = () => {
    if (color === 'black') {
      addToLikeCount({spotId: spot._id, userId: user._id});
    } else {
      removeFromLikeCount({spotId: spot._id, userId: user._id});
    }
  };

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
          <Button transparent onPress={setLikeState}>
            <Icon
              accessibilityLabel="likeElement"
              type="FontAwesome"
              name={color === 'black' ? 'heart-o' : 'heart'}
              style={color === 'black' ? {color: 'black'} : {color: 'red'}}
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
      <CardItem header button>
        <Button
          accessibilityLabel="buttonElement"
          danger
          onPress={() => navigation.navigate('spotDetails', {spot: spot})}>
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
