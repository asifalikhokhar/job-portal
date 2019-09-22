import React, {Component} from 'react';

import {StyleSheet, Image, View} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import {USER_TYPE_USER} from '../utils/constants';
import Store from '../utils/store';
import {Assets} from '../uploads';

export default class Splash extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {}
  async componentDidMount() {
    this.timer = setInterval(this.pushLogin.bind(this), 3000);
  }

  async pushLogin() {
    clearInterval(this.timer);
    this.timer = null;
    const token = await Store.getLastSavedToken();

    if (token) {
      const user = await Store.getLastSavedUser();
      if (user) {
        this.props.navigation.navigate('Home');
      }
    } else {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: 'Login',
            params: {userType: USER_TYPE_USER},
          }),
        ],
      });
      this.props.navigation.dispatch(resetAction);
    }
  }

  render() {
    return (
      <View style={styles.view}>
        {/* <Text>Welcome to People's Post</Text> */}
        <Image
          resizeMode="contain"
          style={styles.image}
          source={Assets.splash}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {flex: 1},
  view: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
