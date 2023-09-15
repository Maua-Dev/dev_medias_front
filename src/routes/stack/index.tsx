import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import InputGraduationTests from "../../views/InputGraduationTests/InputGraduationTests";
import MainPage from "../../views/MainPage/MainPage";
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
  orientation: 'portrait',
  animation: 'slide_from_right'
};

export default function AppStack() {
  return (
    <Navigator initialRouteName="MainPage" screenOptions={screenOptions}>
      <Screen name="MainPage" component={MainPage} />
      <Screen name="InputGraduationTests" component={InputGraduationTests} />
    </Navigator>
  );
}

