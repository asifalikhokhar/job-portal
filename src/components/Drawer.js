import React from 'react';
import {Text, View, TouchableOpacity, Dimensions} from 'react-native';
import Store from '../utils/store';
import {ThemeColors} from '../utils/constants';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
const height = Dimensions.get('window').height;

const styles = {
  seperator: {
    height: 1,
    backgroundColor: 'transparent',
    alignSelf: 'stretch',
  },
  rowButton: {
    height: 50,
    justifyContent: 'center',
    marginLeft: 30,
  },
  rowView: {
    flex: 1,
    flexDirection: 'row',
  },
  icon: {
    color: ThemeColors.WHITE,
    fontSize: 24,
    width: 24,
    alignSelf: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'normal',
    marginHorizontal: 16,
    color: ThemeColors.WHITE,
  },
  rowInnerView: {flex: 1, justifyContent: 'center'},
  profileParent: {
    height: '100%',
    overflow: 'hidden',
  },
  profileInnerView: {
    flex: 1,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {fontSize: 16, color: 'white', fontWeight: 'bold'},
  email: {fontSize: 14, color: 'white'},
  mainView: {flex: 0, marginBottom: 20, minHeight: height},
  profileView: {
    alignSelf: 'stretch',
    height: '30%',
    marginBottom: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    overflow: 'hidden',
  },
  rowMargin: {marginTop: 5},
};

const Seperator = props => <View style={styles.seperator} />;
const Row = props => (
  <TouchableOpacity style={styles.rowButton} onPress={props.onPress}>
    <View style={styles.rowView}>
      <Icon style={styles.icon} name={props.name} />
      <View style={styles.rowInnerView}>
        <Text style={styles.text}>{props.label}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const ProfileDetails = props => (
  <TouchableOpacity style={styles.profileParent} onPress={props.onPress}>
    <View style={styles.profileInnerView}>
      <Text style={styles.name}>
        {(Store.user || {}).name ||
          (Store.user || {}).firstName + ' ' + (Store.user || {}).lastName}
      </Text>

      <Text style={styles.email}>{(Store.user || {}).email}</Text>
    </View>
  </TouchableOpacity>
);

export default props => (
  <View contentContainerStyle={{backgroundColor: ThemeColors.BLUE}}>
    <View style={styles.mainView}>
      <View style={styles.profileView}>
        {/* <ImageBackground
        style={{ width: "100%", height: 170 }}
        source={require("../assets/Images/side-bg.png")}
      > */}
        <ProfileDetails
          user={props.user}
          navigation={props.navigation}
          onPress={() => {
            //console.log("navigation", props);
            props.navigation.navigate('Profile', {isFromDrawer: true});
            props.navigation.closeDrawer();
          }}
        />
      </View>

      <Row
        name="search-plus"
        label="Create Job"
        useVectorIcon={true}
        onPress={() => {
          props.navigation.navigate('AddRequest');
          props.navigation.closeDrawer();
        }}
      />
      <Seperator color={ThemeColors.BLUE} style={styles.rowMargin} />
      <Row
        name="list-ol"
        label="Jobs List"
        useVectorIcon={true}
        onPress={() => {
          props.navigation.navigate('MyRequestsUser');
          props.navigation.closeDrawer();
        }}
      />
      <Seperator color={ThemeColors.BLUE} style={styles.rowMargin} />
    </View>
  </View>
);
