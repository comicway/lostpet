import { Text, View, StyleSheet, Button } from 'react-native';
import { COLORS, SIZESFONT } from '../constants/Theme';
import { globalStyles } from '../styles/globalStyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image as ExpoImage } from 'expo-image';
import { Link, useRouter } from 'expo-router'
import AppBar from "./AppBar/AppBar";

const HomePet = () => {

    const router = useRouter();

    const goRegisterPet = () => {

        router.push('/register/registerPet')

    };

  const insets = useSafeAreaInsets();

  return (
    <>
    <View style={[{ paddingTop: insets.top }]}>
      <AppBar />
    </View>
    <View style={globalStyles.container}>
            <View style={globalStyles.cardHome}>
                <ExpoImage
                    source={require('../assets/emma.png')}
                    style={styles.img}
                    contentFit='cover'
                    transition={1000}
                    cachePolicy='memory-disk'
                />
                <View style={styles.internoCard}>
                    <Text style={styles.textp}>Nombre: Emma</Text>
                    <Text style={styles.textp}>Raza: Salchicha</Text>
                    <Text style={styles.textp}>Cumpleaños: 28 Agosto</Text>
                    <View style={globalStyles.buttonFicha}>
                      <Button title="Ir a la ficha"></Button>
                    </View>
                </View>
            </View>
            <View style={globalStyles.buttonRegister}>
                <Button title="Registrar mascota" onPress={goRegisterPet}></Button>
            </View>
      </View>
    </>
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
    },
    internoCard: {
        paddingLeft: 10
    }
});

export default HomePet
