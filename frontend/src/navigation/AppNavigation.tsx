import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartScreen from "../screens/StartScreen";
import HomeScreen from "../screens/HomeScreen";
import BookScreen from "../screens/BookScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { BlurView } from "expo-blur";
import { BackdropBlur, Fill, Canvas } from "@shopify/react-native-skia";
import { Host } from "react-native-portalize";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabScreen() {
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
            tint="systemThickMaterialDark"
            intensity={90}
            style={{
              ...StyleSheet.absoluteFillObject,
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
              overflow: "hidden",
              backgroundColor: "rgba(43, 43, 43, .95)",
            }}
          />
        ),
        tabBarStyle: {
          paddingVertical: 12,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: "absolute",
          zIndex: 1,
          height: 73,
        },
        tabBarLabelStyle: { paddingBottom: 10, fontSize: 9, fontWeight: 500 },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Bookmark" component={BookScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Host>
        <Stack.Navigator>
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
        </Stack.Navigator>
      </Host>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
