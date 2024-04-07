import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Container from "../components/Container";
export default function HomeScreen() {
  return (
    <Container keyboard={false}>
      <View>
        <Text>Home</Text>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({});
