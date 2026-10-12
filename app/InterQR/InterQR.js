import { Text, View, StyleSheet } from 'react-native';
import AppBar from '../AppBar/AppBar'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { globalStyles } from '../../styles/globalStyles';
import { Image as ExpoImage } from 'expo-image';
import FabVisitor from '../FabVisitor/FabVisitor';

const InterQR = () => {

  const insets = useSafeAreaInsets();

  return (
    <>
      <View style={[{ paddingTop: insets.top }]}>
        <AppBar />
      </View>
      <View style={globalStyles.containerCenter}>
        <View style={globalStyles.cardInterQR}>
            <ExpoImage
                source={require('../../assets/emma.png')}
                style={styles.img}
                contentFit='cover'
                transition={1000}
                cachePolicy='memory-disk'
          />
          <Text style={globalStyles.textpH1}>Emma</Text>
        </View>
      </View>
      <FabVisitor />
    </>
    );
};

export default InterQR;

const styles = StyleSheet.create({
    img: {
        width: '100%',
        height: 500,
        borderRadius: 6
  },
});
