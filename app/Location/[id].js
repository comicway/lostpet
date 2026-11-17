import { Text, View, StyleSheet, ScrollView } from "react-native";
import AppBar from "../AppBar/AppBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { globalStyles } from "../../styles/globalStyles";
import { Image as ExpoImage } from "expo-image";
import FabMenu from "../FabMenu/FabMenu";
import { useLocalSearchParams } from "expo-router";
import mascotasMock from "../Utils/MockData.json";
import SearchPet from "../Logic/SearchPet";
import MapView, { Marker } from "react-native-maps";

const Location = () => {
  const insets = useSafeAreaInsets();

  const params = useLocalSearchParams();

  const { id } = params;

  const [usuario, pet] = SearchPet(mascotasMock, id);

  console.log("--- Buscando mascota ---");
  console.log("Usuario:", usuario.nombre);
  console.log("id recibido:", JSON.stringify(id));
  console.log(
    "Microchip:",
    JSON.stringify(usuario?.pets.map((p) => p.microchip)),
  );
  console.log("mascota encontrada:", pet.nombre);
  console.log(typeof usuario.pets.map); // "function"
  console.log(typeof usuario.map);       // "undefined"


  if (!pet)
    return (
      <View style={globalStyles.containerCenter}>
        <Text>Mascota no Encontrada</Text>
      </View>
    );

  return (
    <>
      <ScrollView>
        <View style={[{ paddingTop: insets.top }]}>
          <AppBar />
        </View>
        <View style={globalStyles.containerCenter}>
          <View style={globalStyles.mapLocation}>
            <MapView
              style={styles.imgMap}
              initialRegion={{
                latitude: pet.locations[0].latitude,
                longitude: pet.locations[0].longitude,
                latitudeDelta: 0.15, // Nivel de zoom vertical
                longitudeDelta: 0.15, // Nivel de zoom horizontal
              }}
            >
              {pet.locations.map((loc) => (
                  <Marker
                    key={loc.id}
                    coordinate={{
                      latitude: loc.latitude,
                      longitude: loc.longitude,
                    }}
                    title={loc.titulo}
                    description={loc.descripcion}
                  />
                ))}
            </MapView>
          </View>
          <View style={globalStyles.cardMap}>
            <ExpoImage
              source={{ uri: pet.img }}
              style={styles.img}
              contentFit="cover"
              transition={1000}
              cachePolicy="memory-disk"
            />
            <View style={globalStyles.petLocations}>
              <Text style={globalStyles.textpH1}>Ubicación reciente</Text>
              <Text style={globalStyles.textpH2}>
                {pet.locations[0].descripcion}
              </Text>
              <Text style={globalStyles.textp}>{pet.locations[0].date}</Text>
            </View>
          </View>
        </View>
        <FabMenu />
      </ScrollView>
    </>
  );
};

export default Location;

const styles = StyleSheet.create({
  imgMap: {
    width: "100%",
    height: 600,
    borderRadius: 6,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 6,
    flex: 1,
  },
});
