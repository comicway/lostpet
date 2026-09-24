import { Text, View, StyleSheet, Button } from 'react-native';
import AppBar from '../AppBar/AppBar'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { globalStyles } from '../../styles/globalStyles';
import { COLORS, SIZESFONT } from '../../constants/Theme';
import { Image as ExpoImage } from 'expo-image';

const UserPet = () => {

  const insets = useSafeAreaInsets();

  return (
    <>
      <View style={[{ paddingTop: insets.top }]}>
        <AppBar />
      </View>
      <View style={globalStyles.containerCenter}>
        <View style={globalStyles.cardUserPet}>
            <ExpoImage
                source={require('../../assets/emma.png')}
                style={styles.img}
                contentFit='cover'
                transition={1000}
                cachePolicy='memory-disk'
          />
          <Text style={globalStyles.textpH1}>Emma</Text>
          <Text style={globalStyles.textpH2}>Salchicha</Text>
        </View>
        <View style={globalStyles.cardPet}>
          <Text style={globalStyles.textp}>Edad: 4 años</Text>
          <Text style={globalStyles.textp}>Peso: 8 kg</Text>
          <Text style={globalStyles.textp}>Color: Marrón</Text>
          <Text style={globalStyles.textp}>Cumpleaños: 23/04/26</Text>
          <Text style={globalStyles.textp}>Micro chip 985141000123456</Text>
        </View>
        <View style={globalStyles.cardOwner}>
          <Text style={globalStyles.textpH1}>Datos del dueño</Text>
          <Text style={globalStyles.textp}>Edad: 4 años</Text>
          <Text style={globalStyles.textp}>Peso: 8 kg</Text>
          <Text style={globalStyles.textp}>Color: Marrón</Text>
          <Text style={globalStyles.textp}>Cumpleaños: 23/04/26</Text>
        </View>
      </View>
    </>
    );
};

export default UserPet;

const styles = StyleSheet.create({
    img: {
        width: 200,
        height: 200,
        borderRadius: 6
  },
});
