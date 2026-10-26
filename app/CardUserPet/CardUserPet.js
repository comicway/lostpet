import { View, Text, StyleSheet } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { Image as ExpoImage } from "expo-image";

const CardUserPet = ({ mascot }) => {
  return (
    <>
      <View style={globalStyles.cardUserPet}>
        <ExpoImage
          source={{ uri: mascot.img }}
          style={styles.img}
          contentFit="cover"
          transition={1000}
          cachePolicy="memory-disk"
        />
        <Text style={globalStyles.textpH1}>{mascot.nombre}</Text>
        <Text style={globalStyles.textpH2}>{mascot.raza}</Text>
      </View>
      <View style={globalStyles.cardPet}>
        <Text style={globalStyles.textp}>Peso: {mascot.peso}</Text>
        <Text style={globalStyles.textp}>Color: {mascot.color}</Text>
        <Text style={globalStyles.textp}>
          Cumpleaños: {mascot.fechaNacimiento}
        </Text>
        <Text style={globalStyles.textp}>Microchip: {mascot.microchip}</Text>
      </View>
      <View style={globalStyles.cardOwner}>
        <Text style={globalStyles.textpH1}>Datos del dueño</Text>
        <Text style={globalStyles.textp}>Nombre: Moises</Text>
        <Text style={globalStyles.textp}>Apellido: Contreras</Text>
        <Text style={globalStyles.textp}>Telefono: 5555677</Text>
        <Text style={globalStyles.textp}>Email: elemail@gmail.com</Text>
      </View>
    </>
  );
};

export default CardUserPet;

const styles = StyleSheet.create({
  img: {
    width: 200,
    height: 200,
    borderRadius: 6,
  },
});
