import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { Image as ExpoImage } from 'expo-image';
import { useRouter } from 'expo-router';

const CardLocations = ({mascot}) => {

  const router = useRouter();

  const goLocation = () => {
      router.push(`/Location/${mascot.microchip}`);
  };

  return (
    <>
      <View style={globalStyles.cardLocations}>
        <ExpoImage
          source={{uri: mascot.img}}
          style={styles.img}
          contentFit='cover'
          transition={1000}
          cachePolicy='memory-disk'
        />
        <View style={globalStyles.interLocations}>
          <Text style={globalStyles.textpH1}>{mascot.nombre}</Text>
          <Text style={globalStyles.textpH1}>{mascot.locations[0].place}</Text>
          <Text style={globalStyles.textp}>{mascot.locations[0].date}</Text>
          <TouchableOpacity style={globalStyles.buttonSave} onPress={goLocation}>
            <Text style={globalStyles.buttonText}>Ver</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default CardLocations

const styles = StyleSheet.create({
    img: {
        width: '100%',
        height: 300,
        borderRadius: 6
  },
});
