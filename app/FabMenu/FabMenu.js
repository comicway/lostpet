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
    console.log(closefab);
  }

  const router = useRouter();

  const goRegisterPet = () => {

      router.push('/register/registerPet')

  };

  return (
    <>
      {closefab == false && (<View style={{ position: 'absolute', bottom: 0, right: 0, left: 0, top: 0 }}>
        <TouchableOpacity style={ styles.fabmenu } onPress={() => handleFab()}>
          <MaterialIcons
              name="add"
              size={24}
              color="#F1F3F4"
              />
        </TouchableOpacity>
          <Text style={[styles.globotext, globalStyles.buttonText]}>¡Agrega aquí a tu mascota!</Text>
      </View>
      )}
      {closefab && (<View style={{ position: 'absolute', bottom: 0, right: 0, left: 0, top: 0 }}>
        <TouchableOpacity
          style={[styles.menuitem, { bottom: 100 }]} onPress={goRegisterPet}>
          <Text style={globalStyles.buttonText}>Agregar Mascota</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.menuitem, { bottom: 160 }]} onPress={() => handleFab()}>
          <Text style={globalStyles.buttonText}>Ver Código Qr</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.menuitem, { bottom: 220 }]} onPress={() => handleFab()}>
          <Text style={globalStyles.buttonText}>Ubicaciones recientes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.fabclose} onPress={() => handleFab()}>
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

const styles = StyleSheet.create({
  fabmenu: {
    height: 80,
    width: 80,
    backgroundColor: COLORS.secundaryButton,
    position: 'absolute',
    bottom: 16,
    right: 16,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabclose: {
    height: 56,
    width: 56,
    backgroundColor: COLORS.black,
    position: 'absolute',
    bottom: 40,
    right: 16,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  menuitem: {
    height: 56,
    position: 'absolute',
    right: 16,
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: COLORS.secundaryButton,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  globotext: {
    position: 'absolute',
    bottom: 46,
    right: 105,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
