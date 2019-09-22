/**
 * Created by basit on 27/12/2015.
 */
"use strict";

import React, { AsyncStorage } from "react-native";

const EventEmitter = require("EventEmitter");

const USER_KEY = "pp-user";
const USER_TYPE = "pp-user-type";
const TOKEN_KEY = "pp-user-token";

class Store extends EventEmitter {
  constructor() {
    super();
    this.state = { cart: 0 };
    console.log("constructir", this.state.cart);
  }

  getState() {
    return this.state;
  }

  saveUser(user) {
    this.state.user = user;
    this._saveUserObject(user);
  }

  saveUserType(userType) {
    this._saveUserType(userType);
  }

  saveToken(token) {
    this.state.token = token;
    this._saveToken(token);
  }

  setHome(home) {
    this.state.home = home;
  }

  setMainNavigation(nav) {
    this.state.nav = nav;
  }

  async _saveUserObject(user) {
    try {
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
      console.log("User saved");
    } catch (error) {
      console.log("Error saving user");
    }
  }

  async _saveUserType(userType) {
    try {
      await AsyncStorage.setItem(USER_TYPE, userType);
      console.log("User saved");
    } catch (error) {
      console.log("Error saving type");
    }
  }

  async _saveToken(token) {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
      console.log("Error saving token");
    }
  }

  async getLastSavedUser() {
    var user = await AsyncStorage.getItem(USER_KEY);
    if (user) {
      user = JSON.parse(user);
    }
    this.state.user = user;
    return user;
  }

  async getLastSavedToken() {
    var token = await AsyncStorage.getItem(TOKEN_KEY);
    this.state.token = token;
    return token;
  }

  async getSavedUserType() {
    var token = await AsyncStorage.getItem(USER_TYPE);
    this.state.userType = token;
    return token;
  }

  async removeUser() {
    var user = AsyncStorage.removeItem(USER_KEY);
    return user;
  }

  async removeToken() {
    var user = AsyncStorage.removeItem(TOKEN_KEY);
    return user;
  }

  get user() {
    return this.state.user;
  }

  get userType() {
    return this.state.userType;
  }

  get token() {
    return this.state.token;
  }

  get home() {
    return this.state.home;
  }

  get main() {
    return this.state.nav;
  }
}

// let singleton = new Store();

export default new Store();
