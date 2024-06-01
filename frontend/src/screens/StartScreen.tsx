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
  Platform,
  Dimensions,
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
import {
  useNavigation,
  useRoute,
  StackActions,
} from "@react-navigation/native";

import { useMutation } from "@apollo/client";
import LOGIN_MUTATION from "../utils/apollo/mutations/LOGIN_MUTATION";
import { useDispatch } from "react-redux";
import {
  loginSuccess,
  logoutSuccess,
  registerSuccess,
} from "../features/auth/authSlice";
import { toggleLoading } from "../features/loading/loadingSlice";
import { regOpenModal, sigOpenModal } from "../features/modal/modalSlice";
import validateLogin from "../utils/validation/login";
import Credentials from "../../../types/Credentials";
import RegisterForm from "../components/regForm/registerForm";
import ToggleLoading from "../components/toggleLoading";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import { Portal } from "react-native-portalize";

type ContextValues = {
  setCredentials: React.Dispatch<Credentials>;
};

const ios = Platform.OS == "ios";
const bottomMargin = ios ? "mb-5" : "";
var { width, height } = Dimensions.get("window");

export default function StartScreen() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const regBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = ios
    ? useMemo(() => ["66%"], [])
    : useMemo(() => ["74%"], []);
  const regSnapPoints = ios
    ? useMemo(() => ["25%", "72%"], [])
    : useMemo(() => ["25%", "92%"], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
    setEmail("");
    setPassword("");
  }, []);
  const regHandlePresentModalPress = useCallback(() => {
    setLock(true);
    regBottomSheetModalRef.current?.present();
  }, []);
  const { regModalOpen, sigModalOpen }: any = useSelector<RootState>(
    (state) => state.modal
  );
  const [index, setIndex] = useState();
  const handleSheetChanges = useCallback((index: number) => {
    // if (index == -1) {
    //   dispatch(openModal());
    // }

    setIndex(index);
    console.log("SS:", index);
  }, []);

  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [name, setName] = useState("");
  const [lock, setLock] = useState(true);
  type ErrorsType = { field: string; statement: string }[];
  const [errors, setErrors]: [ErrorsType, React.Dispatch<ErrorsType>] =
    useState<ErrorsType>([]);
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);
  const dispatch = useDispatch();
  const { dismiss, dismissAll } = useBottomSheetModal();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  useEffect(() => {
    if (data) {
      const credentials = data.login;
      const { success, formError } = data.login;
      if (success) {
        bottomSheetModalRef.current?.dismiss();
        navigation.navigate("TabScreen");
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
        setErrors(validation.errors);
        return;
      }
      const variables = { data: { email, password } };
      await login({ variables });
    } catch (err) {
      console.error(err);
    }
  };

  const handleWatch = async () => {
    navigation.navigate("TabScreen");
    dispatch(logoutSuccess());
  };

  useFocusEffect(
    React.useCallback(() => {
      return () => bottomSheetModalRef.current?.dismiss();
    }, [])
  );

  useEffect(() => {
    if (regModalOpen) {
      regBottomSheetModalRef.current?.present();
      dispatch(regOpenModal());
    }
    if (!regModalOpen) {
      regBottomSheetModalRef.current?.dismiss();
    }
    if (sigModalOpen) {
      bottomSheetModalRef.current?.present();
      dispatch(sigOpenModal());
    }
    if (!sigModalOpen) {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [regModalOpen, sigModalOpen]);

  if (loading) {
    return <ToggleLoading />;
  }
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.content} className={bottomMargin}>
          <Text style={styles.logo}> LOGO</Text>
          <Text style={styles.text}>
            It is a long established fact that an read able will be distracted.
          </Text>

          <TouchableOpacity onPress={handleWatch} style={styles.watchBtn}>
            <Text style={styles.btnText}>Watch Free Now</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => dispatch(sigOpenModal())}
            style={styles.signUpBtn}
          >
            <Text style={styles.btnText}>Sign In</Text>
          </TouchableOpacity>
          <Text style={styles.acc}>
            Don't have an account?{" "}
            <Text style={styles.link} onPress={() => dispatch(regOpenModal())}>
              Register
            </Text>
          </Text>
          <Text style={styles.under} className={bottomMargin}>
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
          name={"sign"}
          enableDismissOnClose={true}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          style={styles.signUpModal}
          backdropComponent={({ style }) => (
            <View style={[style, { backgroundColor: "rgba(0, 0, 0, 0.7)" }]} />
          )}
        >
          <View style={styles.contentContainer}>
            <Text style={styles.modalTitle}>Welcome back!</Text>
            <Text style={styles.modalText}>Enter your email and password</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor="lightgrey"
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
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
                  size="27"
                  strokeWidth={2}
                  color="white"
                  style={{ marginRight: 12 }}
                />
              ) : (
                <EyeIcon
                  onPress={() => setLock(true)}
                  size="27"
                  strokeWidth={2}
                  color="white"
                  style={{ marginRight: 12 }}
                />
              )}
            </View>
            {/* <View>
                  {errors.map((error, index) => (
                    <Text key={index} style={styles.error}>
                      {error.statement}
                    </Text>
                  ))}
                </View> */}
            <Text style={styles.error}>{errors}</Text>
            <TouchableOpacity
              style={styles.signInBtn}
              onPress={() => {
                dismissAll();
                setTimeout(() => {
                  handleSubmit();
                }, 300);

                // navigation.navigate("TabScreen");
              }}
              submitName="Login"
              errors={errors}
            >
              <Text style={styles.btnText}>Sign In </Text>
            </TouchableOpacity>
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontSize: 14,
                marginTop: -16,
              }}
            >
              or
            </Text>
            <TouchableOpacity style={styles.googleBtn}>
              <Text style={styles.btnGoogleText}>
                {/* <Image source={google} style={styles.googleIcon} /> */}
                <Text>Continue with Google</Text>
              </Text>
            </TouchableOpacity>
            <Text style={[styles.acc, { marginTop: -0 }]}>
              Don't have an account?{" "}
              <Text style={styles.link} onPress={regHandlePresentModalPress}>
                Register
              </Text>
            </Text>
            <Text style={styles.forgot}>Forgot your password?</Text>
          </View>
        </BottomSheetModal>

        <View>
          <RegisterForm ref={regBottomSheetModalRef} />
        </View>
      </ImageBackground>
    </View>
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
    marginTop: -6,
    marginBottom: 10,
    textAlign: "center",
    fontSize: 12,
  },
  input: {
    height: 49,
    marginTop: 18,
    marginVertical: 15,
    marginHorizontal: 25,
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
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  inputPas: {
    justifyContent: "space-between",
    height: 49,
    marginVertical: 15,
    marginHorizontal: 25,
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
    height: 30,
    width: 30,
  },
  btnGoogleText: {
    fontSize: 17,
    fontWeight: "500",
    color: "black",
    textAlign: "center",
  },
  viewGoogle: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  googleBtn: {
    paddingTop: 0,
    height: 50,
    margin: 25,
    marginTop: 10,
    borderRadius: 25,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  modalTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center",
    marginTop: 20,
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
    marginTop: 40,
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
    width: 320,
    marginTop: 18,
    color: "white",
    opacity: 0.4,
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
  btnText: {
    fontSize: 17,
    fontWeight: "500",
    color: "white",
    textAlign: "center",
  },
  signUpBtn: {
    width: "110%",
    alignItems: "center",
    justifyContent: "center",
    height: 55,
    borderRadius: 30,
    backgroundColor: "#2C2C2C",
  },
  watchBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: "110%",
    height: 55,
    margin: 9,
    marginTop: 25,
    borderRadius: 30,
    backgroundColor: "#197AEC",
  },
  signInBtn: {
    height: 50,
    margin: 25,
    marginTop: 1,
    borderRadius: 25,
    backgroundColor: "#197AEC",
    alignItems: "center",
    justifyContent: "center",
  },
});
