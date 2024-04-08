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
      <View style={{ marginTop: 15 }}>
        <Header />
      </View>
      
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
            source={profileImage}
            style={styles.profilePicture}
            resizeMode={"cover"}
            imageStyle={{ borderRadius: 100 }}
          ></ImageBackground>
        </TouchableOpacity>
        <View style={{ marginLeft: 15 }}>
          {user && (
            <>
              <Text style={styles.profileText}>{user.nombre}</Text>
              <Text style={styles.profileText}>{user.correo}</Text>
            </>
          )}
        </View>
      </View>
      <ScrollView style={styles.body}>
        <View>
          <Pressable
            style={styles.option}
            onPress={() =>
              navigation.navigate("UpdateUser", { userData: user })
            }
          >
            <Text style={styles.optionText}>Mi información</Text>
            <AntDesign style={styles.optionIcon} name="right" size={16} />
          </Pressable>
          <Pressable
            style={styles.option}
            onPress={() => navigation.navigate("Notification")}
          >
            <Text style={styles.optionText}>Cambiar clave</Text>
            <AntDesign style={styles.optionIcon} name="right" size={16} />
          </Pressable>

          <Pressable
            style={styles.option}
            onPress={() => {
              logout();
            }}
          >
            <Text style={styles.optionText}>Salir</Text>
            <AntDesign style={styles.optionIcon} name="right" size={16} />
          </Pressable>
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  title: {
    marginTop: 30,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "700",
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 30,
    paddingBottom: 20,
    alignItems: "center",
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
    borderBottomWidth: 1,
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
