import { KeyboardAvoidingView, TextInput, StyleSheet, View, Text, Platform, TouchableOpacity, ScrollView } from "react-native";
import { useState, useRef } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { globalStyles } from '../../styles/globalStyles.js';
import { COLORS, SIZESFONT } from '../../constants/Theme';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productoSchema } from '../../schemas/registerPetSchema';
import AppBar from '../AppBar/AppBar.js';

const RegisterPet = () => {

  const {
    control,          // Conecta cada campo al formulario
    handleSubmit,     // Envuelve tu función de envío con validación
    formState: { errors, isSubmitting }, // Estado del formulario
    reset             // Limpia el formulario
  } = useForm({
    resolver: zodResolver(productoSchema),
    defaultValues: {
      nombre: '',
      raza: '',
      peso: '',
      color: '',
      fechaNacimiento: new Date().toISOString(),
      microchip: '',
    }
  });

  const razaRef = useRef(null);
  const pesoRef = useRef(null);
  const colorRef = useRef(null);
  const chipRef = useRef(null);

  const onSubmit = async (datos) => {
    try {
      // Aquí se procesarán los datos una vez validada la forma
      console.log("Datos validados:", datos);
    } catch (error) {
      console.error(error);
    }
    reset(); // Limpiar formulario tras guardar
  };

  // Estado para la fecha seleccionada y visibilidad del DateTimePicker
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Función para manejar el cambio de fecha en el DateTimePicker
  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setDate(selectedDate);
      // Actualizar el valor de fecha en el formulario
      control._updateField('fecha', { value: selectedDate });
    }
  };

  // Función para mostrar/ocultar el DateTimePicker al presionar la fecha
  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  return (
    <>
      <AppBar/>
      <KeyboardAvoidingView style={globalStyles.container}>
        <ScrollView>
          <View>
            <Text style={styles.textp}>Registra aquí tu mascota</Text>
          </View>

          {/* Campos del formulario */}
          <Controller
            control={control}
            name="nombre"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.nombre && styles.inputError]}
                placeholder="Nombre de la mascota"
                placeholderTextColor="#BDC1C6"
                onBlur={onBlur}           // Valida al perder el foco
                onChangeText={onChange}
                value={value}
                autoCapitalize="words"
                returnKeyType="next"
                submitBehavior="submit"
                onSubmitEditing={() => razaRef.current.focus()}
              />
            )}
          />
          <Controller
            control={control}
            name="raza"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                ref={razaRef}
                style={[styles.input, errors.raza && styles.inputError]}
                placeholder="Raza"
                placeholderTextColor="#BDC1C6"
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
                autoCapitalize="words"
                returnKeyType="next"
                submitBehavior="submit"
                onSubmitEditing={() => pesoRef.current.focus()}
              />
            )}
          />
          <Controller
                      control={control}
                      name="peso"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          ref={pesoRef}
                          style={[styles.input, errors.peso && styles.inputError]}
                          placeholder="Peso"
                          placeholderTextColor="#BDC1C6"
                          onBlur={onBlur}
                          onChangeText={(text) => {
                            // Asegurar que el valor sea un número o vacío
                            const numericValue = text.replace(/[^0-9]/g, '');
                            onChange(numericValue);
                          }}
                          value={value}
                          keyboardType="numeric"
                          returnKeyType="next"
                          submitBehavior="submit"
                          onSubmitEditing={() => colorRef.current?.focus()}
                        />
                      )}
                    />
          <Controller
            control={control}
            name="color"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                ref={colorRef}
                style={[styles.input, errors.color && styles.inputError]}
                placeholder="Color"
                placeholderTextColor="#BDC1C6"
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
                autoCapitalize="words"
                returnKeyType="next"
                submitBehavior="submit"
                onSubmitEditing={() => chipRef.current.focus()}
              />
            )}
          />
          <Controller
                      control={control}
                      name="microchip"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          ref={chipRef}
                          style={[styles.input, errors.microchip && styles.inputError]}
                          placeholder="Número de Chip"
                          placeholderTextColor="#BDC1C6"
                          onBlur={onBlur}
                          onChangeText={(text) => {
                            // Asegurar que el valor sea un número o vacío
                            const numericValue = text.replace(/[^0-9]/g, '');
                            onChange(numericValue);
                          }}
                          value={value}
                          keyboardType="numeric"
                          returnKeyType="done"
                          onSubmitEditing={() => {}}
                        />
                      )}
                    />
          {/* Selector de fecha */}
          <TouchableOpacity style={styles.dateContainer} onPress={toggleDatePicker}>
            <Text style={styles.dateFormat}>
              📅 {date.toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' })}
            </Text>
          </TouchableOpacity>
          {/* DateTimePicker */}
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
          {/* Mostrar errores de fecha si existen */}
          {errors.fecha && <Text style={styles.errorText}>{errors.fecha.message}</Text>}
          {/* Contenedor del botón para guardar */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={globalStyles.buttonSave}
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                             <Text style={styles.buttonText}>Guardando...</Text>
                           ) : (
                             <Text style={styles.buttonText}>Guardar Mascota 💾</Text>
                           )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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

export default RegisterPet;
