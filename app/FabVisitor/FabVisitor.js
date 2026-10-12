import { View, Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'

const FabVisitor = () => {

  function handleFab() {
    setClosefab(!closefab);
  }

  const router = useRouter();

  const goShareLocation = () => {
    router.push('/ShareLocation/ShareLocation')
  };

  return (
    <>
        <TouchableOpacity style={ globalStyles.fabmenu } onPress={goShareLocation}>
          <MaterialIcons
              name="location-on"
              size={24}
              color="#F1F3F4"
              />
        </TouchableOpacity>
          <Text style={[globalStyles.globotext, globalStyles.buttonText]}>Compartir ubicación</Text>
    </>
  );
};

export default FabVisitor;
