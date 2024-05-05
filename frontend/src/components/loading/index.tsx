import { View, StyleSheet, ActivityIndicator, Dimensions } from "react-native";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
const { width, height } = Dimensions.get("window");

export default function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    backgroundColor: "black",
  },
});
