import React, { Component } from "react";
import Api from "../utils/api";
import HeaderButton from "./HeaderButton";
import IconBadge from "react-native-icon-badge";
import { View, Text, Platform, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import Store from "../utils/store";
import { ThemeColors } from "../utils/constants";

const AlertsButton = ({ count, navigation }) => (
  <View
    style={{
      alignItems: "flex-start",
      width: 44
    }}
  >
    <IconBadge
      MainElement={
        <TouchableOpacity
          style={{
            width: 44,
            alignItems: "center",
            justifyContent: "flex-start"
          }}
          onPress={() =>
            navigation.navigate("Notifications", { isFromDrawer: false })
          }
        >
          <Icon name={"bell"} size={24} color={ThemeColors.BLUE} />
        </TouchableOpacity>
      }
      BadgeElement={
        <Text style={{ fontSize: 10, color: ThemeColors.WHITE }}>
          {count + ""}
        </Text>
      }
      IconBadgeStyle={{
        position: "absolute",
        top: 0,
        right: 5,
        width: 12,
        height: 12,
        backgroundColor: ThemeColors.ORANGE
      }}
      Hidden={count == 0}
    />
  </View>
);

export default AlertsButton;
