import React from 'react';
import {FormCreater} from '../components/form/Form';
import {View} from 'react-native';
import {Item, Input} from 'native-base';

export const registerForm = handleSubmit => {
  return (
    <FormCreater
      initialState={{
        username: '',
        email: '',
        password: '',
        password2: '',
      }}
      handleSubmit={handleSubmit}
      formName="Register"
      buttonLabel="Register">
      {({state, onChange}) => {
        const {username, email, password, password2} = state;

        return (
          <View accessibilityLabel="registerForm">
            <Item>
              <Input
                placeholder="username"
                value={username}
                onChangeText={value => onChange({username: value})}
              />
            </Item>
            <Item>
              <Input
                placeholder="email"
                value={email}
                autoCapitalize="none"
                onChangeText={value => onChange({email: value})}
              />
            </Item>
            <Item>
              <Input
                placeholder="password"
                secureTextEntry={true}
                value={password}
                onChangeText={value => onChange({password: value})}
              />
            </Item>
            <Item last>
              <Input
                placeholder="password2"
                secureTextEntry={true}
                value={password2}
                onChangeText={value => onChange({password2: value})}
              />
            </Item>
          </View>
        );
      }}
    </FormCreater>
  );
};

export const loginForm = handleSubmit => {
  return (
    <FormCreater
      initialState={{
        email: '',
        password: '',
      }}
      handleSubmit={handleSubmit}
      formName="Login"
      buttonLabel="Login">
      {({state, onChange}) => {
        const {email, password} = state;

        return (
          <View accessibilityLabel="loginForm">
            <Item>
              <Input
                placeholder="email"
                value={email}
                autoCapitalize="none"
                onChangeText={value => onChange({email: value})}
              />
            </Item>
            <Item last>
              <Input
                placeholder="password"
                secureTextEntry={true}
                value={password}
                onChangeText={value => onChange({password: value})}
              />
            </Item>
          </View>
        );
      }}
    </FormCreater>
  );
};

export const commentForm = handleSubmit => {
  return (
    <FormCreater
      initialState={{
        comment: '',
      }}
      handleSubmit={handleSubmit}
      formName="Feedback"
      buttonLabel="Submit feedback">
      {({state, onChange}) => {
        const {comment} = state;

        return (
          <View accessibilityLabel="loginForm">
            <Item last>
              <Input
                placeholder="type your feedback here"
                value={comment}
                onChangeText={value => onChange({comment: value})}
              />
            </Item>
          </View>
        );
      }}
    </FormCreater>
  );
};
