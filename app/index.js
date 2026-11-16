import { View } from 'react-native';
import { COLORS, SIZESFONT } from '../constants/Theme';
import { globalStyles } from '@/styles/globalStyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppBar from "./AppBar/AppBar";
import FabMenu from "./FabMenu/FabMenu";
import mascotasMock from './Utils/MockData.json';
import CardHome from './CardHome/CardHome';


const HomePet = () => {

  const insets = useSafeAreaInsets();

  return (
    <>

    <View style={[{ paddingTop: insets.top }]}>
      <AppBar />
      </View>
      <View style={globalStyles.container}>
        {mascotasMock[0].pets.map((pet, index) => (
              <CardHome key={index} mascot={pet} />
            ))}
      </View>
      <FabMenu />
    </>
    )
}

export default HomePet
