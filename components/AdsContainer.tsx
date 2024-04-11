import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";

interface AdsContainerProps {
  img: any;
  website: string;
}
const images = [
  { id: 1, url: require('../assets/slider/Bannerprincipal.jpg') },
  { id: 2, url: require('../assets/slider/COMISIONWEBBANNER.png') },
  { id: 3, url: require('../assets/slider/CartaBanner.png') },
  { id: 4, url: require('../assets/slider/slider_escuela_2.jpg') },
  // Agrega más imágenes si es necesario
];

export default function AdsContainer({ img, website }: AdsContainerProps) {
  const [data, setData] = useState<string>(website);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Cambiar al siguiente índice
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
      console.log(currentIndex)

    }, 5000); // Cambiar cada 1 minuto (60000 milisegundos)

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar
  }, []);

  const open = async () => {
    if (data) {
      Alert.alert(
        "Alerta",
        "Seguro quieres visitar este sitio web?",
        [
          {
            text: "Sí",
            onPress: async () => {
              const supported = await Linking.canOpenURL(data);
              if (supported) {
                await Linking.openURL(data);
              } else {
                Alert.alert(`No se puede abrir esta URL: ${data}`);
              }
            },
          },
          {
            text: "No",
          },
        ]
      );
    }
  };

  return (
    <View>
      <View style={styles.headerImage}>

        <Image style={styles.image} source={images[currentIndex].url} />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    marginBottom: 20,
    height: 180,
    width: "100%",
    borderRadius: 10,
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 10,
  },
});