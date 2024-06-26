import React from "react";
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
  TextInput,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  BellIcon,
  HandThumbUpIcon,
  PlayIcon,
} from "react-native-heroicons/solid";
import { useNavigation, useRoute } from "@react-navigation/native";

const ios = Platform.OS == "ios";
const topMargin = ios ? "" : " mt-3";
var { width, height } = Dimensions.get("window");

export default function BookBox({ bookmarkedMovieList = [] }) {
  const navigation = useNavigation();

  return (
    <ScrollView>
      {bookmarkedMovieList.length > 0 ? (
        bookmarkedMovieList.map((movie, index) => (
          <View
            key={index}
            style={{
              borderColor: "rgba(255, 255, 255, .25)",
              borderWidth: 1,
              borderRadius: 15,
            }}
          >
            <ImageBackground
              source={require("../../../../assets/images/moviePoster2.png")}
              imageStyle={{ borderRadius: 15 }}
              style={{
                width: width * 0.9,
                height: height * 0.13,
                borderRadius: 15,

                overflow: "hidden",
              }}
            >
              <LinearGradient
                colors={[
                  "transparent",
                  "rgba(23, 23, 23, 0.8)",
                  "rgba(23, 23, 23, .9)",
                ]}
                style={styles.linearGradient}
                start={{ x: 0.1, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View className=" bottom-0 flex-row items-center  mt-6">
                  <View className="justify-around flex-1 mx-4 align-middle">
                    <Text className="text-white font-bold text-xl items-center ">
                      {movie.movieTitle}
                    </Text>
                    <View style={styles.movieUnderGroup}>
                      <Text
                        className="text-xs "
                        style={{ color: "rgba(255, 255, 255, 0.7)" }}
                      >
                        {movie.genre} • {movie.runTime}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row m-2 mx-2 pt-3 ">
                    <TouchableOpacity
                      className="flex-row"
                      style={[styles.homePlay, styles.homeBtn]}
                      onPress={() => navigation.push("Movie")}
                    >
                      <PlayIcon size="12" color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity
                      className="flex-row"
                      style={[styles.homeWatch, styles.homeBtn]}
                    >
                      <Text style={styles.homeBtnText}>Details</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </LinearGradient>
            </ImageBackground>
          </View>
        ))
      ) : (
        <View className="align-middle items-center my-auto">
          <Text className="text-white ">No bookmarked movies available.</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    width: "100%",
    height: "100%",
  },
  input: {
    height: 40,
    backgroundColor: "#2A2A2A",
    width: "85%",
  },
  iconImg: {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "white",
  },
  profileDesc: {
    opacity: 0.4,
    fontSize: 12,
  },
  profileRow: {
    alignItems: "center",
  },
  backIcon: {
    backgroundColor: "#197AEC",
  },
  ellipsisIcon: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    transform: [{ rotate: "90deg" }],
  },
  topIcons: {
    width: width * 0.09,
    height: width * 0.09,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  bottomIcons: {
    width: width * 0.18,
    height: width * 0.18,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 31,
    borderRadius: 100,
    backgroundColor: "#2A2A2A",
  },
  addIcon: {},
  bottomIconsRow: {
    marginTop: ios ? height * -0.105 : height * -0.085,
  },
  bottomProlog: {
    marginTop: height * 0.023,
    paddingHorizontal: 30,
  },
  bottomProfile: {
    marginTop: height * 0.021,
    paddingHorizontal: 30,
  },
  bottomMore: {
    marginTop: height * 0.025,
    //paddingHorizontal: 22
  },
  featuredGroup: {},
  prologText: {
    color: "white",
    marginBottom: 7,
    fontSize: 13,
  },
  castText: {
    color: "white",
    fontSize: 11,
    fontWeight: "700",
    opacity: 0.3,
    lineHeight: 15.5,
  },
  homeTitle: {
    color: "white",
    fontSize: 38,
    fontWeight: "600",
    textAlign: "center",
  },
  homeBtn: {
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    margin: 10,
  },
  homePlay: {
    width: width * 0.08,
    height: width * 0.08,
    backgroundColor: "#197AEC",
    marginRight: -2,
  },
  homeWatch: {
    width: width * 0.2,
    height: width * 0.08,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  homeBtnText: {
    fontSize: 13,
    color: "white",
    marginLeft: 4,
  },
  homeMid: {
    marginTop: height * 0.115,
  },
  backgroundVideo: {
    height: height,
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "stretch",
    bottom: 0,
    right: 0,
  },
});
