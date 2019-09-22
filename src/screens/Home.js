import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import GlobalStyles from './GlobalStyles';
import Store from '../utils/store';
import Api from '../utils/api';
import {ThemeColors} from '../utils/constants';
import JobsList from '../components/JobsList';
import HeaderButton from '../components/HeaderButton';
import {EventRegister} from 'react-native-event-listeners';

export default class Home extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Home',
    headerRight: (
      <HeaderButton
        direction="right"
        icon="md-person"
        onPress={() => {
          navigation.navigate('Profile');
        }}
      />
    ),
    headerLeft: null,
  });
  constructor() {
    super();
    this.state = {jobs: []};
  }

  componentDidMount() {
    this.listener = EventRegister.addEventListener(
      'refreshJobsList',
      async text => {
        try {
          this.getJobs();
        } catch (error) {}
      },
    );
    this.getJobs();
  }

  async getJobs() {
    try {
      const jobs = await Api.getJobs();
      this.setState({jobs});
    } catch (error) {}
  }

  async didDeleteJob(job) {
    Alert.alert(
      'Are you sure?',
      'You want to delete this job?',
      [
        {text: 'No'},
        {
          text: 'Yes',
          onPress: async () => {
            try {
              const response = await Api.deleteJob({
                _id: job._id,
              });
              if (response) {
                this.setState({jobs: response});
              }
            } catch (error) {}
          },
        },
      ],
      {cancelable: false},
    );
  }

  render() {
    return (
      <View style={[GlobalStyles.container]}>
        <JobsList
          data={this.state.jobs}
          didDeleteJob={this.didDeleteJob.bind(this)}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => this.props.navigation.navigate('CreateJob')}>
          <Text style={styles.buttonText}>Create Job</Text>
        </TouchableOpacity>
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

  addButton: {
    backgroundColor: ThemeColors.PRIMARY,

    padding: 12,
    width: '80%',
    position: 'absolute',
    bottom: 20,
  },
  buttonText: {
    alignSelf: 'center',
    color: 'white',
  },

  innerView: {flex: 1, width: '100%'},
});
