import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './components/Home/Home';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.textp}>¡Bienvenido a LostPet!</Text>
      <Home />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202124',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textp: {
    color: '#F1F3F4',
  },
});
