import { StyleSheet, View, Text } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { COLORS, SIZESFONT } from '../../constants/Theme';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

const AppBar = () => {

  const navigation = useNavigation();
  // Determina si hay una pantalla previa en la pila
  const canGoBack = navigation.canGoBack();

  return (
      <>
      <View style={styles.topbar}>
        {canGoBack && (
          <MaterialIcons onPress={() => navigation.goBack()} name="arrow-back" size={24} color="#F1F3F4" />
          )}
          <Text style={globalStyles.buttonText}>Titulo</Text>
          <MaterialIcons name="more-vert" size={24} color="#F1F3F4" />
        </View>
      </>
  )
};

const styles = StyleSheet.create({
  topbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 64,
    paddingHorizontal: 4,
    backgroundColor: COLORS.background,
  },
});

export default AppBar;
