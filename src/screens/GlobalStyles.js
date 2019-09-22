import { StyleSheet } from "react-native";
import {
  THEME_COLOR_ORANGE,
  THEME_COLOR_BLUE,
  THEME_COLOR_BG
} from "../utils/constants";

const GlobalStyles = StyleSheet.create({
  container: {
    backgroundColor: THEME_COLOR_BG,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default GlobalStyles;
