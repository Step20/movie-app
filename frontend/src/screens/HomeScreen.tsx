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
import useGetUserId from "@/hooks/useGetUserId";

export default function HomeScreen() {
  const userId = useGetUserId();
  return (
    <View>
      <Text>Movie & {userId}</Text>
    </View>
  );
}
