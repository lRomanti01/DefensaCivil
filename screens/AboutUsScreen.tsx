import {
    AntDesign,
    Ionicons,
  } from "@expo/vector-icons";
  import { Formik } from "formik";
  import React, { useState } from "react";
  import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
  } from "react-native";
  
  export default function AboutUsScreen({ navigation, route }: any) {
    const [profileImage, setProfileImage]: any = useState(
      require("../assets/images/profile_avatar.png")
    );
    const [user, setUser]: any = useState({});

    return (
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 40,
          }}
        >
          <TouchableOpacity
            style={{ alignItems: "flex-end", marginHorizontal: 5 }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <View
              style={{
                borderRadius: 5,
                marginHorizontal: 5,
              }}
            >
              <Ionicons
                name="arrow-back-outline"
                size={35}
                style={{ color: "#000" }}
              />
            </View>
          </TouchableOpacity>
  
        </View>
  
        <View style={styles.header}>
          <Text
            style={{
              fontSize: 25,
              color: "#000",
              fontWeight: "bold",
              marginBottom: 20,
            }}
          >
            Acerca de nosotros
          </Text>
          <TouchableOpacity
            // disabled={isSelecting}
            style={{
              borderWidth: 1,
              borderColor: "rgba(0, 0, 0, 0.2)",
              borderRadius: 100,
            }}
            // onPress={openImagePickerAsync}
          >
            <ImageBackground
              source={!!profileImage ? profileImage : null}
              style={styles.profilePicture}
              resizeMode={"cover"}
              imageStyle={{ borderRadius: 100 }}
            />
          </TouchableOpacity>
  
          <View style={{ gap: 10, marginTop: 10, justifyContent: "center" }}>
            <Text style={styles.profileName}>Romantiezer Rodriguez Pérez</Text>
            <View
              style={{
                alignItems: "center",
                gap: 10,
                justifyContent: "center"
              }}
            >
              <Text style={styles.profileInfo}>+1 (829) 348 8341</Text>
              <Text style={styles.profileInfo}>Romanti159@gmail.com</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    header: {
      flexDirection: "column",
      paddingHorizontal: 30,
      alignItems: "center",
      justifyContent: "center",
    },
    profilePicture: {
      height: 110,
      width: 110,
      borderRadius: 100,
      borderColor: "white",
      borderWidth: 1,
    },
    pencilEdit: {
      position: "absolute",
      backgroundColor: "#0F3D87",
      padding: 10,
      borderRadius: 100,
      bottom: 5,
      right: -10,
    },
    profileName: {
      fontSize: 20,
      color: "#000",
      fontWeight: "500",
    },
    profileRole: {
      color: "#000",
      fontSize: 17,
      fontWeight: "300",
    },
    profileInfo: {
      color: "gray",
      fontSize: 15,
      fontWeight: "300",
    },
    textInput: {
      height: 50,
      width: "100%",
      backgroundColor: "#F7F7F7",
      paddingRight: 45,
      paddingLeft: 40,
      borderRadius: 5,
      marginVertical: 10,
    },
    inputContainer: {
      marginVertical: 10,
      width: "90%",
    },
    inputTitle: {
      fontWeight: "500",
      color: "#8B8B97",
    },
    inputIconOther: {
      position: "absolute",
      left: 4,
      top: "35%",
      zIndex: 2,
      padding: 10,
      color: "#0F3D87",
    },
    buttonContainer: {
      padding: 20,
      marginBottom: 10,
    },
    SubmitButton: {
      width: "100%",
      height: 50,
      backgroundColor: "#0F3D87",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      marginTop: 20,
    },
    registerButtonText: {
      color: "#ffffff",
      fontSize: 18,
      fontWeight: "bold",
    },
    scrollViewContainer: {
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
    },
  });
  