import { ChevronLeftIcon } from "react-native-heroicons/outline";
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  StyleSheet,
  Button,
  Pressable,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const ios = Platform.OS == "ios";
const topMargin = ios ? "" : " mt-3";
var { width, height } = Dimensions.get("window");

export default function BackBtn() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={[styles.backIcon, styles.topIcons]}
      onPress={() => navigation.goBack("Home")}
    >
      <ChevronLeftIcon
        className="mx-auto"
        size="22"
        strokeWidth={2}
        color="white"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backIcon: {
    backgroundColor: "#197AEC",
  },
  topIcons: {
    width: width * 0.11,
    height: width * 0.11,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
});
