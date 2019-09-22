import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Platform} from 'react-native';
import React from 'react';
import HeaderBackground from '../components/HeaderBackground';
import HeaderButton from '../components/HeaderButton';
import Splash from './Splash';
import Login from './Login';
import Signup from './Signup';
import CreateJob from './CreateJob';
import Profile from './Profile';

import Home from './Home';

import {ThemeColors} from '../utils/constants';

const mainNavigator = createStackNavigator(
  {
    Splash,
    Login,
    Signup,
    Home,
    CreateJob,
    Profile,
  },
  {
    cardStyle: {
      backgroundColor: ThemeColors.BACKGROUND,
    },
    headerLayoutPreset: 'center',
    navigationOptions: ({navigation}) => ({
      headerTintColor: ThemeColors.BLUE,
      headerBackTitle: null,
      headerTransparent: false,
      headerBackground: <HeaderBackground />,
      headerTitleStyle: {
        marginTop: Platform.OS === 'android' ? 25 : null,
        paddingBottom: 15,
        color: 'black',
        textAlign: 'center',
        fontWeight: 'normal',
      },
      headerLeft: (
        <HeaderButton
          direction="left"
          icon="md-arrow-back"
          onPress={() => navigation.goBack()}
        />
      ),
    }),
  },
);

export default createAppContainer(mainNavigator);
