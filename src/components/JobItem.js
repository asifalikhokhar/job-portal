import React, {Component} from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class JobItem extends Component {
  state = {};

  render() {
    return (
      <TouchableOpacity key={this.props.item._id} style={styles.mainButton}>
        <View style={styles.mainView}>
          <Text style={styles.company}>
            {'Company: ' + this.props.item.company}
          </Text>
          <Text style={styles.title}>{'Title: ' + this.props.item.title}</Text>
          <Text style={styles.description}>
            {'Job Description:' + this.props.item.description}
          </Text>
          <Text style={styles.description}>
            {'Required Experience:' + this.props.item.experience}
          </Text>
          <Text style={styles.description}>
            {'Job Industry: ' + this.props.item.industry.toUpperCase()}
          </Text>
        </View>
        <View style={styles.locationView}>
          <TouchableOpacity
            onPress={() => this.props.didDeleteJob(this.props.item)}>
            <Icon name="md-trash" size={24} />
          </TouchableOpacity>
          <Text style={styles.description}>{this.props.item.location}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    marginTop: 10,
    flex: 1,
  },
  locationView: {
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  mainButton: {
    marginHorizontal: 10,
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#ECEDEF',
  },
  company: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    marginTop: 10,
  },
});
