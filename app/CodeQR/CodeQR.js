import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AppBar from '../AppBar/AppBar'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { globalStyles } from '../../styles/globalStyles';
import { Image as ExpoImage } from 'expo-image';
import FabMenu from '../FabMenu/FabMenu';
import { useRouter } from 'expo-router'


const CodeQR = () => {

  const insets = useSafeAreaInsets();

  const router = useRouter();

  const goInterQR = () => {
    router.push('/InterQR/InterQR')
  };

  return (
    <>
      <View style={[{ paddingTop: insets.top }]}>
        <AppBar />
      </View>
      <View style={globalStyles.containerQR}>
        <ScrollView contentContainerStyle={globalStyles.innerContainer} showsVerticalScrollIndicator={false}>
          <View style={globalStyles.cardQR}>
            <View style={globalStyles.mapLocation}>
              <ExpoImage
                source={require('../../assets/emma.png')}
                style={styles.img}
                contentFit='cover'
                transition={1000}
                cachePolicy='memory-disk'
              />
            </View>
            <View style={globalStyles.petLocationsQR}>
              <Text style={globalStyles.textpH1}>Emma</Text>
              <TouchableOpacity style={globalStyles.buttonSave} onPress={goInterQR}>
                <Text style={globalStyles.buttonText}>Ver</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={globalStyles.cardQR}>
            <View style={globalStyles.mapLocation}>
              <ExpoImage
                source={require('../../assets/emma.png')}
                style={styles.img}
                contentFit='cover'
                transition={1000}
                cachePolicy='memory-disk'
              />
            </View>
            <View style={globalStyles.petLocationsQR}>
              <Text style={globalStyles.textpH1}>Emma</Text>
              <TouchableOpacity style={globalStyles.buttonSave} onPress={goInterQR}>
                <Text style={globalStyles.buttonText}>Ver</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
      <FabMenu />
    </>
  );
};

export default CodeQR;

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: 120,
  },
});
