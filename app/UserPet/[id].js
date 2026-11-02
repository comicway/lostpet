import { View, Text } from "react-native";
import AppBar from "../AppBar/AppBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { globalStyles } from "../../styles/globalStyles";
import FabMenu from "../FabMenu/FabMenu";
import mascotasMock from "../Utils/MockData.json";
import CardUserPet from "../CardUserPet/CardUserPet";
import { useLocalSearchParams } from "expo-router";

const UserPet = () => {
  const insets = useSafeAreaInsets();

  const params = useLocalSearchParams();

  const { id } = params;

  const usuario = mascotasMock.find((u) => u.userId === "1234");

  const pet = usuario?.pets.find((pet) => pet.microchip === id);

  console.log("--- Buscando mascota ---");
  console.log("Usuario:", usuario);
    console.log("id recibido:", JSON.stringify(id));
    console.log(
      "microchips del dueño:",
      JSON.stringify(usuario?.pets.map((p) => p.microchip))
    );
  console.log("mascota encontrada:", pet);

  if (!pet)
    return (
      <View style={globalStyles.containerCenter}>
        <Text>Mascota no Encontrada</Text>
      </View>
    );

  return (
    <>
      <View style={[{ paddingTop: insets.top }]}>
        <AppBar />
      </View>
      <View style={globalStyles.containerCenter}>
        <CardUserPet mascot={pet} owner={usuario} />
      </View>
      <FabMenu />
    </>
  );
};

export default UserPet;
