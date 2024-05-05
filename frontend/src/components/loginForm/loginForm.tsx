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
import google from "../../../assets/images/google_icon.png";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/solid";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import {
  loginSuccess,
  logoutSuccess,
  registerSuccess,
} from "../../features/auth/authSlice";
import validateLogin from "../../utils/validation/login";
import { toggleLoading } from "../../features/loading/loadingSlice";
import Credentials from "../../../types/Credentials";
import LOGIN_MUTATION from "../../utils/apollo/mutations/LOGIN_MUTATION";
import Loading from "../loading";
import HandleLoading from "../handleLoading";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

type ContextValues = {
  setCredentials: React.Dispatch<Credentials>;
};

export default function LoginForm() {
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
  const { allLoading }: any = useSelector<RootState>((state) => state.loading);

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

  if (loading) {
    return <Loading />;
  }
  return (
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
        <Image source={google} style={styles.googleIcon} /> Continue with Google
      </Text>
      <Text style={[styles.acc, { marginTop: -0 }]}>
        Don't have an account?{" "}
        <Text style={styles.link} onPress={regHandlePresentModalPress}>
          Register
        </Text>
      </Text>
      <Text style={styles.forgot}>Forgot your password?</Text>
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
    marginTop: 10,
    marginBottom: -20,
    textAlign: "center",
  },
  input: {
    paddingVertical: 11,
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
    paddingVertical: 11,
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
