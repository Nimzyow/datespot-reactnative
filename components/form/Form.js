import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Form, Text, Button} from 'native-base';

import {Header} from '../header/Header';

export const FormCreater = props => {
  const [state, setState] = useState(props.initialState);

  const onChange = e => {
    setState({
      ...state,
      ...e,
    });
  };

  const onSubmit = () => {
    props.handleSubmit(state);
  };

  return (
    <Form accessibilityLabel="formContainer">
      {props.children({state, onChange})}
      <Button onPress={onSubmit}>
        <Text>{props.buttonLabel}</Text>
      </Button>
    </Form>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    textAlign: 'center',
  },
});
