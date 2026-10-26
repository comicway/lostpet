import { View, StyleSheet } from 'react-native';
import { COLORS, SIZESFONT } from '../constants/Theme';
import { globalStyles } from '@/styles/globalStyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import AppBar from "./AppBar/AppBar";
import FabMenu from "./FabMenu/FabMenu";
import mascotasMock from './Utils/MockData.json';
import CardHome from './CardHome/CardHome';


const HomePet = () => {

    const router = useRouter();

    const goUserPet = () => {

        router.push('/UserPet/UserPet')

    };

  const insets = useSafeAreaInsets();

  return (
    <>

    <View style={[{ paddingTop: insets.top }]}>
      <AppBar />
      </View>
      <View style={globalStyles.container}>
        {mascotasMock.map((mascota, index) => (
              <CardHome key={index} mascot={mascota} />
            ))}
      </View>
      <FabMenu />
    </>
    )
}

export default HomePet

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
