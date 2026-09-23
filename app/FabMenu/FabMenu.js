import { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS, SIZESFONT } from '../../constants/Theme';
import { globalStyles } from "../../styles/globalStyles";
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'

const FabMenu = () => {

  const [closefab, setClosefab] = useState(false);

  function handleFab() {
    setClosefab(!closefab);
  }

  const router = useRouter();

  const goRegisterPet = () => {

      router.push('/register/registerPet')

  };

  return (
    <>
      {closefab == false && (<View style={{ position: 'absolute', bottom: 0, right: 0, left: 0, top: 0 }}>
        <TouchableOpacity style={ globalStyles.fabmenu } onPress={() => handleFab()}>
          <MaterialIcons
              name="add"
              size={24}
              color="#F1F3F4"
              />
        </TouchableOpacity>
          <Text style={[globalStyles.globotext, globalStyles.buttonText]}>¡Agrega aquí a tu mascota!</Text>
      </View>
      )}
      {closefab && (<View style={{ position: 'absolute', bottom: 0, right: 0, left: 0, top: 0 }}>
        <TouchableOpacity
          style={[globalStyles.menuitem, { bottom: 100 }]} onPress={goRegisterPet}>
          <Text style={globalStyles.buttonText}>Agregar Mascota</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[globalStyles.menuitem, { bottom: 160 }]} onPress={() => handleFab()}>
          <Text style={globalStyles.buttonText}>Ver Código Qr</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[globalStyles.menuitem, { bottom: 220 }]} onPress={() => handleFab()}>
          <Text style={globalStyles.buttonText}>Ubicaciones recientes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={globalStyles.fabclose} onPress={() => handleFab()}>
          <MaterialIcons
            name="close"
            size={24}
            color="#F1F3F4"
          />
        </TouchableOpacity>
      </View>
      )}
    </>
  );
};

export default FabMenu;
