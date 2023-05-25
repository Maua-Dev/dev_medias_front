import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { SubjectProvider } from "./src/contexts/subjectContext";
import MainPage from "./src/views/MainPage/MainPage";

export default function App() {
  return <SubjectProvider>
  <SafeAreaView style={styles.container}>
    <StatusBar barStyle={'light-content'} />
    <MainPage />
    {/* <InputGraduationTests /> */}
  </SafeAreaView>
  </SubjectProvider>
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000"
  }
});
