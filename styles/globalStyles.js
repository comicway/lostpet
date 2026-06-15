import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 50,
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
        bottom: 50, /* Aqui es 20 tambien, con 50 se puede dar click al boton */
        left: 20,
        right: 20,
        backgroundColor: '#37393A',
    },
    buttonSave: {
        height: 50,
        backgroundColor: '#37393A',
        borderRadius: 8,
        paddingHorizontal: 15,
        width: '100%',
        justifyContent: 'center', // Centra verticalmente
        alignItems: 'center' // Centra horizontalmente
    }
});   