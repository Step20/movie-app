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
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { regOpenModal, sigOpenModal } from "@/features/modal/modalSlice";
import { useDispatch } from "react-redux";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import RegisterForm from "@/components/regForm/registerForm";
import { Portal } from "react-native-portalize";
import { useIsFocused } from "@react-navigation/native";

export default function NoProfile({
  error,
  text,
}: {
  error: any;
  text: String;
}) {
  const { regModalOpen, sigModalOpen }: any = useSelector<RootState>(
    (state) => state.modal
  );

  const dispatch = useDispatch();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const regBottomSheetModalRef = useRef<BottomSheetModal>(null);

  const isFocused = useIsFocused();

  return (
    <GestureHandlerRootView>
      <View
        style={{ backgroundColor: "#171717" }}
        className="h-full justify-center"
      >
        {/* <Text className="text-white text-center text-xs font-normal opacity-10">
          {error.message}
        </Text> */}
        <Text className="text-white text-center text-xs font-normal opacity-10">
          {text}
        </Text>
        <TouchableOpacity
          style={styles.watchBtn}
          className="mx-auto"
          onPress={() => dispatch(sigOpenModal())}
        >
          <Text style={styles.btnText}>Sign In</Text>
        </TouchableOpacity>
        <Text style={[styles.acc, { marginTop: 13 }]}>
          Don't have an account?{" "}
          <Text style={styles.link} onPress={() => dispatch(regOpenModal())}>
            Register
          </Text>
        </Text>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  btnText: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
    textAlign: "center",
  },
  watchBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: "65%",
    height: 50,
    marginTop: 10,
    borderRadius: 30,
    backgroundColor: "#197AEC",
  },
  acc: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
    fontWeight: "400",
  },
  link: { color: "#197AEC", fontWeight: "bold" },
});
