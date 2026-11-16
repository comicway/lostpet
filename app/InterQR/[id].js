import { Text, View, StyleSheet } from "react-native";
import AppBar from "../AppBar/AppBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { globalStyles } from "../../styles/globalStyles";
import FabVisitor from "../FabVisitor/FabVisitor";
import mascotasMock from "../Utils/MockData.json";
import { useLocalSearchParams } from "expo-router";
import QRCode from "react-native-qrcode-svg";

const InterQR = () => {
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

  const HOST = "http://192.168.1.87:8081";
  const urlPet = `${HOST}/UserPet/${pet.microchip}`;

  return (
    <>
      <View style={[{ paddingTop: insets.top }]}>
        <AppBar />
      </View>
      <View style={globalStyles.containerCenter}>
        <View style={globalStyles.cardInterQR}>
          <QRCode
            value={urlPet}
            size={200}
            color={"#000000"}
            backgroundColor={"#FFFFFF"}
          />
          <Text style={globalStyles.textpH1}>{pet.nombre}</Text>
        </View>
      </View>
      <FabVisitor />
    </>
  );
};

export default InterQR;

const styles = StyleSheet.create({
  img: {
    width: "100%",
    height: 500,
    borderRadius: 6,
  },
});
