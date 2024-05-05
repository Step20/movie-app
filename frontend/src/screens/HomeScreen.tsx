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
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Video } from "expo-av";
import useGetUser from "@/hooks/useGetUser";

export default function HomeScreen() {
  const userId = useGetUser();
  return (
    <View>
      <Text>Movie & {userId ? userId.name : "No Account"}</Text>
    </View>
  );
}
