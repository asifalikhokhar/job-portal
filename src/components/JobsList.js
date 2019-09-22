import React, {Component} from 'react';
import {FlatList, Text, View, StyleSheet} from 'react-native';
import JobItem from './JobItem';

export default class JobsList extends Component {
  constructor() {
    super();
  }

  didDeleteJob(item) {
    this.props.didDeleteJob(item);
  }

  render() {
    return (
      <View style={styles.mainView}>
        {this.props.data && this.props.data.length > 0 ? (
          <FlatList
            style={styles.list}
            data={this.props.data}
            renderItem={item => (
              <JobItem
                key={item.item._id}
                item={item.item}
                didDeleteJob={this.didDeleteJob.bind(this)}
              />
            )}
          />
        ) : (
          <Text style={styles.text}>No data to display</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    width: '100%',
    marginTop: 10,
    backgroundColor: '#FAFBFD',
  },
  mainView: {flex: 1, width: '100%'},
  text: {
    color: 'gray',
    fontSize: 15,
    alignSelf: 'center',
    marginTop: 100,
  },
});
