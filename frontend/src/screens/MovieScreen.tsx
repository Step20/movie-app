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
  HandThumbUpIcon,
} from "react-native-heroicons/outline";
import {
  HeartIcon,
  PlayIcon,
  CheckIcon,
  HandThumbUpIcon as SolidThumbUp,
} from "react-native-heroicons/solid";
import { StatusBar } from "expo-status-bar";
import { Video } from "expo-av";
import BackBtn from "@/components/buttons/backBtn/index.tsx";
import { BlurView } from "expo-blur";
import { useSelector, useDispatch } from "react-redux";
import { addBookmark, removeBookmark } from "@/features/book/bookSlice";

const ios = Platform.OS == "ios";
const topMargin = ios ? "" : " mt-3";
var { width, height } = Dimensions.get("window");

export default function MovieScreen({ route }) {
  const navigation = useNavigation();
  const { movie } = route.params;

  const dispatch = useDispatch();

  const bookmarkList = useSelector((state) => state.book.bookmarkList);
  const isBookmarked = bookmarkList?.includes(movie._id);

  const handleBookmark = () => {
    if (isBookmarked) {
      dispatch(removeBookmark(movie._id));
    } else {
      dispatch(addBookmark(movie._id));
    }
  };

  const renderCast = () => {
    return movie.cast.map((group, index) => (
      <View key={index}>
        <Text>{group.groupTitle}:</Text>
        {group.members.map((member, memberIndex) => (
          <Text key={memberIndex}>
            {member.name} - {member.title || member.role}
          </Text>
        ))}
      </View>
    ));
  };

  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
        style={{ backgroundColor: "#171717" }}
        className="h-full"
      >
        <View>
          {/* <Image
              source={require("../../assets/images/moviePoster2.png")}
              style={{ width, height: height * 0.75 }}
            /> */}
          <Video
            source={{
              uri: "https://packaged-media.redd.it/0cv71vpc9nia1/pb/m2-res_1080p.mp4?m=DASHPlaylist.mpd&v=1&e=1703138400&s=6d853accf6f5111ef28f97ac96c8bd9a1fec93e1#t=0",
            }}
            rate={1.0}
            volume={1.0}
            isMuted={true}
            resizeMode="cover"
            shouldPlay
            isLooping
            style={styles.backgroundVideo}
            style={{ width, height: height * 0.78 }}
          />
          <LinearGradient
            colors={[
              "transparent",
              "rgba(23, 23, 23, 0.9)",
              "rgba(23, 23, 23, 1)",
            ]}
            style={{ width, height: height * 0.45 }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className="absolute bottom-0 "
          />
          <View className="absolute w-full">
            <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
              <StatusBar style="light" />
              <View
                className="flex-row justify-between items-center"
                style={{ marginHorizontal: 16, marginTop: 12 }}
              >
                <BackBtn />
                <TouchableOpacity
                  style={[styles.ellipsisIcon, styles.topIcons]}
                >
                  <EllipsisVerticalIcon
                    size="22"
                    strokeWidth={2}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </View>
          <View
            style={styles.homeMid}
            className="absolute z-20 text-center w-full h-full flex-1 justify-center align-center items-center px-5 "
          >
            <Text style={styles.homeTitle}>{movie.movieTitle}</Text>
            <View style={styles.movieUnderGroup}>
              <Text
                className="text-sm"
                style={{ color: "rgba(255, 255, 255, 0.7)" }}
              >
                {movie.yearMade} • {movie.genre} • {movie.runTime} •{" "}
                {movie.maturityRating}
              </Text>
            </View>
            <View className=" mb-5 mt-1 mx-auto flex-row space-x-1">
              <View className="">
                <BlurView
                  tint="dark"
                  intensity={15}
                  // style={styles.blurView}
                  style={{
                    paddingHorizontal: 7,
                    paddingVertical: 5,
                    borderRadius: 6,
                    backgroundColor: ios
                      ? "rgba(54, 54, 54, .65)"
                      : "rgba(64, 64, 64, .65)",
                  }}
                >
                  <Text style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                    <SolidThumbUp size="11" strokeWidth={2} color="#83FE60" />
                    <Text
                      style={{
                        color: "#83FE60",
                        fontSize: 10,
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      {movie.likes} Likes
                    </Text>
                  </Text>
                </BlurView>
              </View>
              <View className="  ">
                <BlurView
                  tint="dark"
                  intensity={15}
                  // style={styles.blurView}
                  className="mx-auto flex"
                  style={{
                    paddingHorizontal: 7,
                    paddingVertical: 5,
                    borderRadius: 6,
                    backgroundColor: ios
                      ? "rgba(54, 54, 54, .65)"
                      : "rgba(64, 64, 64, .65)",
                  }}
                >
                  <Text
                    className="text-white  mx-auto "
                    style={{ fontSize: 10 }}
                  >
                    4K
                  </Text>
                </BlurView>
              </View>
              <View className="  ">
                <BlurView
                  tint="dark"
                  intensity={15}
                  // style={styles.blurView}
                  className="mx-auto flex"
                  style={{
                    paddingHorizontal: 7,
                    paddingVertical: 5,
                    borderRadius: 6,
                    backgroundColor: ios
                      ? "rgba(54, 54, 54, .65)"
                      : "rgba(64, 64, 64, .65)",
                  }}
                >
                  <Text
                    className="text-white  mx-auto "
                    style={{ fontSize: 10 }}
                  >
                    HDR
                  </Text>
                </BlurView>
              </View>
            </View>
            {/* <View
                  className="text-white text-xs mx-auto flex"
                  style={{
                    backgroundColor: "rgba(64, 64, 64, .65)",
                    padding: 5,
                    borderRadius: 6,
                  }}
                >
                  <Text className="text-white text-xs mx-auto ">4K</Text>
                </View> */}

            <View className="flex-row">
              <TouchableOpacity
                className="flex-row"
                style={[styles.homePlay, styles.homeBtn]}
                onPress={() => handleBookmark()}
              >
                <PlayIcon size="22" color="white" />
                <Text style={styles.homeBtnText} className="font-medium">
                  Play Now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.bottomProlog} className=" flex-1 ">
          <Text style={styles.prologText} className="opacity-80">
            {movie.movieDescription}
          </Text>
          <View className="opacity-60 font-normal">
            <Text style={styles.castText}>
              Cast: Bradley Cooper, Carey Mulligan, Matt Boomer ... more
            </Text>
            {/* {renderCast()} */}
            <Text style={styles.castText}>Director: Bradley Cooper</Text>
          </View>
        </View>
        <View
          style={styles.bottomIconsRow}
          className="flex-row flex justify-center align-center items-center space-x-6 "
        >
          <View>
            {isBookmarked ? (
              <TouchableOpacity
                onPress={() => console.log("clicked")}
                style={[styles.addIcon, styles.bottomIcons]}
              >
                <CheckIcon size="25" strokeWidth={2} color="white" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  console.log("clicked");
                }}
                style={[styles.addIcon, styles.bottomIcons]}
              >
                <PlusIcon size="25" strokeWidth={2} color="white" />
              </TouchableOpacity>
            )}
            <Text
              className="text-center text-white mt-2"
              style={{ fontSize: 10 }}
            >
              {isBookmarked ? "Bookmarked" : "Add to List"}
            </Text>
          </View>
          <View>
            <TouchableOpacity style={[styles.likeIcon, styles.bottomIcons]}>
              <HandThumbUpIcon size="25" strokeWidth={2} color="white" />
            </TouchableOpacity>
            <Text
              className="text-center text-white  mt-2"
              style={{ fontSize: 10 }}
            >
              Like
            </Text>
          </View>
          <View>
            <TouchableOpacity style={[styles.shareIcon, styles.bottomIcons]}>
              <ShareIcon size="25" strokeWidth={2} color="white" />
            </TouchableOpacity>
            <Text
              className="text-center text-white  mt-2"
              style={{ fontSize: 10 }}
            >
              Recommend
            </Text>
          </View>
        </View>
        <View style={styles.bottomProfile} className=" flex-1 ">
          <Text className="text-white font-medium  text-sm mb-1">
            Created By
          </Text>
          <Pressable
            style={styles.profileRow}
            className="flex-row align-center"
            onPress={() => navigation.push("Profile")}
          >
            <Image
              source={require("../../assets/images/profile.jpg")}
              className="rounded-s"
              style={styles.iconImg}
            />
            <View className="ml-3 mt-2">
              <Text className="text-white font-medium text-sm ">
                Tyler Lockett
              </Text>
              <Text style={styles.profileDesc} className="text-white mb-3">
                It is a long established fact that a reader...
              </Text>
            </View>
          </Pressable>
        </View>
        <View style={styles.bottomMore} className=" flex-1 mb-3">
          <Text
            className="text-white font-bold text-base mb-3"
            style={{ paddingHorizontal: 30 }}
          >
            More Like This
          </Text>
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 30 }}
            >
              <TouchableWithoutFeedback>
                <View className="space-y-1 mr-3">
                  <Image
                    source={require("../../assets/images/moviePoster2.png")}
                    className="rounded-2xl"
                    style={{ width: width * 0.32, height: height * 0.21 }}
                  />
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <View className="space-y-1 mr-3">
                  <Image
                    source={require("../../assets/images/moviePoster2.png")}
                    className="rounded-2xl"
                    style={{ width: width * 0.32, height: height * 0.21 }}
                  />
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <View className="space-y-1 mr-3">
                  <Image
                    source={require("../../assets/images/moviePoster2.png")}
                    className="rounded-2xl"
                    style={{ width: width * 0.32, height: height * 0.21 }}
                  />
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <View className="space-y-1 mr-3">
                  <Image
                    source={require("../../assets/images/moviePoster2.png")}
                    className="rounded-2xl"
                    style={{ width: width * 0.32, height: height * 0.21 }}
                  />
                </View>
              </TouchableWithoutFeedback>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  iconImg: {
    width: width * 0.13,
    height: width * 0.13,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "white",
  },
  profileDesc: {
    opacity: 0.4,
    fontSize: 11,
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
    width: width * 0.11,
    height: width * 0.11,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  bottomIcons: {
    // width: width * 0.18,
    // height: width * 0.18,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 36,
    // borderRadius: 100,
    // backgroundColor: "#2A2A2A",
  },
  addIcon: {},
  bottomIconsRow: {
    marginTop: ios ? height * -0.105 : height * 0.024,
    marginBottom: 22,
  },
  bottomProlog: {
    marginTop: height * -0.1,
    paddingHorizontal: 25,
    lineHeight: 20,
  },
  bottomProfile: {
    marginTop: height * 0.021,
    paddingHorizontal: 30,
  },
  bottomMore: {
    marginTop: height * 0.025,
    //paddingHorizontal: 30
  },
  prologText: {
    color: "white",
    marginBottom: 7,
    fontSize: 13,
    lineHeight: 17,
  },
  castText: {
    color: "white",
    fontSize: 11,
    fontWeight: "400",
    opacity: 0.3,
    lineHeight: 15.5,
  },
  homeTitle: {
    color: "white",
    fontSize: 36,
    fontWeight: "600",
    textAlign: "center",
  },
  homeBtn: {
    width: width * 0.52,
    height: height * 0.06,
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  homePlay: {
    backgroundColor: "#197AEC",
  },
  homeWatch: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  homeBtnText: {
    fontSize: 17,
    color: "white",
    marginLeft: 4,
  },
  homeMid: {
    marginTop: height * 0.14,
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
