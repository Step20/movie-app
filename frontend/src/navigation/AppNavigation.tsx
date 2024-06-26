import React from "react";
import { View, Image, Text, StyleSheet, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartScreen from "../screens/StartScreen";
import HomeScreen from "../screens/HomeScreen";
import BookScreen from "../screens/BookScreen";
import MovieScreen from "../screens/MovieScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { BlurView } from "expo-blur";
// import { BlurView } from "@react-native-community/blur";

import { BackdropBlur, Fill, Canvas } from "@shopify/react-native-skia";
import { Host } from "react-native-portalize";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const ios = Platform.OS == "ios";

function TabScreen() {
  const { dismissAll: dismissAllModals } = useBottomSheetModal();
  return (
    <Tab.Navigator
      initialRouteName="TabScreen"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
            color = focused ? "white" : "#989497";
          } else if (route.name === "Bookmark") {
            iconName = focused ? "bookmark" : "bookmark-outline";
            color = focused ? "white" : "#989497";
          } else if (route.name === "Profile") {
            iconName = focused ? "account" : "account-outline";
            color = focused ? "white" : "#989497";
          }

          // You can return any component that you like here!
          return (
            <MaterialCommunityIcons name={iconName} color={color} size={32} />
          );
        },

        headerShown: false,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#989497",
        //Tab bar styles can be added here
        tabBarBackground: () => (
          <BlurView
            tint="dark"
            intensity={35}
            // style={styles.blurView}
            style={{
              ...StyleSheet.absoluteFillObject,
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
              overflow: "hidden",
              backgroundColor: ios
                ? "rgba(43, 43, 43, .65)"
                : "rgba(43, 43, 43, .85)",
            }}
          ></BlurView>
        ),
        tabBarStyle: {
          paddingVertical: 12,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: "absolute",
          zIndex: 1,
          height: ios ? 98 : 73,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          paddingBottom: ios ? 0 : 10,
          fontSize: 9,
          fontWeight: 500,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Bookmark" component={BookScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigation() {
  const { dismissAll } = useBottomSheetModal();

  return (
    <NavigationContainer>
      <Stack.Navigator onStateChange={dismissAll}>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Start"
          component={StartScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="TabScreen"
          component={TabScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="MovieScreen"
          component={MovieScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  //   container: {
  //     width: "100%",
  //     backgroundColor: 'rgba(0, 0, 0, 0.80)',
  //     height: 4.25 * rem,
  //     position: 'absolute',
  //     zIndex: 3,
  //     bottom: 0,
  //     flexDirection: 'row',
  //     justifyContent: 'space-between',
  //     paddingHorizontal: 2 * rem,
  //     paddingTop: 1.4 * rem,
  // },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  blurView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomTabBar: {
    backgroundColor: "transparent",
  },
});
