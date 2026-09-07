import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const registerPetSchema = zod.object({
  nombre: zod.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  raza: zod.string().min(2, 'La raza debe tener al menos 2 caracteres'),
  peso: zod.number().positive('El peso debe ser un número positivo').optional(),
  color: zod.string().nonempty('El color es requerido'),
  fecha: zod.date({ required_error: 'La fecha es obligatoria' }),
  microchip: zod.string().length(15, 'El microchip debe tener exactamente 15 caracteres').optional(),
});

type RegisterPetForm = zod.infer<typeof registerPetSchema>;

const RegisterPetV2 = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Función para manejar el cambio de fecha en el DateTimePicker
  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios' ? false : true);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const { control, handleSubmit, formState: { errors } } = useForm<RegisterPetForm>({
    resolver: zodResolver(registerPetSchema),
    defaultValues: {
      nombre: '',
      raza: '',
      peso: undefined,
      color: '',
      fecha: new Date(),
      microchip: '',
    },
  });

  const onSubmit: SubmitHandler<RegisterPetForm> = (data) => {
    console.log('Datos del formulario:', data);
    // Aquí puedes enviar los datos a tu API o realizar alguna otra acción
  };

  return (
    <View style={styles.container}>
      {/* Campo de Nombre */}
      <Controller
        control={control}
        name="nombre"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.nombre && styles.inputError]}
            placeholder="Nombre"
            placeholderTextColor="#BDC1C6"
            onChangeText={onChange}
            value={value}
            returnKeyType="next"
            onSubmitEditing={() => {
              // Implementa el salto al siguiente campo si es necesario
            }}
          />
        )}
      />
      {errors.nombre && <Text style={styles.errorText}>{errors.nombre.message}</Text>}

      {/* Campo de Raza */}
      <Controller
        control={control}
        name="raza"
        render={({ field: { onChange, value } }) => (
          <TextInput
            ref={null} // Aquí puedes asignar una referencia si es necesario
            style={[styles.input, errors.raza && styles.inputError]}
            placeholder="Raza"
            placeholderTextColor="#BDC1C6"
            onChangeText={onChange}
            value={value}
            returnKeyType="next"
            onSubmitEditing={() => {
              // Implementa el salto al siguiente campo si es necesario
            }}
          />
        )}
      />
      {errors.raza && <Text style={styles.errorText}>{errors.raza.message}</Text>}

      {/* Campo de Color */}
      <Controller
        control={control}
        name="color"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.color && styles.inputError]}
            placeholder="Color"
            placeholderTextColor="#BDC1C6"
            onChangeText={onChange}
            value={value}
            returnKeyType="next"
            onSubmitEditing={() => {
              // Implementa el salto al siguiente campo si es necesario
            }}
          />
        )}
      />
      {errors.color && <Text style={styles.errorText}>{errors.color.message}</Text>}

      {/* Campo de Fecha */}
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text style={[styles.textp, errors.fecha && styles.inputError]}>
          📅 {date.toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' })}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      {errors.fecha && <Text style={styles.errorText}>{errors.fecha.message}</Text>}

      {/* Botón de Enviar */}
      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Registrar Mascota</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 8,
    marginBottom: 8,
    borderRadius: 4,
    height: 40,
  },
  inputError: {
    borderColor: 'red',
  },
  textp: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonText: {
    backgroundColor: '#2193b0',
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    textAlign: 'center',
    borderRadius: 4,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
});

export default RegisterPetV2;
