import React, {Component} from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
} from 'react-native';

import Api from '../utils/api';
import Loader from '../components/Loader';
import HeaderButton from '../components/HeaderButton';
import {ThemeColors} from '../utils/constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Dropdown} from 'react-native-material-dropdown';
import GlobalStyles from './GlobalStyles';
import {EventRegister} from 'react-native-event-listeners';

export default class CreateJob extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Create Job',
    headerLeft: (
      <HeaderButton
        direction="left"
        icon="ios-arrow-back"
        onPress={() => {
          navigation.pop();
        }}
      />
    ),
  });
  jobTypes = ['Full Time', 'Part Time'];
  state = {};

  componentDidMount() {}

  async submit() {
    Keyboard.dismiss();
    if (!this.state.jobType) {
      Loader.toast('Please select job type');
      return;
    }
    if (!this.state.title) {
      Loader.toast('Please add job title');
      return;
    }

    if (!this.state.description) {
      Loader.toast('Please enter job description');
      return;
    }
    if (!this.state.company) {
      Loader.toast('Please enter compamny name');
      return;
    }
    if (!this.state.location) {
      Loader.toast('Please enter job location');
      return;
    }
    if (!this.state.industry) {
      Loader.toast('Please select job industry');
      return;
    }
    if (!this.state.experience) {
      Loader.toast('Please select required experience');
      return;
    }
    const params = {
      ...this.state,
    };

    console.log(params);
    try {
      const response = await Api.createJob(params);
      if (response) {
        Loader.success('Job has been created successfully');
        EventRegister.emit('refreshJobsList', 'jobs');
        this.props.navigation.pop();
      }
    } catch (error) {}
  }

  render() {
    return (
      <View style={GlobalStyles.container}>
        <KeyboardAwareScrollView style={styles.scrollView}>
          <View style={styles.innerView}>
            <Dropdown
              containerStyle={styles.dropdown}
              label="Job Type"
              value={this.state.jobType}
              data={this.jobTypes}
              labelExtractor={(item, index) => item}
              onChangeText={(value, index, data) => {
                const item = data[index];
                this.setState({jobType: item});
              }}
            />
            <TextInput
              placeholderTextColor="gray"
              style={styles.input}
              placeholder="Company"
              onChangeText={text => {
                this.setState({company: text});
              }}
              value={this.state.company}
            />
            <TextInput
              placeholderTextColor="gray"
              style={styles.input}
              placeholder="Job Title"
              onChangeText={text => {
                this.setState({title: text});
              }}
              value={this.state.title}
            />
            <TextInput
              placeholderTextColor="gray"
              style={styles.input}
              placeholder="Job Description"
              onChangeText={text => {
                this.setState({description: text});
              }}
              value={this.state.description}
            />
            <TextInput
              placeholderTextColor="gray"
              style={styles.input}
              placeholder="Location"
              onChangeText={text => {
                this.setState({location: text});
              }}
              value={this.state.location}
            />
            <Dropdown
              containerStyle={styles.dropdown}
              label="Experience Level"
              value={this.state.mode}
              data={[
                {name: 'Fresh', value: 'fresh'},
                {name: '0 - 1 year', value: '0 - 1 year'},
                {name: '1 - 3 years', value: '1 - 3 year'},
                {name: '3 - 5 years', value: '3 - 5 year'},
                {name: '5 - 10 years', value: '5 - 10 year'},
                {name: '10+ years', value: '10+ years'},
              ]}
              labelExtractor={(item, index) => item.name}
              onChangeText={(value, index, data) => {
                const item = data[index];
                this.setState({experience: item.value});
              }}
            />

            <Dropdown
              containerStyle={styles.dropdown}
              label="Industry"
              value={this.state.industry}
              data={[
                {name: 'IT', value: 'it'},
                {name: 'Finance', value: 'finance'},
                {name: 'Medical', value: 'medical'},
                {name: 'Construction', value: 'construction'},
                {name: 'Automobile', value: 'automobile'},
                {name: 'Media', value: 'media'},
              ]}
              labelExtractor={(item, index) => item.name}
              onChangeText={(value, index, data) => {
                const item = data[index];
                this.setState({industry: item.value});
              }}
            />
          </View>
        </KeyboardAwareScrollView>

        <TouchableOpacity
          style={styles.button}
          onPress={this.submit.bind(this)}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: '80%',
    height: 40,
    marginHorizontal: 10,
    backgroundColor: ThemeColors.BLUE,
    position: 'absolute',
    bottom: 20,
  },
  inputParent: {
    width: '48%',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 0.1,
    marginTop: 5,
  },
  input: {
    borderColor: 'lightgray',
    color: ThemeColors.BLUE,
    borderWidth: 1.0,
    backgroundColor: 'white',
    fontSize: 13.0,
    height: 40,
    marginVertical: 2,
    paddingHorizontal: 5,
  },
  dropdown: {width: '100%'},
  buttonText: {color: 'white', alignSelf: 'center'},
  scrollView: {padding: 10, flex: 1, width: ' 100%'},
  innerView: {flex: 1},
});
