/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import LinkingConfiguration from "./LinkingConfiguration";
import { RootStackParamList, RootTabParamList } from "../types";
import HomeScreen from "../screens/HomeScreen";
import { ColorSchemeName } from "react-native";
import MemberScreen from "../screens/MemberScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ServiceScreen from "../screens/ServiceScreen";
import NoticiasScreen from "../screens/NoticiasScreen";
import VideosScreen from "../screens/VideosScreen";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: "Atras",
      }}
    >
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerShown: false, animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false, animation: "slide_from_right" }}
      />

      <Stack.Screen
        name="ServiceScreen"
        component={ServiceScreen}
        options={{
          headerShown: true,
          animation: "slide_from_right",
          title: "Servicios",
        }}
      />

      <Stack.Screen
        name="MemberScreen"
        component={MemberScreen}
        options={{
          headerShown: true,
          animation: "slide_from_right",
          title: "Miembros",
        }}
      />

      <Stack.Screen
        name="NoticiasScreen"
        component={NoticiasScreen}
        options={{
          headerShown: true,
          animation: "slide_from_right",
          title: "Noticias",
        }}
      />

      <Stack.Screen
        name="VideosScreen"
        component={VideosScreen}
        options={{
          headerShown: true,
          animation: "slide_from_right",
          title: "Videos",
        }}
      />

      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator({ navigation, route }: any) {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "#EB7508",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopColor: "rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          title: "Inicio",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
        initialParams={route.params}
      />

      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          title: "Perfil",
          tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
        }}
        initialParams={route.params}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}
