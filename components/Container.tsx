import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from "react-native";

export default function Container({ children, style, keyboard }: any) {
  return (
    <SafeAreaView
      style={
        !!style
          ? [
              style,
              {
                paddingTop:
                  Platform.OS === "android" ? StatusBar.currentHeight : 0,
              },
            ]
          : styles.container
      }
    >
      {keyboard ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "position"}
        >
          {children}
        </KeyboardAvoidingView>
      ) : (
        <>{children}</>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
