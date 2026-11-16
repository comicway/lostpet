import { View, ScrollView } from "react-native";
import AppBar from "../AppBar/AppBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { globalStyles } from "../../styles/globalStyles";
import FabMenu from "../FabMenu/FabMenu";
import CardLocations from "../CardLocations/CardLocations";
import mascotasMock from "../Utils/MockData.json";

const RecentLocations = () => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <ScrollView>
        <View style={[{ paddingTop: insets.top }]}>
          <AppBar />
        </View>
        <View style={globalStyles.containerCenter}>
          {mascotasMock[0].pets.map((pet, index) => (
            <CardLocations key={index} mascot={pet} />
          ))}
        </View>
        <FabMenu />
      </ScrollView>
    </>
  );
};

export default RecentLocations;
