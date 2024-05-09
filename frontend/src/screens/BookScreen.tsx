import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ImageBackground,
  Animated,
  Pressable,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import useGetUser from "@/hooks/useGetUser";
import NoProfile from "../components/profile/noprofile";
import { AuthState } from "@/features/auth/authSlice";
import { useQuery } from "@apollo/client";
import GET_USER from "@/utils/apollo/queries/GET_USER";
import ToggleLoading from "@/components/toggleLoading";

export default function BookScreen() {
  const { credentials } = useSelector(
    (state: { auth: AuthState }) => state.auth
  );
  const userId = credentials?.user?._id;

  const {
    loading,
    error,
    data: userData,
  } = useQuery(GET_USER, {
    variables: { userId },
  });

  if (loading) {
    return <ToggleLoading />;
  }

  if (error)
    return <NoProfile error={error} text={"Sign in to view bookmarks"} />;

  const user = userData?.getUser;
  return (
    <View>
      {user ? (
        <View
          style={{ backgroundColor: "#171717" }}
          className="h-full justify-center"
        >
          <Text>Bookmark</Text>
        </View>
      ) : (
        <NoProfile error={error} text={"Sign in to view bookmarks"} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
