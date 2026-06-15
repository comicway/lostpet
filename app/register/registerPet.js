import { Button, KeyboardAvoidingView, TextInput, StyleSheet, View, Text, Platform, TouchableOpacity, ScrollView } from "react-native";
import { useState, useRef } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { globalStyles } from '../../styles/globalStyles.js';
import { COLORS, SIZESFONT } from '../../constants/Theme';

const RegisterPet = ({ onGuardar }) => {

  const [form, setForm] = useState({
    nombre: '',
    raza: '',
    peso: '',
    color: '',
    fecha: new Date(),
    microchip: ''
  });

  const [showPicker, setShowPicker] = useState(false);

  const changeDate = (event, datechoice) => {

    if (Platform.OS === 'android') {
      setShowPicker(false);
    }

    if (event.type === 'set' && datechoice) {
      setForm(prev => ({ ...prev, fecha: datechoice }));
    } else if (event.type === 'dismissed') {
      setShowPicker(false);
    }
  };

  const fechaFormateada = form.fecha.toLocaleDateString('es-CL', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  const actualizar = (campo, valor) => setForm(prev => ({ ...prev, [campo]: valor }));

  const razaRef = useRef(null);
  const pesoRef = useRef(null);
  const colorRef = useRef(null);
  const chipRef = useRef(null);

  const handleGuardar = () => {
    // Convertir peso a número antes de enviar
    const datos = {
      ...form,
      // peso: parseFloat(form.precio) || 0,
    };
    onGuardar(datos);
  };

  return (
    <>
      <KeyboardAvoidingView style={globalStyles.container}>
        <ScrollView>
          <View>
            <Text style={styles.textp}>Registra aqui tu mascota</Text>
          </View>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholder="Nombre de la mascota"
              placeholderTextColor="#BDC1C6"
              value={form.nombre}
              onChangeText={(v) => actualizar('nombre', v)}
              autoCapitalize="words"
              returnKeyType="next"
              submitBehavior="submit"
              onSubmitEditing={() => razaRef.current.focus()}
            />
            <TextInput
              ref={razaRef}
              style={styles.input}
              placeholder="Raza"
              placeholderTextColor="#BDC1C6"
              value={form.raza}
              onChangeText={(v) => actualizar('raza', v)}
              autoCapitalize="words"
              returnKeyType="next"
              submitBehavior="submit"
              onSubmitEditing={() => pesoRef.current.focus()}
            />
            <TextInput
              ref={pesoRef}
              style={styles.input}
              placeholder="Peso"
              placeholderTextColor="#BDC1C6"
              value={form.peso}
              onChangeText={(v) => actualizar('peso', v)}
              keyboardType="decimal-pad"
              returnKeyType="next"
              submitBehavior="submit"
              onSubmitEditing={() => colorRef.current.focus()}
            />
            <TextInput
              ref={colorRef}
              style={styles.input}
              placeholder="Color"
              placeholderTextColor="#BDC1C6"
              value={form.color}
              onChangeText={(v) => actualizar('color', v)}
              autoCapitalize="words"
              returnKeyType="next"
              submitBehavior="submit"
              onSubmitEditing={() => chipRef.current.focus()}
            />
            <TextInput
              ref={chipRef}
              style={styles.input}
              placeholder="Numero de Chip"
              placeholderTextColor="#BDC1C6"
              value={form.microchip}
              onChangeText={(v) => actualizar('microchip', v)}
              keyboardType="decimal-pad"
              submitBehavior="blurAndSubmit"
              returnKeyType="done"
              onSubmitEditing={() => setShowPicker(true)}
            />
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowPicker(true)}
            >
              <Text style={styles.textp}>📅 {fechaFormateada}</Text>
            </TouchableOpacity>
            {showPicker && (
              <DateTimePicker
                value={form.fecha}
                mode="date"
                display="default"
                onChange={changeDate}
              />
            )}
          </View>
          <TouchableOpacity style={globalStyles.buttonSave} onPress={handleGuardar}>
            <Text style={styles.textp}>Guardar Mascota 💾</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  )
}

const styles = StyleSheet.create({
  inputBox: {
    /* flexDirection: 'row',  para que quede en columnas*/
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
    fontSize: 16,
    width: '100%'
  },
  textp: {
    color: COLORS.font,
    fontSize: SIZESFONT.paragraph,
  }
});

export default RegisterPet