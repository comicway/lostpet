import { View, ScrollView } from 'react-native';
import AppBar from '../AppBar/AppBar'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { globalStyles } from '../../styles/globalStyles';
import FabMenu from '../FabMenu/FabMenu';
import mascotasMock from '../Utils/MockData.json';
import CardQrPet from '../CardQrPet/CardQrPet';

const CodeQR = () => {

  const insets = useSafeAreaInsets();

  return (
    <>
      <View style={[{ paddingTop: insets.top }]}>
        <AppBar />
      </View>
      <View style={globalStyles.containerQR}>
        <ScrollView contentContainerStyle={globalStyles.innerContainer} showsVerticalScrollIndicator={false}>
          {mascotasMock[0].pets.map((pet, index) => (
                <CardQrPet key={index} mascot={pet} />
              ))}
        </ScrollView>
      </View>
      <FabMenu />
    </>
  );
};

export default CodeQR;
