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
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
  ArrowLeftIcon,
  ChevronLeftIcon,
  UserCircleIcon,
} from "react-native-heroicons/outline";
import { HeartIcon, PlayIcon, PlusIcon } from "react-native-heroicons/solid";
import { StatusBar } from "expo-status-bar";
import { Video } from "expo-av";
import useGetUser from "@/hooks/useGetUser";
import { AuthState } from "@/features/auth/authSlice";
import { useQuery } from "@apollo/client";
import GET_USER from "@/utils/apollo/queries/GET_USER";
import ToggleLoading from "@/components/toggleLoading";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { regOpenModal, sigOpenModal } from "@/features/modal/modalSlice";
import { MOVIE_DATA } from "@/shared/movies.js";
import MovieList from "@/components/movieList/MovieList";

const ios = Platform.OS == "ios";
const topMargin = ios ? "" : " mt-3";
var { width, height } = Dimensions.get("window");

export default function HomeScreen() {
  const video = React.useRef(null);
  const dispatch = useDispatch();
  const { credentials } = useSelector(
    (state: { auth: AuthState }) => state.auth
  );
  const userId = credentials?.user?._id;

  const { regModalOpen, sigModalOpen }: any = useSelector<RootState>(
    (state) => state.modal
  );
  const navigation = useNavigation();
  const {
    loading,
    error,
    data: userData,
  } = useQuery(GET_USER, {
    variables: { userId },
  });

  //console.log(error);

  useEffect(() => {
    // Load video when component mounts
    (async () => {
      if (video.current) {
        await video.current.loadAsync(
          {
            uri: "https://packaged-media.redd.it/0cv71vpc9nia1/pb/m2-res_1080p.mp4?m=DASHPlaylist.mpd&v=1&e=1703138400&s=6d853accf6f5111ef28f97ac96c8bd9a1fec93e1#t=0",
          },
          {},
          false
        );
      }
    })();
  }, []);

  if (loading) {
    return <ToggleLoading />;
  }

  // if (error) console.log(error);
  const user = userData?.getUser;
  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
        style={{ backgroundColor: "#171717" }}
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
            ref={video}
            rate={1.0}
            volume={1.0}
            isMuted={true}
            resizeMode="cover"
            shouldPlay
            isLooping
            style={styles.backgroundVideo}
            style={{ width, height: height * 0.715 }}
          />
          <LinearGradient
            colors={[
              "transparent",
              "rgba(23, 23, 23, 0.8)",
              "rgba(23, 23, 23, 1)",
            ]}
            style={{ width, height: height * 0.25 }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className="absolute bottom-0 z-1"
          />
          <View className="absolute w-full">
            <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
              <StatusBar style="light" />
              <View
                className="flex-row justify-between items-center  "
                style={{ marginHorizontal: 16, marginTop: 12 }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("Search")}
                  style={styles.searchIcon}
                >
                  <MagnifyingGlassIcon
                    size="22"
                    strokeWidth={2}
                    color="white"
                  />
                </TouchableOpacity>
                <View style={{ zIndex: 99 }}>
                  {user ? (
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Profile")}
                    >
                      <Image
                        source={require("../../assets/images/profile.jpg")}
                        className="rounded-s"
                        style={styles.iconImg}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.watchBtn}
                      onPress={() => {
                        dispatch(sigOpenModal());
                      }}
                    >
                      <Text style={styles.btnText}>Sign In</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </SafeAreaView>
          </View>
          <View
            style={styles.homeMid}
            className="absolute z-20 text-center w-full h-full flex-1 justify-center align-center items-center px-5 "
          >
            <Text style={styles.homeTitle}>Blade Runner 2049</Text>
            <View className="flex-row gap-3 ">
              <TouchableOpacity
                className="flex-row"
                style={[styles.homePlay, styles.homeBtn]}
                onPress={() => navigation.navigate("MovieScreen")}
              >
                <PlayIcon size="15" color="white" strokeWidth={2} />
                <Text style={styles.homeBtnText}>Play Now</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-row"
                style={[styles.homeWatch, styles.homeBtn]}
              >
                <PlusIcon
                  size="15"
                  color="white"
                  strokeWidth={2}
                  strokeWidth={3}
                />
                <Text style={styles.homeBtnText}>Add to List</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <MovieList title="Top Movies" />
        {/* <View className="pb-12 space-y-4" style={{ marginTop: -4 }}>
          <View className="mx-4 flex-row justify-between items-center">
            <Text className="text-white text-xl font-bold">Top Movies</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 15 }}
          >
            {MOVIE_DATA.map((movie, i) => (
              <TouchableWithoutFeedback
                key={i}
                onPress={() => navigation.navigate("MovieScreen")}
              >
                <View className="space-y-2 mr-4">
                  <Image
                    source={require("../../assets/images/moviePoster2.png")}
                    className="rounded-xl"
                    style={{ width: width * 0.38, height: height * 0.25 }}
                  />
                  <Text className="text-neutral-300 ml-1">
                    {movie.movieTitle}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </ScrollView>
        </View> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  iconImg: {
    width: width * 0.11,
    height: width * 0.11,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "white",
  },
  searchIcon: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    width: width * 0.11,
    height: width * 0.11,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  btnText: {
    fontSize: 13,
    fontWeight: "500",
    color: "white",
    textAlign: "center",
  },
  watchBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.25,
    height: width * 0.11,
    marginTop: 10,
    borderRadius: 30,
    backgroundColor: "#197AEC",
  },
  homeTitle: {
    color: "white",
    fontSize: 38,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },
  homeBtn: {
    width: width * 0.35,
    height: height * 0.05,
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
    fontSize: 16,
    color: "white",
    marginLeft: 4,
  },
  homeMid: {
    marginTop: height * 0.07,
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
