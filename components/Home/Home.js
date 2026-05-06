import { Text, View, StyleSheet } from 'react-native';

const Home = () => {
    return (
        <View>
            <Text style={styles.textp}>
                Este es el home, muajajja
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    textp: {
        color: '#F1F3F4',
    },
});
export default Home