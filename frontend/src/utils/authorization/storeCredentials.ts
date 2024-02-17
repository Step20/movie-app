import AsyncStorage from "@react-native-async-storage/async-storage";
import Credentials from "@/types/Credentials";

const storeCredentials = async (credentials: Credentials) => {
  try {
    const credentialsString = JSON.stringify(credentials);
    await AsyncStorage.setItem("movie_app_credentials", credentialsString);
  } catch (error) {
    console.error("Error storing credentials:", error);
  }
};

export default storeCredentials;
