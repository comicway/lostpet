import { View, StyleSheet, Text } from "react-native";
import { COLORS, SIZESFONT } from '../../constants/Theme';
import { MaterialIcons } from '@expo/vector-icons';

const FabMenu = () => {
  return (
    <>
      <View style={ styles.fabmenu } onPress={() => navigation.goBack()}>
        <MaterialIcons
            name="add"
            size={24}
            color="#F1F3F4"
            />
      </View>
      <View style={ styles.fabclose } onPress={() => navigation.goBack()}>
        <MaterialIcons
            name="close"
            size={24}
            color="#F1F3F4"
            />
      </View>
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
    bottom: 56,
    left: 16,
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
});
