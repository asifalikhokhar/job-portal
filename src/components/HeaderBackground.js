import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import { ThemeColors } from "../utils/constants";

const HeaderBackground = () => {
  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        {
          bottom: 10,
          height: Platform.OS == "android" ? 65 : 65,
          backgroundColor: ThemeColors.BLUE,
          overflow: "hidden",
          display: "flex",
          justifyContent: "flex-end"
        }
      ]}
    />
  );
};

export default HeaderBackground;
