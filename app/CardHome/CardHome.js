import { View, Text, Button, StyleSheet } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { COLORS, SIZESFONT } from '../../constants/Theme';
import { Image as ExpoImage } from 'expo-image';
import { useRouter } from 'expo-router';

const CardHome = ({ mascot }) => {

  const router = useRouter();

  const goUserPet = () => {
      router.push(`/UserPet/${mascot.microchip}`);
  };

  return (
    <>
      <View style={globalStyles.cardHome}>
        <ExpoImage
          source={{uri: mascot.img}}
          style={styles.img}
          contentFit='cover'
          transition={1000}
          cachePolicy='memory-disk'
        />
        <View style={styles.internoCard}>
          <Text style={styles.textp}>Nombre: {mascot.nombre}</Text>
          <Text style={styles.textp}>Raza: {mascot.raza}</Text>
          <Text style={styles.textp}>Cumpleaños: {mascot.fechaNacimiento}</Text>
          <View style={globalStyles.buttonFicha}>
            <Button title="Ir a la ficha" onPress={goUserPet}></Button>
          </View>
        </View>
      </View>
    </>
  )
};

export default CardHome

const styles = StyleSheet.create({
    textp: {
        color: COLORS.font,
        fontSize: SIZESFONT.paragraph,
    },
    img: {
        width: 150,
        height: 200,
        borderRadius: 6
    },
    internoCard: {
        paddingLeft: 10
    }
});
