import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Icon, Container, Content} from 'native-base';

import {connect} from 'react-redux';

import {Footer} from '../../components/footer/Footer';

export const Profile = ({navigation, auth: {user}}) => {
  return (
    <Container accessibilityLabel="profileContainer">
      <Content>
        <View style={styles.iconText} accessibilityLabel="usernameContainer">
          <Icon
            type="FontAwesome"
            name="user-o"
            accessibilityLabel="usernameIcon"
          />
          <Text>{user.username}</Text>
        </View>
        <View style={styles.iconText} accessibilityLabel="emailContainer">
          <Icon type="AntDesign" name="mail" accessibilityLabel="emailIcon" />
          <Text>{user.email}</Text>
        </View>
      </Content>
      <Footer navigation={navigation} />
    </Container>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
});

const styles = StyleSheet.create({
  iconText: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default connect(mapStateToProps)(Profile);
