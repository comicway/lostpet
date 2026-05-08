import { Text, View, StyleSheet } from 'react-native';
import { COLORS, SIZESFONT } from '../../constants/Theme';
import { globalStyles } from '../../styles/globalStyles';
import { Image as ExpoImage } from 'expo-image';

const Home = () => {

    return (
        <View style={globalStyles.container}>
            <View style={globalStyles.cardHome}>
                <ExpoImage
                    source={require('../../assets/emma.png')}
                    style={styles.img}
                    contentFit='cover'
                    transition={1000}
                    cachePolicy='memory-disk'
                />
                <Text style={styles.textp}>
                    Este es el home, muajajja
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textp: {
        color: COLORS.font,
        fontSize: SIZESFONT.paragraph,
    },
    img: {
        width: 150,
        height: 200,
        borderRadius: 6
    }
});

export default Home