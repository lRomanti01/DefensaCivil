import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, StyleSheet } from 'react-native';

const images = [
  { id: 1, url: require('../assets/slider/Bannerprincipal.jpg') },
  { id: 2, url: require('../assets/slider/COMISIONWEBBANNER.png') },
  { id: 3, url: require('../assets/slider/CartaBanner.png') },
  { id: 4, url: require('../assets/slider/slider_escuela_2.jpg') },
  // Agrega más imágenes si es necesario
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

 /*  useEffect(() => {
    const interval = setInterval(() => {
      // Cambiar al siguiente índice
      setCurrentIndex(() =>
        currentIndex === 3 ? 0 : currentIndex + 1
      );
      console.log(currentIndex)

    }, 60000); // Cambiar cada 1 minuto (60000 milisegundos)

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar
  }, []);
 */
  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Image source={item.url} style={styles.image} resizeMode="cover" />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        initialScrollIndex={currentIndex}
        getItemLayout={(data, index) => ({
          length: styles.image.width,
          offset: styles.image.width * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 400, // Ancho de cada imagen en el slider
    height: 200, // Altura de cada imagen en el slider
  },
});

export default Slider;