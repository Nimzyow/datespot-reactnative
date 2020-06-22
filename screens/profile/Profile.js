import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Icon, Container, Content} from 'native-base';

import {connect} from 'react-redux';

import {filterSpotsBasedOnLike} from '../../actions/spots';
import {Footer} from '../../components/footer/Footer';
import {Card} from '../../components/card/Card';
import {Header} from '../../components/header/Header';

export const Profile = ({
  navigation,
  auth: {user},
  spot: {spots, filteredByLiked},
  filterSpotsBasedOnLike,
}) => {
  useEffect(() => {
    filterSpotsBasedOnLike(user);
  }, [spots]);
  return (
    <Container accessibilityLabel="profileContainer">
      <Content>
        <View style={styles.iconText} accessibilityLabel="usernameContainer">
          <Icon
            type="FontAwesome"
            name="user-o"
            accessibilityLabel="usernameIcon"
          />
          <Text style={{marginLeft: 10}}>{user.username}</Text>
        </View>
        <View style={styles.iconText} accessibilityLabel="emailContainer">
          <Icon type="AntDesign" name="mail" accessibilityLabel="emailIcon" />
          <Text style={{marginLeft: 10}}>{user.email}</Text>
        </View>
        {filteredByLiked.length !== 0 && <Header title="Liked Spots" />}
        {filteredByLiked.length !== 0 ? (
          filteredByLiked.map(spot => {
            return <Card key={spot._id} spot={spot} navigation={navigation} />;
          })
        ) : (
          <View>
            <Text>
              You haven't liked any spots yet. Liked spots will appear below
            </Text>
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
  {filterSpotsBasedOnLike},
)(Profile);

const styles = StyleSheet.create({
  iconText: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 40,
    marginTop: 10,
  },
});
