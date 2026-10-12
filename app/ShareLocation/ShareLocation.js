import { Text, View, TouchableOpacity } from 'react-native';
import AppBar from '../AppBar/AppBar'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { globalStyles } from '../../styles/globalStyles';

const ShareLocation = () => {

  const insets = useSafeAreaInsets();

  return (
    <>
      <View style={[{ paddingTop: insets.top }]}>
        <AppBar />
      </View>
      <View style={globalStyles.containerCenter}>
        <View style={globalStyles.cardShare}>
          <Text style={globalStyles.textpH1}>¿Desea compartir su ubicacion?</Text>
          <View style={globalStyles.barButton}>
            <TouchableOpacity style={globalStyles.buttonYes}>
              <Text style={globalStyles.buttonText}>NO</Text>
            </TouchableOpacity>
            <TouchableOpacity style={globalStyles.buttonYes}>
              <Text style={globalStyles.buttonText}>SI</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={globalStyles.textp}>Su ubicacion solo sera compartida con el dueño de la mascota. Esto ayudara a que %%nombremascota%% regrese a casa.</Text>
        </View>
      </View>
    </>
    );
};

export default ShareLocation;
