import React, {Component} from 'react';

import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  BackHandler,
  Alert,
  Keyboard,
  View,
  Text,
} from 'react-native';
import Api from '../utils/api';
import Loader from '../components/Loader';
import Store from '../utils/store';
import {ThemeColors} from '../utils/constants';

import * as Animatable from 'react-native-animatable';
import {NavigationEvents} from 'react-navigation';
import GlobalStyles from './GlobalStyles';

var AnimatableView = Animatable.createAnimatableComponent(View);

export default class Login extends Component {
  static navigationOptions = ({navigation}) => ({
    header: null,
  });
  constructor() {
    super();
    this.state = {
      callingCode: '92',
      invalidAttamptes: 0,
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }
  handleBackPress = () => {
    Alert.alert(
      'Exit App',
      'Exiting the application?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => BackHandler.exitApp(),
        },
      ],
      {
        cancelable: false,
      },
    );
    return true;
  };

  forgotPass = () => {
    // alert('asdf');
    this.props.navigation.navigate('ForgotPass', {
      usertype: this.props.navigation.state.params.userType,
    });
  };

  async login() {
    Keyboard.dismiss();

    if (!this.state.email) {
      Loader.toast('Please enter your email');
      return;
    }

    if (!this.state.password) {
      Loader.toast('Please enter your password');
      return;
    }

    const params = {
      email: this.state.email,
      password: this.state.password,
    };

    try {
      const response = await Api.loginWithPassword(params);

      if (response) {
        if (response.token) {
          await Store.saveToken(response.token);
          await Store.saveUser(response);
        }
        this.props.navigation.navigate('Home');
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <View style={GlobalStyles.container}>
        <NavigationEvents
          onWillFocus={payload => console.log('will focus', payload)}
          onDidFocus={payload => {
            BackHandler.addEventListener(
              'hardwareBackPress',
              this.handleBackPress,
            );
          }}
          onWillBlur={payload => console.log('will blur', payload)}
          onDidBlur={payload => {
            BackHandler.removeEventListener(
              'hardwareBackPress',
              this.handleBackPress,
            );
          }}
        />

        <View style={styles.innerView}>
          <View style={styles.card}>
            <AnimatableView
              animation="bounceInLeft"
              iterationCount={1}
              direction="normal"
              style={styles.animatingView}>
              <View style={styles.form}>
                <TextInput
                  getRef={o => {
                    this.email = o;
                  }}
                  placeholder="Email"
                  onChangeText={text => this.setState({email: text})}
                  style={styles.input}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  value={this.state.mobile}
                />

                <TextInput
                  ref={input => {
                    this.password = input;
                  }}
                  getRef={o => {
                    this.password = o;
                  }}
                  placeholder="Password"
                  onSubmitEditing={() => this.login()}
                  onChangeText={text => this.setState({password: text})}
                  style={styles.input}
                  autoCapitalize="none"
                  secureTextEntry={true}
                />
              </View>

              <TouchableOpacity
                style={styles.loginButton}
                onPress={this.login.bind(this)}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            </AnimatableView>
            <AnimatableView
              animation="bounceInUp"
              style={styles.animatingViewBottom}>
              <Text style={styles.dontHaveAccount}>
                Don't have an account yet?
              </Text>
              <TouchableOpacity
                style={styles.signupButton}
                onPress={() =>
                  this.props.navigation.navigate('Signup', {
                    userType: this.props.navigation.state.params.userType,
                  })
                }>
                <Text style={styles.buttonText}>Register Now</Text>
              </TouchableOpacity>
            </AnimatableView>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#a9bad6',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '80%',
    height: '70%',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 12,
    padding: 8,
    marginTop: 180,
    alignSelf: 'center',
  },
  form: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 10,
    marginTop: 20,
    flexDirection: 'column',
    width: '100%',
  },
  input: {
    marginTop: 4,
    color: 'black',
    width: '90%',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    height: 40,
  },
  animatingView: {
    height: '50%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatingViewBottom: {
    display: 'flex',
    width: '90%',
    alignItems: 'center',
    marginTop: 20,
  },
  loginButton: {
    backgroundColor: ThemeColors.PRIMARY,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  signupButton: {
    backgroundColor: ThemeColors.BLUE,
    marginBottom: 20,
    padding: 12,
    width: '100%',
  },
  buttonText: {
    alignSelf: 'center',
    color: 'white',
  },
  dontHaveAccount: {fontSize: 14, color: 'grey', marginBottom: 20},
  innerView: {flex: 1, width: '100%'},
});
