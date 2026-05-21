import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#202124'
    },

    cardHome: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#1B1C1E',
        borderRadius: 6,
        height: 200,
        borderColor: '#37393A',
        borderWidth: 1
    },
    buttonRegister: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    }
});   