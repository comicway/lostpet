import { StyleSheet, View, Text } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { COLORS, SIZESFONT } from '../../constants/Theme';
import { MaterialIcons } from '@expo/vector-icons';

const AppBar = () => {
  return (
      <>
        <View style={styles.topbar}>
          <MaterialIcons name="arrow-back" size={24} color="#F1F3F4" />
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
