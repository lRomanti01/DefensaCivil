import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ImageBackground,
} from "react-native";
import Container from "../components/Container";
import Header from "../components/Header";
import { fetchData } from "../httpRequests";
import { hideLoadingModal, showErrorToast } from "../utils";
import { ApiResponse } from "../types";
import Loading from "../components/Loading";

interface Member {
  id: number;
  nombre: string;
  descripcion: string;
  foto: string;
}

export default function ServiceScreen() {
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);

  useEffect(() => {
    setShowLoading(true);

    setTimeout(() => {
        hideLoadingModal(() => {
          getMembers();
        }, setShowLoading);
    }, 100)
  }, []);

  const getMembers = () => {
    setFetching(true);
    const url = "def/servicios.php";
    fetchData(url).then((response: ApiResponse) => {
      if (response.exito) {
        setMembers(response.datos);
        setFetching(false);
      } else {
        showErrorToast("Error al cargar datos");
      }
    });
    setFetching(false);
  };

  return (
    <Container keyboard={false}>
      <Loading showLoading={showLoading} />

      <View style={{ marginTop: 15 }}>
        <Header />
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 40,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Servicios</Text>
      </View>

      <View style={styles.body}>
        <FlatList
          data={members}
          numColumns={1}
          refreshing={fetching}
          onRefresh={() => getMembers()}
          renderItem={({ item }) => (
            <View style={styles.option}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: "20%",
                }}
              >
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "rgba(0, 0, 0, 0.2)",
                    borderRadius: 100,
                    justifyContent: "center",
                    marginBottom: 10
                  }}
                >
                  <ImageBackground
                    source={{ uri: item.foto }}
                    style={styles.profilePicture}
                    resizeMode={"cover"}
                    imageStyle={{ borderRadius: 100 }}
                  ></ImageBackground>
                </View>
              </View>
              <View
                style={{
                  gap: 10,
                  paddingHorizontal: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={[styles.optionText, { fontWeight: "bold" }]}>
                  {item.nombre}
                </Text>
                <Text
                  style={[
                    styles.optionText,
                    { color: "gray", fontWeight: "500", textAlign: "justify" },
                  ]}
                >
                  {item.descripcion}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  body: {
    padding: 20,
    flexDirection: "column",
    flex: 1,
  },
  option: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderColor: "#D4D5D5",
    borderWidth: 1,
    borderRadius: 10,
    minWidth: 300,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginVertical: 10,
  },
  profilePicture: {
    height: 80,
    width: 80,
    borderRadius: 100,
  },
  optionText: {
    fontSize: 16,
  },
});
