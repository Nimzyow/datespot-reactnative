import React from 'react';
import {View} from 'react-native';
import {Text, Icon} from 'native-base';

export const Profile = ({navigation, auth: {user}}) => {
  return (
    <View accessibilityLabel="profileContainer">
      <View accessibilityLabel="usernameContainer">
        <Icon
          type="FontAwesome"
          name="user-o"
          accessibilityLabel="usernameIcon"
        />
        <Text>{user.username}</Text>
      </View>
      <View accessibilityLabel="emailContainer">
        <Icon type="AntDesign" name="mail" accessibilityLabel="emailIcon" />
        <Text>{user.email}</Text>
      </View>
    </View>
  );
};
