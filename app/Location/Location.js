import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AppBar from '../AppBar/AppBar'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { globalStyles } from '../../styles/globalStyles';
import { Image as ExpoImage } from 'expo-image';
import FabMenu from '../FabMenu/FabMenu';

const Location = () => {

  const insets = useSafeAreaInsets();

  return (
    <>
      <ScrollView>
        <View style={[{ paddingTop: insets.top }]}>
          <AppBar />
        </View>
        <View style={globalStyles.containerCenter}>
          <View style={globalStyles.mapLocation}>
            <ExpoImage
              source={require('../../assets/emma.png')}
              style={styles.imgMap}
              contentFit='cover'
              transition={1000}
              cachePolicy='memory-disk'
            />
          </View>
          <View style={globalStyles.cardMap}>
              <ExpoImage
                  source={require('../../assets/emma.png')}
                  style={styles.img}
                  contentFit='cover'
                  transition={1000}
                  cachePolicy='memory-disk'
            />
            <View style={globalStyles.petLocations}>
              <Text style={globalStyles.textpH1}>Emma</Text>
              <Text style={globalStyles.textpH2}>San Pablo 4025 Quinta Normal</Text>
            </View>
          </View>
        </View>
          <FabMenu />
      </ScrollView>
    </>
    );
};

export default Location;

const styles = StyleSheet.create({
  imgMap: {
    width: '100%',
    height: 600,
    borderRadius: 6
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 6,
    flex: 1,
  },
});
