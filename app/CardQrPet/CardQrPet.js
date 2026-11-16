import { View, Text, StyleSheet, Button } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { Image as ExpoImage } from 'expo-image';
import { useRouter } from 'expo-router';

const CardQrPet = ({ mascot }) => {

  const router = useRouter();

  const goInterQR = () => {
    router.push(`/InterQR/${mascot.microchip}`);
  };

  return (
    <>
      <View style={globalStyles.cardQR}>
        <View style={globalStyles.mapLocation}>
          <ExpoImage
            source={{ uri: mascot.img }}
            style={styles.img}
            contentFit='cover'
            transition={1000}
            cachePolicy='memory-disk'
          />
        </View>
        <View style={globalStyles.petLocationsQR}>
          <Text style={globalStyles.textpH1}>{mascot.nombre}</Text>
          <Button style={globalStyles.buttonSave} title="Ver" onPress={goInterQR}></Button>
        </View>
      </View>
    </>
  )
};

export default CardQrPet

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: 120,
  },
});
