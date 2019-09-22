import React from 'react';
import {TouchableOpacity, Image, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {ThemeColors} from '../utils/constants';

const HeaderButton = ({direction, image, icon, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        marginTop: Platform.OS == 'android' ? 30 : null,
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={onPress}>
      {icon ? (
        <Icon name={icon} size={28} color={ThemeColors.BLUE} />
      ) : (
        <Image
          source={image}
          resizeMode="contain"
          style={{width: 24, height: 24}}
        />
      )}
    </TouchableOpacity>
  );
};

export default HeaderButton;
