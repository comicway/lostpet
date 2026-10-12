import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import AppBar from '../AppBar/AppBar'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { globalStyles } from '../../styles/globalStyles';
import { Image as ExpoImage } from 'expo-image';
import FabMenu from '../FabMenu/FabMenu';
import { useRouter } from 'expo-router'

const RecentLocations = () => {

  const insets = useSafeAreaInsets();

  const router = useRouter();

  const goLocation = () => {

      router.push('/Location/Location')

  };

  return (
    <>
      <View style={[{ paddingTop: insets.top }]}>
        <AppBar />
      </View>
      <View style={globalStyles.containerCenter}>
        <View style={globalStyles.cardLocations}>
            <ExpoImage
                source={require('../../assets/emma.png')}
                style={styles.img}
                contentFit='cover'
                transition={1000}
                cachePolicy='memory-disk'
          />
          <View style={globalStyles.interLocations}>
            <Text style={globalStyles.textpH1}>En algún lugar</Text>
            <Text style={globalStyles.textpH2}>En alguna fecha</Text>
            <TouchableOpacity style={globalStyles.buttonSave} onPress={goLocation}>
              <Text style={globalStyles.buttonText}>Ver</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <FabMenu />
    </>
    );
};

export default RecentLocations;

const styles = StyleSheet.create({
    img: {
        width: '100%',
        height: 300,
        borderRadius: 6
  },
});
