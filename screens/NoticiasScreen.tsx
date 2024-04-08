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

interface News {
  id: number;
  fecha: string;
  titulo: string;
  contenido: string;
  foto: string;
}

export default function NoticiasScreen() {
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [news, setNews] = useState<News[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);

  useEffect(() => {
    setShowLoading(true);

    setTimeout(() => {
      hideLoadingModal(() => {
        getNews();
      }, setShowLoading);
    }, 100);
  }, []);

  const getNews = () => {
    setFetching(true);
    const url = "def/noticias.php";
    fetchData(url).then((response: ApiResponse) => {
      if (response.exito) {
        setNews(response.datos);
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
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Noticias</Text>
      </View>

      <View style={styles.body}>
        <FlatList
          data={news}
          numColumns={1}
          refreshing={fetching}
          onRefresh={() => getNews()}
          renderItem={({ item }) => (
            <View style={styles.option}>
              <View
                style={{
                  paddingHorizontal: 5,
                }}
              >
                <Text style={[styles.optionText, { fontWeight: "bold", textAlign: "center" }]}>
                  {item.titulo}
                </Text>

                <View
                  style={{
                    width: "100%",
                  }}
                >
                  <ImageBackground
                    source={{ uri: item.foto }}
                    style={styles.newPicture}
                    resizeMode={"center"}
                  />
                </View>

                <Text
                  style={[
                    styles.optionText,
                    { color: "gray", fontWeight: "500", textAlign: "justify" },
                  ]}
                >
                  {item.contenido}
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
    paddingVertical: 15,
    paddingHorizontal: 5,
    minWidth: 300,
    marginVertical: 10,
    borderBottomColor: "gray",
    borderBottomWidth: 1
  },
  newPicture: {
    height: 150,
    width: "100%",
    backgroundColor: "black",
  },
  optionText: {
    fontSize: 16,
  },
});
