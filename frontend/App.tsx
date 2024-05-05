import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import store from "./src/app/store";
import AppNavigation from "./src/navigation/AppNavigation";
import MyApolloProvider from "./src/utils/apollo/ApolloProvider";
import HandleLoading from "./src/components/handleLoading";

export default function App() {
  return (
    <MyApolloProvider>
      <Provider store={store}>
        <HandleLoading></HandleLoading>
        <AppNavigation />
      </Provider>
    </MyApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
