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
import {
  PlusIcon,
  ShareIcon,
  ChevronLeftIcon,
  EllipsisVerticalIcon,
} from "react-native-heroicons/outline";
import {
  HeartIcon,
  PlayIcon,
  HandThumbUpIcon,
} from "react-native-heroicons/solid";
import { StatusBar } from "expo-status-bar";
import { Video } from "expo-av";

import movie from "../../../../assets/images/moviePoster2.png";
import profile from "../../../../assets/images/profile.jpg";

const ios = Platform.OS == "ios";
const topMargin = ios ? "" : " mt-3";
var { width, height } = Dimensions.get("window");

type Props = {
  user: object;
};
export default function ProfileDisplay({ user }: Props) {
  const navigation = useNavigation();

  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
        style={{ backgroundColor: "#171717" }}
        className="h-full"
      >
        <View>
          <Image source={profile} style={{ width, height: height * 0.41 }} />

          <LinearGradient
            colors={[
              "transparent",
              "rgba(23, 23, 23, 0.6)",
              "rgba(23, 23, 23, 1)",
            ]}
            style={{ width, height: height * 0.3 }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className="absolute bottom-0 "
          />
          <View className="absolute w-full">
            <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
              <StatusBar style="light" />
              <View className="flex-row justify-between items-center mx-5 mt-2">
                <TouchableOpacity></TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.push("PSSetting")}
                  style={[styles.ellipsisIcon, styles.topIcons]}
                >
                  <EllipsisVerticalIcon
                    size="32"
                    strokeWidth={2}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </View>
          <View
            style={styles.homeMid}
            className="absolute z-20 w-full h-full flex-1 justify-center px-5 "
          >
            <Text className="text-5xl text-white font-bold">{user.name}</Text>
            <Text className="text-base text-white opacity-50 font-normal">
              {user.userBio} | {user.userLocation}
            </Text>
          </View>
        </View>

        {/* <View style={styles.featuredGroup}>
          <Text className="text-white font-bold text-lg mb-3">
            Featured Movie
          </Text>
          <View>
            <Image
              source={movie}
              className="rounded-2xl"
              style={{ width: width * 0.9, height: height * 0.13 }}
            />
            <View className="absolute bottom-0 flex-row items-center self-center">
              <View className="mr-1 mx-3">
                <Text className="text-white font-bold text-xl">Ex Machina</Text>
                <View style={styles.movieUnderGroup}>
                  <Text
                    className="text-xs"
                    style={{ color: "rgba(255, 255, 255, 0.7)" }}
                  >
                    Action • 2h 48m{" "}
                    <HandThumbUpIcon
                      size="13"
                      strokeWidth={2}
                      color="#83FE60"
                      className="align-middle"
                    />
                    <Text style={{ color: "#83FE60" }}> Most Liked</Text>
                  </Text>
                </View>
              </View>
              <View className="flex-row m-2 mx-1 pt-3">
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
          </View>
        </View>
        <View style={styles.bottomMore} className=" flex-1">
          <View className="justify-between flex-row">
            <Text
              className="text-white font-bold text-lg mb-3"
              style={{ paddingHorizontal: 22 }}
            >
              Movies & TV Shows
            </Text>
            <Text
              className=" font-bold text-lg mb-3"
              style={{ paddingHorizontal: 22, color: "#197AEC" }}
            >
              See All
            </Text>
          </View>

          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 22 }}
            >
              <TouchableWithoutFeedback>
                <View className="space-y-1 mr-3">
                  <Image
                    source={movie}
                    className="rounded-2xl"
                    style={{ width: width * 0.615, height: height * 0.19 }}
                  />
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <View className="space-y-1 mr-3">
                  <Image
                    source={movie}
                    className="rounded-2xl"
                    style={{ width: width * 0.615, height: height * 0.19 }}
                  />
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <View className="space-y-1 mr-3">
                  <Image
                    source={movie}
                    className="rounded-2xl"
                    style={{ width: width * 0.615, height: height * 0.19 }}
                  />
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <View className="space-y-1 mr-3">
                  <Image
                    source={movie}
                    className="rounded-2xl"
                    style={{ width: width * 0.615, height: height * 0.19 }}
                  />
                </View>
              </TouchableWithoutFeedback>
            </ScrollView>
          </View>
        </View>
        <View style={styles.bottomMore} className=" flex-1 mb-3">
          <Text
            className="text-white font-bold text-lg mb-3"
            style={{ paddingHorizontal: 22 }}
          >
            More Like Tyler Lockett
          </Text>
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 22 }}
            >
              <TouchableWithoutFeedback>
                <View className="space-y-1 mr-3">
                  <Image
                    source={movie}
                    className="rounded-2xl"
                    style={{ width: width * 0.32, height: height * 0.21 }}
                  />
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <View className="space-y-1 mr-3">
                  <Image
                    source={movie}
                    className="rounded-2xl"
                    style={{ width: width * 0.32, height: height * 0.21 }}
                  />
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <View className="space-y-1 mr-3">
                  <Image
                    source={movie}
                    className="rounded-2xl"
                    style={{ width: width * 0.32, height: height * 0.21 }}
                  />
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <View className="space-y-1 mr-3">
                  <Image
                    source={movie}
                    className="rounded-2xl"
                    style={{ width: width * 0.32, height: height * 0.21 }}
                  />
                </View>
              </TouchableWithoutFeedback>
            </ScrollView>
          </View>
        </View> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
    width: width * 0.1,
    height: width * 0.1,
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
  featuredGroup: {
    marginTop: height * 0.025,
    paddingHorizontal: 22,
  },
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
    marginTop: height * 0.13,
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
