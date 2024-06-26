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
import { MOVIE_DATA } from "@/shared/movies.js";

const ios = Platform.OS == "ios";
const topMargin = ios ? "" : " mt-3";
var { width, height } = Dimensions.get("window");

export default function MovieList({ title }) {
  const navigation = useNavigation();

  return (
    <View>
      <View className="pb-12 space-y-4" style={{ marginTop: -10 }}>
        <View className="mx-4 flex-row justify-between items-center">
          <Text className="text-white text-xl font-bold">{title}</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
        >
          {MOVIE_DATA.map((movie, i) => (
            <TouchableWithoutFeedback
              key={i}
              onPress={() =>
                navigation.navigate("MovieScreen", { movie: movie })
              }
            >
              <View className="space-y-1 mr-2">
                <Image
                  source={require("../../../assets/images/moviePoster2.png")}
                  className="rounded-xl"
                  style={{ width: width * 0.36, height: height * 0.25 }}
                />
                <Text className="text-neutral-300 ml-1">
                  {movie.movieTitle}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
