import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./navigation";
import { RootSiblingParent } from "react-native-root-siblings";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" backgroundColor="#fff" />
      <RootSiblingParent>
        <Navigation />
      </RootSiblingParent>
    </SafeAreaProvider>
  );
}
