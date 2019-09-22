import Loader from '../components/Loader';
import Store from './store';

class Api {
  constructor() {
    this.baseURL = 'http://localhost:3008/api/v1/';
  }

  async _checkStatus(responseBody) {
    let response = await responseBody.json();
    if (this.loading !== undefined) {
      Loader.hide(this.loading);
      this.loading = undefined;
    }
    console.log('parsed:', response);
    if (response.status >= 200 && response.status <= 201) {
      return response.data;
    } else {
      console.log('Error =>', response);
      var error = new Error('An unknown error occured, please try again');
      if (response) {
        try {
          error = new Error(response.message);
        } catch (e) {}
      }
      error.response = response;
      throw error;
    }
  }

  async _request(url, method, params) {
    if (this.loading === undefined && (params && !params.hideLoader)) {
      this.loading = Loader.show();
    }
    let fetchParams = {
      method: method,
    };
    if (params) {
      delete params.hideLoader;
    }
    Object.assign(fetchParams, params || {});
    fetchParams.headers = Object.assign({}, fetchParams.headers || {}, {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
    if (!fetchParams.ignoreToken) {
      fetchParams.headers['Authorization'] = 'Bearer ' + Store.token;
    } else {
      delete fetchParams.ignoreToken;
    }

    url = this.baseURL + url;
    console.log(fetchParams);
    try {
      let response = await fetch(url, fetchParams);
      // console.log("first response => ", response);
      response = await this._checkStatus(response);
      return response;
    } catch (error) {
      console.log('Exceptiom: ', error);
      if (this.loading !== undefined) {
        Loader.hide(this.loading);
        this.loading = undefined;
      }
      if (error.response) {
        Loader.toast(error.response.message);
      } else {
        Loader.toast(
          'Network request failed, please check your internet connection',
        );
      }
    }
  }

  _get(url, params) {
    for (var key in params) {
      if (key !== 'hideLoader') {
        url = url + '/' + params[key];
      }
    }
    return this._request(url, 'GET', params);
  }

  _post(url, params) {
    params.body = JSON.stringify(params.body);
    return this._request(url, 'POST', params);
  }

  _put(url, params) {
    params.body = JSON.stringify(params.body);
    return this._request(url, 'PUT', params);
  }

  _delete(url, params) {
    params.body = JSON.stringify(params.body);
    return this._request(url, 'DELETE', params);
  }

  loginWithPassword(data) {
    return this._post('users/login', {body: data});
  }

  signup(data) {
    return this._post('users/signup', {body: data});
  }

  createJob(data) {
    return this._post('jobs/create', {body: data});
  }

  deleteJob(data) {
    return this._delete('jobs/delete', {body: data});
  }

  getJobs() {
    return this._get('jobs/get', {});
  }
}

let singleton = new Api();

export default singleton;
