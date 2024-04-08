import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text, FlatList, Alert } from "react-native";
import Container from "../components/Container";
import Header from "../components/Header";
import { fetchData } from "../httpRequests";
import { hideLoadingModal, showErrorToast } from "../utils";
import { ApiResponse } from "../types";
import Loading from "../components/Loading";
import YoutubePlayer from "react-native-youtube-iframe";

interface Videos {
  id: number;
  fecha: string;
  titulo: string;
  descripcion: string;
  link: string;
}

export default function VideosScreen() {
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [videos, setVideos] = useState<Videos[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const playerRef = useRef();

  useEffect(() => {
    setShowLoading(true);

    setTimeout(() => {
      hideLoadingModal(() => {
        getVideos();
      }, setShowLoading);
    }, 100);
  }, []);

  const getVideos = () => {
    setFetching(true);
    const url = "def/videos.php";
    fetchData(url).then((response: ApiResponse) => {
      if (response.exito) {
        setVideos(response.datos);
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
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Videos</Text>
      </View>

      <View style={styles.body}>
        <FlatList
          data={videos}
          numColumns={1}
          refreshing={fetching}
          onRefresh={() => getVideos()}
          renderItem={({ item }) => (
            <View style={styles.option}>
              <View
                style={{
                  paddingHorizontal: 5,
                }}
              >
                <Text
                  style={[
                    styles.optionText,
                    {
                      fontWeight: "bold",
                      textAlign: "center",
                      marginBottom: 10,
                    },
                  ]}
                >
                  {item.titulo}
                </Text>

                <View style={{justifyContent: "center", alignItems: "center"}}>
                  <YoutubePlayer
                    ref={playerRef}
                    height={200}
                    width={350}
                    videoId={item.link}
                  />
                </View>

                <Text
                  style={[
                    styles.optionText,
                    { color: "gray", fontWeight: "500", textAlign: "justify", marginTop: 10 },
                  ]}
                >
                  {item.descripcion}
                </Text>

                <Text
                  style={[
                    styles.optionText,
                    { fontWeight: "600", marginVertical: 10, color: "gray" },
                  ]}
                >
                  {item.fecha}
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
    padding: 5,
    flexDirection: "column",
    flex: 1,
  },
  option: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
    minWidth: 300,
    marginVertical: 10,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
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
