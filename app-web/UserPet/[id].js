import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { globalStyles } from "../../styles/globalStyles";
import FabVisitor from "../../app/FabVisitor/FabVisitor";
import mascotasMock from "../../app/Utils/MockData.json";
import CardUserPet from "../../app/CardUserPet/CardUserPet";
import { useLocalSearchParams } from "expo-router";

const UserPet = () => {
  const insets = useSafeAreaInsets();

  const params = useLocalSearchParams();

  const { id } = params;

  const usuario = mascotasMock.find((u) => u.userId === "1234");

  const pet = usuario?.pets.find((pet) => pet.microchip === id);

  if (!pet)
    return (
      <View style={globalStyles.containerCenter}>
        <Text>Mascota no Encontrada</Text>
      </View>
    );

  return (
    <>
      <View style={globalStyles.containerCenter}>
        <CardUserPet mascot={pet} owner={usuario} />
      </View>
      <FabVisitor />
    </>
  );
};

export default UserPet;
