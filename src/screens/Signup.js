import React, {Component} from 'react';

import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Keyboard,
  View,
  Text,
} from 'react-native';
import Api from '../utils/api';
import Loader from '../components/Loader';
import {ThemeColors} from '../utils/constants';

import * as Animatable from 'react-native-animatable';
import GlobalStyles from './GlobalStyles';

var AnimatableView = Animatable.createAnimatableComponent(View);

export default class Signup extends Component {
  static navigationOptions = ({navigation}) => ({});
  constructor() {
    super();
    this.state = {
      callingCode: '92',
      invalidAttamptes: 0,
    };
  }

  componentDidMount() {}
  forgotPass = () => {
    // alert('asdf');
    this.props.navigation.navigate('ForgotPass', {
      usertype: this.props.navigation.state.params.userType,
    });
  };

  async signup() {
    Keyboard.dismiss();
    if (!this.state.name) {
      Loader.toast('Please enter your full name');
      return;
    }
    if (!this.state.email) {
      Loader.toast('Please enter your email');
      return;
    }
    if (!this.state.password) {
      Loader.toast('Please enter your password');
      return;
    }
    if (!this.state.password2) {
      Loader.toast('Please re-type your password');
      return;
    }
    if (this.state.password !== this.state.password2) {
      Loader.toast('Passwords do no match');
      return;
    }

    const params = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };

    try {
      const response = await Api.signup(params);
      if (response) {
        this.props.navigation.pop();
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <View style={GlobalStyles.container}>
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
                  placeholder="Full Name"
                  onChangeText={text => this.setState({name: text})}
                  style={styles.input}
                  autoCapitalize="words"
                  value={this.state.mobile}
                />
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
                  onChangeText={text => this.setState({password: text})}
                  style={styles.input}
                  autoCapitalize="none"
                  secureTextEntry={true}
                />
                <TextInput
                  ref={input => {
                    this.password = input;
                  }}
                  getRef={o => {
                    this.password = o;
                  }}
                  placeholder="Retype Password"
                  onSubmitEditing={() => this.signup()}
                  onChangeText={text => this.setState({password2: text})}
                  style={styles.input}
                  autoCapitalize="none"
                  secureTextEntry={true}
                />
              </View>

              <TouchableOpacity
                style={styles.loginButton}
                onPress={this.signup.bind(this)}>
                <Text style={styles.buttonText}>Submit</Text>
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

  buttonText: {
    alignSelf: 'center',
    color: 'white',
  },
  dontHaveAccount: {fontSize: 14, color: 'grey', marginBottom: 20},
  innerView: {flex: 1, width: '100%'},
});
