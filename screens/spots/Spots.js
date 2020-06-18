import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {Card, Container} from 'native-base';
import {connect} from 'react-redux';

import {loadUser} from '../../actions/auth';

export const Spots = ({navigation, auth: {isAuthenticated}, loadUser}) => {
  useEffect(() => {
    loadUser();
    if (!isAuthenticated) {
      console.log('are we in navigation??');

      navigation.navigate('home');
    }
  }, []);
  return (
    <View accessibilityLabel="spotsContainer">
      <Container accessibilityLabel="spotItemsContainer" />
    </View>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  {loadUser},
)(Spots);
