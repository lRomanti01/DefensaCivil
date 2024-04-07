import React from "react";
import {
  Text,
  View,
  Modal,
  ActivityIndicator,
} from "react-native";

import { BlurView } from "expo-blur";

export default function Loading ({ showLoading }: { showLoading: boolean })  {
    return (
      <Modal visible={showLoading} transparent animationType="fade">
        <BlurView
          intensity={80}
          tint={"dark"}
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              height: 120,
              backgroundColor: "#fff",
              width: 150,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color="#EB7508" />
            <Text style={{ marginTop: 20, fontSize: 16 }}>Cargando...</Text>
          </View>
        </BlurView>
      </Modal>
    );
  };