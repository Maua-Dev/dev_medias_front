import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import InputGraduationTests from "./src/views/InputGraduationTests/InputGraduationTests";

export default function App() {
  return <SafeAreaView style={styles.container}>
    <StatusBar barStyle={'light-content'} />
    {/* <MainPage /> */}
    <InputGraduationTests />
  </SafeAreaView>
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000"
  }
});
