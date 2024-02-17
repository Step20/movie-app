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
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import image from "../../assets/images/start.png";
import google from "../../assets/images/google_icon.png";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/solid";
import { FloatingTitleTextInputField } from "../components/input/FloatingTitleTextInputField";
import { useNavigation, useRoute } from "@react-navigation/native";

import { useMutation } from "@apollo/client";
import LOGIN_MUTATION from "../utils/apollo/mutations/LOGIN_MUTATION";
import { useDispatch } from "react-redux";
import { loginSuccess, logoutSuccess } from "../features/auth/authSlice";
import validateLogin from "../utils/validation/login";
import Credentials from "../../../types/Credentials";

type ContextValues = {
  setCredentials: React.Dispatch<Credentials>;
  setSpinner: React.Dispatch<boolean>;
};

export default function StartScreen() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const regBottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ["25%", "76%"], []);
  const regSnapPoints = useMemo(() => ["25%", "87%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
    setEmail("");
    setPassword("");
  }, []);
  const regHandlePresentModalPress = useCallback(() => {
    regBottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [lock, setLock] = useState(true);
  const [password, setPassword] = useState("");
  type ErrorsType = { field: string; statement: string }[];
  const [errors, setErrors]: [ErrorsType, React.Dispatch<ErrorsType>] =
    useState<ErrorsType>([]);
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      const credentials = data.login;
      const { success, formError } = data.login;
      if (success) {
        navigation.push("Home");
        setEmail("");
        setPassword("");
      }
      if (credentials) dispatch(loginSuccess(credentials));
      if (formError) {
        setErrors([formError]);
      }
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      return data;
    }
  }, [error]);

  const handleSubmit = async () => {
    try {
      const validation = await validateLogin({ email, password });
      if (validation.isError) {
        setErrors(
          validation.errors.map((error: string) => {
            console.log(error);
            return { field: error.split(" ")[0], statement: error };
          })
        );
        return;
      }
      const variables = { data: { email, password } };
      await login({ variables });
    } catch (err) {
      console.error(err);
    }
  };

  const handleWatch = async () => {
    navigation.push("Home");
    dispatch(logoutSuccess());
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <View style={styles.container}>
          <ImageBackground
            source={image}
            resizeMode="cover"
            style={styles.image}
          >
            <View style={styles.content}>
              <Text style={styles.logo}> LOGO</Text>
              <Text style={styles.text}>
                It is a long established fact that an read able will be
                distracted.
              </Text>

              <Text onPress={handleWatch} style={styles.watchBtn}>
                Watch Free Now
              </Text>

              <Text onPress={handlePresentModalPress} style={styles.signUpBtn}>
                Sign In
              </Text>
              <Text style={styles.acc}>
                Don't have an account?{" "}
                <Text style={styles.link} onPress={regHandlePresentModalPress}>
                  Register
                </Text>
              </Text>
              <Text style={styles.under}>
                By creating an account or signing in, you agree to our
                <Text style={styles.bold}> Terms of Service</Text> and
                <Text style={styles.bold}> Privacy Policy</Text>
              </Text>
            </View>
            <BottomSheetModal
              ref={bottomSheetModalRef}
              backgroundStyle={{
                backgroundColor: "#3E3E3E",
              }}
              index={1}
              snapPoints={snapPoints}
              onChange={handleSheetChanges}
              style={styles.signUpModal}
              backdropComponent={({ style }) => (
                <View
                  style={[style, { backgroundColor: "rgba(0, 0, 0, 0.7)" }]}
                />
              )}
            >
              <View style={styles.contentContainer}>
                <Text style={styles.modalTitle}>Welcome back!</Text>
                <Text style={styles.modalText}>
                  Enter your email and password
                </Text>
                <TextInput
                  style={styles.input}
                  placeholderTextColor="lightgrey"
                  placeholder="Email"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
                {/* <TextInput
                  style={styles.inputPas}
                  placeholderTextColor="lightgrey"
                  placeholder="Password"
                /> */}
                <View style={styles.inputPas}>
                  <TextInput
                    style={styles.inputText}
                    placeholderTextColor="lightgrey"
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={lock}
                  />
                  {lock ? (
                    <EyeSlashIcon
                      onPress={() => setLock(false)}
                      size="28"
                      strokeWidth={2}
                      color="white"
                      style={{ marginRight: 12 }}
                    />
                  ) : (
                    <EyeIcon
                      onPress={() => setLock(true)}
                      size="28"
                      strokeWidth={2}
                      color="white"
                      style={{ marginRight: 12 }}
                    />
                  )}
                </View>
                {error && <Text style={styles.error}>{error.message}</Text>}
                <Text
                  style={styles.signInBtn}
                  onPress={handleSubmit}
                  submitName="Login"
                  errors={errors}
                >
                  Sign In
                </Text>
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontSize: 20,
                    marginTop: -15,
                  }}
                >
                  or
                </Text>
                <Text style={styles.googleBtn}>
                  <Image source={google} style={styles.googleIcon} /> Continue
                  with Google
                </Text>
                <Text style={[styles.acc, { marginTop: -0 }]}>
                  Don't have an account?{" "}
                  <Text
                    style={styles.link}
                    onPress={regHandlePresentModalPress}
                  >
                    Register
                  </Text>
                </Text>
                <Text style={styles.forgot}>Forgot your password?</Text>
              </View>
            </BottomSheetModal>

            <BottomSheetModal
              ref={regBottomSheetModalRef}
              backgroundStyle={{
                backgroundColor: "#3E3E3E",
              }}
              index={1}
              snapPoints={regSnapPoints}
              onChange={handleSheetChanges}
              style={styles.signUpModal}
              backdropComponent={({ style }) => (
                <View
                  style={[style, { backgroundColor: "rgba(0, 0, 0, 0.7)" }]}
                />
              )}
            >
              <View style={styles.contentContainer}>
                <Text style={styles.modalTitle}>Create account!</Text>
                <Text style={styles.modalText}>
                  Enter your credentials to continue
                </Text>
                <TextInput
                  style={styles.input}
                  placeholderTextColor="lightgrey"
                  placeholder="Name"
                />
                {/* <TextInput
                  style={styles.inputPas}
                  placeholderTextColor="lightgrey"
                  placeholder="Password"
                /> */}
                <TextInput
                  style={styles.inputPas}
                  placeholderTextColor="lightgrey"
                  placeholder="Email"
                />
                <TextInput
                  style={styles.inputPas}
                  placeholderTextColor="lightgrey"
                  placeholder="Location"
                />
                <View style={styles.inputPas}>
                  <TextInput
                    style={styles.inputText}
                    placeholderTextColor="lightgrey"
                    placeholder="Password"
                  />
                  <EyeIcon
                    size="28"
                    strokeWidth={2}
                    color="white"
                    style={{ marginRight: 12 }}
                  />
                </View>
                <Text style={styles.signInBtn}>Sign In</Text>
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontSize: 20,
                    marginTop: -15,
                  }}
                >
                  or
                </Text>
                <Text style={styles.googleBtn}>
                  <Image source={google} style={styles.googleIcon} /> Continue
                  with Google
                </Text>
              </View>
            </BottomSheetModal>
          </ImageBackground>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "black",
  },
  error: {
    color: "red",
    marginTop: 10,
    marginBottom: -20,
    textAlign: "center",
  },
  input: {
    paddingVertical: 13.5,
    margin: 25,
    marginTop: 25,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 23,
    borderRadius: 25,
    borderColor: "grey",
    color: "white",
  },
  inputText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  inputPas: {
    justifyContent: "space-between",
    paddingVertical: 13.5,
    margin: 25,
    marginTop: 0,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 23,
    borderRadius: 25,
    borderColor: "grey",
    flexDirection: "row",
    color: "white",
  },
  passwordContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#000",
    paddingBottom: 10,
  },
  inputStyle: {
    flex: 1,
  },
  googleIcon: {
    height: 35,
    width: 35,
  },
  googleBtn: {
    fontSize: 20,
    fontWeight: "500",
    color: "black",
    textAlign: "center",
    paddingTop: 0,
    paddingBottom: 15,
    margin: 25,
    marginTop: 15,
    borderRadius: 25,
    backgroundColor: "white",
  },
  modalTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center",
    marginTop: 15,
  },
  modalText: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
    marginTop: 5,
    opacity: 0.5,
  },

  logo: {
    color: "white",
    fontWeight: "bold",
    fontSize: 40,
    textAlign: "center",
  },
  acc: {
    marginTop: 15,
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "400",
  },
  link: { color: "#197AEC", fontWeight: "bold" },
  forgot: {
    marginTop: 15,
    color: "#197AEC",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  under: {
    marginTop: 32,
    color: "white",
    fontWeight: "400",
    textAlign: "center",
    fontSize: 13,
    lineHeight: 25,
  },
  bold: {
    fontWeight: "bold",
  },
  text: {
    width: 300,
    marginTop: 18,
    color: "white",
    opacity: 0.3,
    fontSize: 19,
    textAlign: "center",
    lineHeight: 30,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    position: "absolute",
    bottom: 20,
  },
  contentContainer: {
    flex: 1,
  },
  signUpBtn: {
    fontSize: 20,
    width: "110%",
    fontWeight: "500",
    color: "white",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 11,
    borderRadius: 25,
    backgroundColor: "#2C2C2C",
  },
  watchBtn: {
    width: "110%",
    fontSize: 20,
    fontWeight: "500",
    color: "white",
    textAlign: "center",
    paddingVertical: 11,
    margin: 9,
    marginTop: 25,
    borderRadius: 25,
    backgroundColor: "#197AEC",
  },
  signInBtn: {
    fontSize: 20,
    fontWeight: "500",
    color: "white",
    textAlign: "center",
    paddingVertical: 13.5,
    margin: 25,
    marginTop: 1,
    borderRadius: 25,
    backgroundColor: "#197AEC",
  },
});
