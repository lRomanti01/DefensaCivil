import React, { useState } from "react";
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

export default function AdsContainer({ img, website }: AdsContainerProps) {
  const [data, setData] = useState<string>(website);

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
        <TouchableOpacity onPress={open}>
          <Image style={styles.image} source={img} />
        </TouchableOpacity>
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