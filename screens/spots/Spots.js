import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {Card, CardItem, Container, Content} from 'native-base';
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
    <View accessibilityLabel="spotsContainer">
      <Container accessibilityLabel="spotItemsContainer">
        <Content>
          <Card>
            {spots !== null ? (
              spots.map(spot => {
                return (
                  <CardItem key={spot._id} accessibilityLabel="spotItemElement">
                    <Text>{spot.title}</Text>
                  </CardItem>
                );
              })
            ) : (
              <View accessibilityLabel="loading">
                <Text>Loading</Text>
              </View>
            )}
          </Card>
        </Content>
      </Container>
    </View>
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
