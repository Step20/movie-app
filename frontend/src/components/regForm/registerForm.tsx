import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
  forwardRef,
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
import google from "../../../assets/images/google_icon.png";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/solid";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { registerSuccess } from "../../features/auth/authSlice";
import { toggleLoading } from "../../features/loading/loadingSlice";
import Credentials from "../../../types/Credentials";
import REGISTER_MUTATION from "../../utils/apollo/mutations/REGISTER_MUTATION";
import validateRegistration from "@/utils/validation/registration";
import RegistrationCredentials from "../../../types/RegistrationCredentials";
import Loading from "../loading";
import ToggleLoading from "@/components/toggleLoading";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { regOpenModal, sigOpenModal } from "@/features/modal/modalSlice";
import { Portal } from "react-native-portalize";
import { GestureHandlerRootView } from "react-native-gesture-handler";

type ContextValues = {
  setCredentials: React.Dispatch<Credentials>;
};

const ios = Platform.OS == "ios";
const bottomMargin = ios ? "mb-5" : "";
var { width, height } = Dimensions.get("window");

export type Ref = BottomSheetModal;

const RegisterForm = forwardRef<Ref>((props, ref) => {
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

  const dispatch = useDispatch();

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [register, { data, loading, error }] = useMutation(REGISTER_MUTATION);

  const regSnapPoints = ios
    ? useMemo(() => ["25%", "72%"], [])
    : useMemo(() => ["25%", "92%"], []);

  useEffect(() => {
    if (data) {
      const credentials = data.register;
      const { success, formError } = data.register;
      if (credentials) dispatch(registerSuccess(credentials));

      if (success) {
        navigation.navigate("TabScreen");
      }
      if (formError) {
        setErrors([formError]);
      }
    }
  }, [data]);

  const handleSubmit = async () => {
    const credentials: RegistrationCredentials = {
      email,
      password,
      confirmPassword,
      userLocation,
      name,
    };

    const validation = await validateRegistration(credentials);
    if (validation.isError) {
      setErrors(validation.errors);
      return;
    }

    const variables = {
      data: credentials,
    };
    register({ variables });
  };

  if (loading) {
    return <ToggleLoading />;
  }

  // const { regModalOpen, sigModalOpen }: any = useSelector<RootState>(
  //   (state) => state.modal
  // );

  // React.useEffect(() => {
  //   if (regModalOpen) {
  //     ref.current?.present();
  //   }
  //   if (!regModalOpen) {
  //     ref.current?.dismiss();
  //   }
  // }, [regModalOpen, sigModalOpen]);

  return (
    <BottomSheetModal
      backgroundStyle={{
        backgroundColor: "#3E3E3E",
      }}
      ref={ref}
      index={1}
      snapPoints={regSnapPoints}
      style={styles.signUpModal}
      backdropComponent={({ style }) => (
        <View style={[style, { backgroundColor: "rgba(0, 0, 0, 0.7)" }]} />
      )}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.modalTitle}>Create account!</Text>
        <Text style={styles.modalText}>Enter your credentials to continue</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="lightgrey"
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.inputPas}
          placeholderTextColor="lightgrey"
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.inputPas}
          placeholderTextColor="lightgrey"
          placeholder="Location"
          value={userLocation}
          onChangeText={(text) => setUserLocation(text)}
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
        <View style={styles.inputPas}>
          <TextInput
            style={styles.inputText}
            placeholderTextColor="lightgrey"
            placeholder="Confirm password"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            secureTextEntry={lock}
          />
        </View>
        <Text style={styles.error}>{errors}</Text>
        <TouchableOpacity
          style={styles.signInBtn}
          onPress={handleSubmit}
          submitName="Login"
          errors={errors}
        >
          <Text style={styles.btnText}>Register </Text>
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
          {/* <Image source={google} style={styles.googleIcon} /> */}
          <Text style={styles.btnGoogleText}>Continue with Google</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetModal>
  );
});
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "black",
    zIndex: 99,
    position: "absolute",
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
    height: 35,
    width: 35,
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
    height: 50,
    margin: 25,
    marginTop: 1,
    borderRadius: 25,
    backgroundColor: "#197AEC",
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    fontSize: 17,
    fontWeight: "500",
    color: "white",
    textAlign: "center",
  },
  btnGoogleText: {
    fontSize: 17,
    fontWeight: "500",
    color: "black",
    textAlign: "center",
  },
});

export default RegisterForm;
