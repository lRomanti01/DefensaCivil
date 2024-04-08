import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import Container from "../components/Container";
import Header from "../components/Header";
import AdsContainer from "../components/AdsContainer";
import { fetchData } from "../httpRequests";
import { ApiResponse } from "../types";
import { showErrorToast } from "../utils";
interface Member {
    id: number;
    nombre: string;
    cargo: number;
    foto: string;
  }

export default function HomeScreen({ navigation }) {
  const MenuItems = [
    {
      name: "Inicio",
      router: "",
      image: require("../assets/images/hogar.png"),
    },
    {
      name: "Historia",
      router: "",
      image: require("../assets/images/historia.png"),
    },
    {
      name: "Servicios",
      router: "ServiceScreen",
      image: require("../assets/images/service.png"),
    },
    {
      name: "Noticias",
      router: "NoticiasScreen",
      image: require("../assets/images/noticia.png"),
    },
    {
      name: "Videos",
      router: "VideosScreen",
      image: require("../assets/images/video.png"),
    },
    {
      name: "Albergues",
      router: "",
      image: require("../assets/images/albergue.png"),
    },
    {
      name: "Mapa de Albergues",
      router: "",
      image: require("../assets/images/albergueMap.png"),
    },
    {
      name: "Medidas Preventivas",
      router: "",
      image: require("../assets/images/advertencia.png"),
    },
    {
      name: "Miembros",
      router: "MemberScreen",
      image: require("../assets/images/miembros.png"),
    },
  ];

  return (
    <Container keyboard={false}>
      <Header />
      <FlatList
        columnWrapperStyle={{ justifyContent: "space-around" }}
        data={MenuItems}
        style={styles.body}
        ListHeaderComponent={
          <View style={{paddingHorizontal: 10, marginTop: 10}}>
            <AdsContainer img={require("../assets/images/defensaCivil.jpg")} website={"https://defensacivil.gob.do/index.php/contacto/itemlist/category/1-sobre-nosotros"} />
          </View>
        }
        renderItem={({ item, index }: any) => (
          <TouchableOpacity
            style={{
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
              width: "35%",
            }}
            onPress={() => {
              navigation.navigate(item.router);
            }}
            key={item.id}
          >
            <Image
              source={item.image}
              style={{
                height: 60,
                width: 60,
                marginBottom: 10,
                resizeMode: "contain",
              }}
            />

            <Text style={styles.categoryName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        numColumns={2}
      ></FlatList>
    </Container>
  );
}

const styles = StyleSheet.create({
  body: {
    padding: 10,
    flexDirection: "column",

  },
  categoryName: {
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 10,
  },
  headerImage: {
    marginBottom: 20,
    height: 180,
    width: "100%",
    borderRadius: 10,
  },
});
