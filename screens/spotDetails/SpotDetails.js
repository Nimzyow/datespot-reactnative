import React, {useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {Container, Text, Icon, Content} from 'native-base';

import {connect} from 'react-redux';

import {Footer} from '../../components/footer/Footer';
import {commentForm} from '../../utilities/FormFarm';
import {Header} from '../../components/header/Header';
import {postComment} from '../../actions/spots';

export const SpotDetails = ({
  route,
  navigation,
  postComment,
  auth: {user},
  spot: {spots},
}) => {
  const {spot} = route.params;

  const getComments = () => {
    if (spot.comments.length !== 0) {
      return spot.comments.map(comment => (
        <View
          style={styles.commentContainer}
          key={comment._id}
          accessibilityLabel="commentElement">
          <Text style={styles.commentStyle}>{comment.comment}</Text>
        </View>
      ));
    }
    return <Text style={styles.commentStyle}>No feedback yet!</Text>;
  };

  useEffect(() => {
    getComments();
  }, [spots]);

  const handleSubmit = state => {
    let data = {
      comment: state.comment,
      userId: user._id,
      spotId: spot._id,
    };
    postComment(data);
  };

  return (
    <Container>
      <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
        <Content>
          <ScrollView>
            <Image
              style={styles.imageContainer}
              accessibilityLabel="imageElement"
              source={{uri: spot.url}}
            />
            <Header title="info at a glance" />
            <View style={styles.iconText}>
              <Icon
                style={styles.iconStyle}
                accessibilityLabel="moneyIcon"
                type="FontAwesome5"
                name="money-bill-wave"
              />
              <Text>£{spot.avgCost}</Text>
            </View>
            <View style={styles.iconText}>
              <Icon
                style={styles.iconStyle}
                accessibilityLabel="timeIcon"
                type="FontAwesome"
                name="clock-o"
              />
              <Text>{spot.bestTimes}</Text>
            </View>
            <View style={styles.iconText}>
              <Icon
                style={styles.iconStyle}
                accessibilityLabel="dressIcon"
                type="FontAwesome5"
                name="user-astronaut"
              />
              <Text>{spot.dress}</Text>
            </View>
            <View style={styles.iconText}>
              <Icon
                style={styles.iconStyle}
                accessibilityLabel="mapIcon"
                type="FontAwesome"
                name="map-o"
              />
              <Text
                onPress={() =>
                  navigation.navigate('mapSpotDetail', {
                    latitude: spot.latitude,
                    longitude: spot.longitude,
                    title: spot.title,
                  })
                }>
                Tap here to see this spot on a map!
              </Text>
            </View>
            <Icon
              style={styles.infoIcon}
              accessibilityLabel="infoIcon"
              type="FontAwesome5"
              name="info-circle"
            />
            <Text style={{margin: 15}}>{spot.description}</Text>
            <Header title="Feedback on this Spot" />
            {getComments()}
            <Header title={'Feedback form'} />
            {commentForm(handleSubmit)}
            <View style={{height: '200%'}} />
          </ScrollView>
        </Content>
      </KeyboardAvoidingView>
      <Footer navigation={navigation} />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(246,246,246)',
  },
  imageContainer: {
    height: 200,
    width: null,
  },
  iconText: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 40,
    marginTop: 10,
  },
  map: {
    height: '100%',
  },
  iconStyle: {
    width: 50,
  },
  infoIcon: {
    textAlign: 'center',
    margin: 15,
  },
  commentContainer: {
    margin: 15,
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 10,
  },
  commentStyle: {
    padding: 5,
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
  spot: state.spot,
});

export default connect(
  mapStateToProps,
  {postComment},
)(SpotDetails);
