/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import Stack from './src';

export default class App extends Component {
  constructor() {
    super();
    StatusBar.setBarStyle('light-content');
  }
  render() {
    return <Stack />;
  }
}
