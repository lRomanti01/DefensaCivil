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
import MapView, { Marker } from "react-native-maps";

interface News {
  ciudad: string,
  codigo: string,
  edificio: string,
  coordinador: string,
  telefono: string,
  capacidad: string,
  lat: number,
  lng: number
}

export default function MapaAlbergueScreen() {
  const [showLoading, setShowLoading] = useState<boolean>(true);
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
          width: "90%",
          marginHorizontal: 10,
          paddingHorizontal: 10,
          borderWidth: 1,
          borderRadius: 10

        }}
        placeholder="Buscar edificio..."
        onChangeText={handleSearch}
        value={searchQuery}
      />

      <View style={styles.body}>
        {
          fetching ? <Loading showLoading={true} />
            :
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: 18.482443023578163,
                longitude: -69.95184981233268,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              {
                filteredDatos.map((data, key) => {
                  return <Marker key={key}
                    coordinate={{ latitude: Number(data.lng) , longitude: Number(data.lat) }}
                    title={`${data.edificio} `}
                    description={`Telefono: ${data.telefono}`}
                  />
                })
              }
            </MapView>
        }
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
  map: {

    width: "100%",
    height: "80%"
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
