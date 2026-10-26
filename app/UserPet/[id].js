import { View, Text } from "react-native";
import AppBar from "../AppBar/AppBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { globalStyles } from "../../styles/globalStyles";
import FabMenu from "../FabMenu/FabMenu";
import mascotasMock from "../Utils/MockData.json";
import UserData from "../Utils/UserData.json";
import CardUserPet from "../CardUserPet/CardUserPet";
import { useLocalSearchParams } from 'expo-router';

const UserPet = () => {

  const insets = useSafeAreaInsets();

  const params = useLocalSearchParams();

  const { id } = params;

  const pet = mascotasMock.find(p => p.microchip === id);

  if (!pet) return<View style={globalStyles.containerCenter}><Text>Mascota no Encontrada</Text></View>;

  return (
    <>
      <View style={[{ paddingTop: insets.top }]}>
        <AppBar />
      </View>
      <View style={globalStyles.containerCenter}>
        <CardUserPet mascot={pet}/>
      </View>
      <FabMenu />
    </>
  );
};

export default UserPet;
