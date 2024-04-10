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

  return (
    <Container keyboard={false}>
      <Loading showLoading={showLoading} />

      <View style={{ marginTop: 15 }}>
        
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 40,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Historia</Text>
      </View>

      <View style={styles.body}>

        <View style={styles.option}>
          <View
            style={{
              paddingHorizontal: 5,
            }}
          >
            <Text style={[styles.optionText, { fontWeight: "bold", textAlign: "center" }]}>
              Defensa Civil
            </Text>

            <View
              style={{
                width: "100%",
              }}
            >
              <ImageBackground
                source={require('../assets/images/logo.png')}
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
              La Defensa Civil tiene por objetivo principal asegurar que los operativos del país sean adecuados para los perjuicios que se originen por los desastres causados por inundación, terremoto, tormenta, huracán, fuego, escasez o distribución deficiente de suministro de materiales, u otros motivos similares, y en general para proveer el orden, salud y bienestar económico, seguridad pública, preservación de la vida y de la propiedad.
            </Text>
          </View>
        </View>
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
