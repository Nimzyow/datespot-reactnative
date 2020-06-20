import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

export const MapSpotDetail = ({route, navigation}) => {
  const {longitude, latitude, title} = route.params;
  return (
    <View style={{height: '100%'}}>
      <MapView
        minZoomLevel={15}
        zoomControlEnabled={false}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}>
        <Marker
          coordinate={{
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
          }}
          title={title}
        />
      </MapView>
    </View>
  );
};

export default MapSpotDetail;

const styles = StyleSheet.create({
  map: {
    height: '100%',
  },
});
