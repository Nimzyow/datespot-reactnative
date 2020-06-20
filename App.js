/**
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';

import store from './store';
import {Home} from './screens/home/Home';
import {SpotDetails} from './screens/spotDetails/SpotDetails';
import Spots from './screens/spots/Spots';
import Authentication from './screens/authentication/Authentication';

const App = () => {
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="home">
          <Stack.Screen
            name="home"
            component={Home}
            options={{title: 'DateSpot'}}
          />
          <Stack.Screen
            name="authentication"
            component={Authentication}
            options={{title: 'DateSpot'}}
          />
          <Stack.Screen
            name="spots"
            component={Spots}
            options={{title: 'DateSpot', headerLeft: null}}
          />
          <Stack.Screen
            name="spotDetails"
            component={SpotDetails}
            options={{title: 'Spot Details'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
