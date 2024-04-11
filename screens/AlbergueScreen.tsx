import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Linking,
  TextInput,
} from "react-native";
import Container from "../components/Container";
import Header from "../components/Header";
import { fetchData } from "../httpRequests";
import { hideLoadingModal, showErrorToast } from "../utils";
import { ApiResponse } from "../types";
import Loading from "../components/Loading";

interface News {
  ciudad: string,
  codigo: string,
  edificio: string,
  coordinador: string,
  telefono: string,
  capacidad: string,
  lat: string,
  lng: string
}

export default function NoticiasScreen() {
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [news, setNews] = useState<News[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    setShowLoading(true);

    setTimeout(() => {
      hideLoadingModal(() => {
        getNews();
      }, setShowLoading);
    }, 100);
  }, []);

  const handlePress = async (lat, long) => {

    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${long}`;
    await Linking.openURL(googleMapsUrl);

  };

  const filteredDatos = news.filter((dato) =>
    dato.edificio.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const getNews = () => {
    setFetching(true);
    const url = "def/albergues.php";
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
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Albergues</Text>
      </View>
      <TextInput
      style={{
        width:"90%",
        marginHorizontal:10,
        paddingHorizontal:10,
        borderWidth:1,
        borderRadius:10

      }}
        placeholder="Buscar edificio..."
        onChangeText={handleSearch}
        value={searchQuery}
      />

      <View style={styles.body}>
        <FlatList
          data={filteredDatos}
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
                  {item.ciudad}
                </Text>

                <View
                  style={{
                    width: "80%",
                    flexDirection: "column",
                    gap: 5,
                  }}
                >
                  <Text>Edificio: {item.edificio}</Text>
                  <Text>Coordinador: {item.coordinador}</Text>
                  <Text>Telefono: {item.telefono}</Text>
                  <Text>Capacidad: {item.capacidad !== "" ? item.capacidad : "N/A"}</Text>
                  <TouchableOpacity
                    style={{
                      borderRadius: 5,
                      width: "35%",
                      backgroundColor: "blue",
                    }}
                    onPress={() => handlePress(item.lng, item.lat)}>
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold", backgroundColor: "blue", textAlign: "center"
                      }}
                    >Abrir Mapa</Text>
                  </TouchableOpacity>
                </View>
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
