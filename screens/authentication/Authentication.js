import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {Text, Spinner} from 'native-base';

import {connect} from 'react-redux';

import {registerForm, loginForm} from '../../utilities/FormFarm';
import {registerUser, loginUser} from '../../actions/auth';
import {Header} from '../../components/header/Header';

export const Authentication = ({
  registerUser,
  loginUser,
  auth: {isAuthenticated, loading},
  navigation,
}) => {
  const [form, setForm] = useState('login');

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('spots');
    }
  }, [isAuthenticated]);

  const handleSubmit = async state => {
    if (form === 'login') {
      await loginUser(state);
    } else if (form === 'register') {
      await registerUser(state);
    }
  };

  return (
    <View>
      {form === 'register' ? (
        <View>
          <Header title={form} />
          {registerForm(handleSubmit)}
          <Text
            onPress={() => {
              setForm('login');
            }}
            testID="loginHere">
            Registered already? Press here to sign in
          </Text>
        </View>
      ) : (
        <View>
          <Header title={form} />
          {loginForm(handleSubmit)}
          <Text
            onPress={() => {
              setForm('register');
            }}
            testID="registerHere">
            Not Registered yet? Press here to register
          </Text>
        </View>
      )}
      {loading && <Spinner color="red" />}
    </View>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  {
    registerUser,
    loginUser,
  },
)(Authentication);
