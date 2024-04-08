import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import asyncStorage from "@react-native-async-storage/async-storage";
import { checkStorage } from "../utils";
import Container from "../components/Container";
import Loading from "../components/Loading";
import Header from "../components/Header";

interface UserData {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
}

export default function ProfileScreen({ navigation, route }: any) {
  const [profileImage, setProfileImage]: any = useState(require("../assets/images/profile_avatar.png"));
  const [showLoading, setShowLoading]: any = useState(false);
  const [user, setUser] = useState<UserData | undefined>(undefined);

  useEffect(() => {
    checkStorage("USER_DATA", (data: string) => {
      setUser(JSON.parse(data));
      console.log(data)
    });
  }, []);

  const logout = () => {
    const user = asyncStorage.getItem("USER_DATA");
    if (!!user) {
      asyncStorage.removeItem("USER_DATA");
      redirectToLogin();
    }
  };

  const redirectToLogin = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "SignIn" }],
    });
  };
  return (
    <Container>      
      <Loading showLoading={showLoading} />
      <Text style={styles.title}>Mi cuenta</Text>
      <View style={styles.header}>
      <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: "rgba(0, 0, 0, 0.2)",
              borderRadius: 100,
            }}
          >
            <ImageBackground
              source={!!profileImage ? profileImage : null}
              style={styles.profilePicture}
              resizeMode={"cover"}
              imageStyle={{ borderRadius: 100 }}
            />
          </TouchableOpacity>
  
          {user && <View style={{ gap: 10, marginTop: 10, justifyContent: "center" }}>
            <Text style={styles.profileName}>{user.nombre} {user.apellido}</Text>
            <View
              style={{
                alignItems: "center",
                gap: 10,
                justifyContent: "center"
              }}
            >
              <Text style={styles.profileInfo}>{user.telefono}</Text>
              <Text style={styles.profileInfo}>{user.correo}</Text>
            </View>
          </View>}
      </View>
      <ScrollView style={styles.body}>
        <View>
          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate("ChangePasswordScreen")}
          >
            <Text style={styles.optionText}>Cambiar clave</Text>
            <AntDesign style={styles.optionIcon} name="right" size={16} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.option}
            onPress={() => {
              logout();
            }}
          >
            <Text style={styles.optionText}>Salir</Text>
            <AntDesign style={styles.optionIcon} name="right" size={16} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    marginTop: 10
  },
  title: {
      fontSize: 25,
      color: "#000",
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
      marginTop: 25
  },
  profileName: {
    fontSize: 20,
    color: "#000",
    fontWeight: "500",
  },
  profileInfo: {
    color: "gray",
    fontSize: 15,
    fontWeight: "300",
  },
  header: {
    flexDirection: "column",
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  profilePicture: {
    height: 70,
    width: 70,
    borderRadius: 100,
  },
  profileText: {
    fontSize: 16,
  },
  option: {
    alignContent: "center",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 25,
    borderBottomColor: "rgba(0, 0, 0,  0.1)",
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 16,
  },
  optionIcon: {
    color: "rgba(0, 0, 0, 0.3)",
  },
});
