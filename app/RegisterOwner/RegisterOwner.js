import { KeyboardAvoidingView, TextInput, StyleSheet, View, Text, Platform, TouchableOpacity, ScrollView } from "react-native";
import { useState, useRef } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { globalStyles } from '../../styles/globalStyles.js';
import { COLORS, SIZESFONT } from '../../constants/Theme';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productoSchema } from '../../schemas/registerPetSchema';
import AppBar from '../AppBar/AppBar.js';
import FabMenu from '../FabMenu/FabMenu.js';

const RegisterOwner = () => {

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(productoSchema),
    defaultValues: {
      nombre: '',
      apellido: '',
      telefono: '',
      mail: '',
    }
  });

  const apellidoRef = useRef(null);
  const telefonoRef = useRef(null);
  const mailRef = useRef(null);

  const onSubmit = async (datos) => {
    try {
      console.log("Datos validados:", datos);
    } catch (error) {
      console.error(error);
    }
    reset();
  };

  const insets = useSafeAreaInsets();

  return (
    <>
      <View style={[{ paddingTop: insets.top }]}>
        <AppBar />
      </View>
      <KeyboardAvoidingView style={globalStyles.container}>
        <ScrollView>
          <View>
            <Text style={styles.textp}>Registrate</Text>
          </View>

          <Controller
            control={control}
            name="nombre"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.nombre && styles.inputError]}
                placeholder="Nombre"
                placeholderTextColor="#BDC1C6"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="words"
                returnKeyType="next"
                submitBehavior="submit"
                onSubmitEditing={() => apellidoRef.current.focus()}
              />
            )}
          />
          <Controller
            control={control}
            name="apellido"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                ref={apellidoRef}
                style={[styles.input, errors.apellido && styles.inputError]}
                placeholder="Raza"
                placeholderTextColor="#BDC1C6"
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
                autoCapitalize="words"
                returnKeyType="next"
                submitBehavior="submit"
                onSubmitEditing={() => telefonoRef.current.focus()}
              />
            )}
          />
          <Controller
                      control={control}
                      name="telefono"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          ref={telefonoRef}
                          style={[styles.input, errors.telefono && styles.inputError]}
                          placeholder="Teléfono"
                          placeholderTextColor="#BDC1C6"
                          onBlur={onBlur}
                          onChangeText={(text) => {
                            const numericValue = text.replace(/[^0-9]/g, '');
                            onChange(numericValue);
                          }}
                          value={value}
                          keyboardType="numeric"
                          returnKeyType="next"
                          submitBehavior="submit"
                          onSubmitEditing={() => mailRef.current?.focus()}
                        />
                      )}
                    />
          <Controller
            control={control}
            name="mail"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                ref={mailRef}
                style={[styles.input, errors.mail && styles.inputError]}
                placeholder="Correo"
                placeholderTextColor="#BDC1C6"
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
                autoCapitalize="words"
                returnKeyType="next"
                submitBehavior="submit"
              />
            )}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={globalStyles.buttonSave}
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                             <Text style={styles.buttonText}>Guardando...</Text>
                           ) : (
                             <Text style={styles.buttonText}>Guardar 💾</Text>
                           )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <FabMenu />
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: 20, // Espaciado vertical
    paddingHorizontal: 15, // Espaciado horizontal
    alignItems: 'center', // Centrar el botón horizontalmente
    width: '100%', // Ajustar el ancho del contenedor al 100% de su padre
    justifyContent: 'center', // Centra los elementos hijos verticalmente
  },
  inputBox: {
    paddingVertical: 15,
    alignItems: 'center',
    width: '100%'
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
    color: COLORS.placeholder,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginVertical: 8,
    fontSize: SIZESFONT.bodyMedium, // Usar una fuente más clara si está definida
  },
  textp: {
    color: COLORS.font,
    fontSize: SIZESFONT.paragraph,
    marginBottom: 10, // Espacio adicional entre el título y los inputs
  },
  dateContainer: {
    backgroundColor: COLORS.background,
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row', // Alinear texto y icono
    overflow: 'hidden', // Para evitar que se salga el texto del contenedor en iOS
  },
  dateFormat: {
    color: COLORS.font,
    fontSize: SIZESFONT.bodyMedium, // Usar una fuente más clara si está definida
    marginLeft: 8, // Espacio entre el icono y el texto
  },
  inputError: {
    borderColor: '#ff0000', // Estilo para campos con errores
  },
  errorText: {
    color: '#ff0000',
    fontSize: SIZESFONT.bodySmall,
    marginTop: 8, // Espacio entre el campo y el mensaje de error
    textAlign: 'center',
  }
});

export default RegisterOwner;
