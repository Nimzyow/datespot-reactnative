import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Container, Content, Text} from 'native-base';
import {connect} from 'react-redux';

import {loadUser} from '../../actions/auth';
import {
  getSpots,
  addToLikeCount,
  removeFromLikeCount,
} from '../../actions/spots';

import {Card} from '../../components/card/Card';
import {Footer} from '../../components/footer/Footer';

export const Spots = ({
  navigation,
  auth: {isAuthenticated, user},
  loadUser,
  spot: {spots},
  getSpots,
  addToLikeCount,
  removeFromLikeCount,
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
    <Container accessibilityLabel="spotsContainer" style={styles.container}>
      <Content accessibilityLabel="spotItemsContainer">
        {spots !== null ? (
          spots.map(spot => {
            return (
              <Card
                key={spot._id}
                spot={spot}
                navigation={navigation}
                user={user}
                addToLikeCount={value => addToLikeCount(value)}
                removeFromLikeCount={value => removeFromLikeCount(value)}
              />
            );
          })
        ) : (
          <View accessibilityLabel="loading">
            <Text>Loading</Text>
          </View>
        )}
      </Content>
      <Footer navigation={navigation} />
    </Container>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  spot: state.spot,
});

export default connect(
  mapStateToProps,
  {loadUser, getSpots, addToLikeCount, removeFromLikeCount},
)(Spots);

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
