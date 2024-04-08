import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./navigation";
import { RootSiblingParent } from "react-native-root-siblings";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" backgroundColor="#fff" />
      <RootSiblingParent>
      <Navigation colorScheme={colorScheme} />
      </RootSiblingParent>
    </SafeAreaProvider>
  );
}
