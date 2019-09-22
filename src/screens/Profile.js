import React, {Component} from 'react';

import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  Text,
  Alert,
} from 'react-native';

import {ThemeColors} from '../utils/constants';
import {StackActions, NavigationActions} from 'react-navigation';
import * as Animatable from 'react-native-animatable';
import GlobalStyles from './GlobalStyles';

import store from '../utils/store';

var AnimatableView = Animatable.createAnimatableComponent(View);

export default class Profile extends Component {
  static navigationOptions = ({navigation}) => ({});
  constructor() {
    super();
    this.state = {
      callingCode: '92',
      invalidAttamptes: 0,
    };
  }

  componentDidMount() {}

  async logout() {
    Alert.alert(
      'Are you sure?',
      'You want to delete this job?',
      [
        {text: 'No'},
        {
          text: 'Yes',
          onPress: async () => {
            try {
              await store.removeToken();
              await store.removeUser();
              const resetAction = StackActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({
                    routeName: 'Login',
                  }),
                ],
              });
              this.props.navigation.dispatch(resetAction);
            } catch (error) {
              console.log(error);
            }
          },
        },
      ],
      {cancelable: false},
    );
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
                  editable={false}
                  placeholder="Full Name"
                  style={styles.input}
                  value={store.user.name}
                />
                <TextInput
                  editable={false}
                  placeholder="Email"
                  onChangeText={text => this.setState({email: text})}
                  style={styles.input}
                  value={store.user.email}
                />
              </View>

              <TouchableOpacity
                style={styles.loginButton}
                onPress={this.logout.bind(this)}>
                <Text style={styles.buttonText}>Logout</Text>
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
