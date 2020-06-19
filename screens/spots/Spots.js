import React, {useEffect} from 'react';
import {View, Image} from 'react-native';
import {Card, CardItem, Container, Content, Body, Text} from 'native-base';
import {connect} from 'react-redux';

import {loadUser} from '../../actions/auth';
import {getSpots} from '../../actions/spots';

export const Spots = ({
  navigation,
  auth: {isAuthenticated},
  loadUser,
  spot: {spots},
  getSpots,
}) => {
  useEffect(() => {
    loadUser();
    if (!isAuthenticated) {
      console.log('are we in navigation??');

      navigation.navigate('home');
    }
    getSpots();
  }, []);
  return (
    <Container accessibilityLabel="spotsContainer">
      <Content accessibilityLabel="spotItemsContainer">
        {spots !== null ? (
          spots.map(spot => {
            return (
              <Card key={spot._id} accessibilityLabel="spotItemElement">
                <CardItem cardBody>
                  <Image
                    accessibilityLabel="imageElement"
                    source={{uri: spot.url}}
                    style={{height: 200, width: null, flex: 1}}
                  />
                </CardItem>
                <CardItem>
                  <Body>
                    <Text accessibilityLabel="titleElement">{spot.title}</Text>
                  </Body>
                </CardItem>
                <CardItem>
                  <Body>
                    <Text accessibilityLabel="summaryElement">
                      {spot.summary}
                    </Text>
                  </Body>
                </CardItem>
              </Card>
            );
          })
        ) : (
          <View accessibilityLabel="loading">
            <Text>Loading</Text>
          </View>
        )}
      </Content>
    </Container>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  spot: state.spot,
});

export default connect(
  mapStateToProps,
  {loadUser, getSpots},
)(Spots);
