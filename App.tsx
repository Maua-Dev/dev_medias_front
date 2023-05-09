import { SafeAreaView, StatusBar, StyleSheet } from "react-native";

export default function App() {
  return <SafeAreaView style={styles.container}>
    <StatusBar barStyle={'light-content'} />
  </SafeAreaView>
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000"
  }
});
