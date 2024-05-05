import React, { useState, useEffect } from "react";
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
import useGetUser from "@/hooks/useGetUser";
import ProfileDisplay from "../components/profile/acc";
import NoProfile from "../components/profile/noprofile";
import { useSelector } from "react-redux";
import { AuthState } from "@/features/auth/authSlice";
import { useQuery } from "@apollo/client";
import GET_USER from "@/utils/apollo/queries/GET_USER";
import Loading from "@/components/loading";
import ToggleLoading from "@/components/toggleLoading";

export default function ProfileScreen() {
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

  if (error) return <Text>Error: {error.message}</Text>;

  const user = userData?.getUser;

  return <View>{user ? <ProfileDisplay user={user} /> : <NoProfile />}</View>;
}
