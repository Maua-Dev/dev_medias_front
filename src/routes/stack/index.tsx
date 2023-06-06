import React from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainPage from "../../views/MainPage/MainPage";
import InputGraduationTests from "../../views/InputGraduationTests/InputGraduationTests";
import { propsNavigationStack } from "./models";

const { Navigator, Screen } = createNativeStackNavigator<propsNavigationStack>();

const styles = StyleSheet.create({
    contentStyle: {
      flex: 1,
      backgroundColor: "#000",
      alignItems: "center",
      justifyContent: "center",
    },
  });

const screenOptions = {
  headerShown: false,
  contentStyle: styles.contentStyle,
};

export default function AppStack() {
  return (
    <Navigator initialRouteName="MainPage" screenOptions={screenOptions}>
      <Screen name="MainPage" component={MainPage} />
      <Screen name="InputGraduationTests" component={InputGraduationTests} />
    </Navigator>
  );
}

