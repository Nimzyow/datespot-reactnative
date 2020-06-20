import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

export const MapSpotDetail = () => {
  return (
    <View style={{height: '100%'}}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: 42.882004,
          longitude: 74.582748,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      />
    </View>
  );
};

export default MapSpotDetail;

const styles = StyleSheet.create({
  map: {
    height: '100%',
  },
});
