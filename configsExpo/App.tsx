import { StatusBar, StyleSheet } from "react-native";
import { SubjectProvider } from "./src/contexts/subjectContext";
import Routes from "./src/routes";

export default function App() {
  return <SubjectProvider>
    <StatusBar barStyle={'light-content'} />
    <Routes />
  </SubjectProvider>
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000"
  }
});
