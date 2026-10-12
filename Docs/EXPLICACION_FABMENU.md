# Explicación del Problema de Renderizado en FabMenu (React Native / React Native Web)

Este documento explica en detalle por qué el menú flotante (`FabMenu`) no mostraba sus elementos desplegables al hacer clic en el botón de agregar (`+`), y cómo el **orden de los componentes en el árbol JSX** afecta la visibilidad y el apilamiento de capas (*Stacking Context*).

---

## 1. Descripción del Problema

Al presionar el botón `+` (`FabMenu`), la variable de estado `closefab` se actualizaba correctamente a `true`. Sin embargo, los elementos del menú desplegable (`Agregar Mascota`, `Ver Código Qr`, `Ubicaciones recientes`) **no aparecían en la pantalla**.

---

## 2. Causa Raíz: Orden de Renderizado y Stacking Context

Tanto en React Native como en React Native Web (ejecutado en el navegador), los elementos visuales se dibujan en la pantalla **en el mismo orden en que están declarados en el código JSX**:

1. Los componentes que se escriben **primero** se dibujan en la capa del fondo.
2. Los componentes que se escriben **después** se dibujan en las capas superiores.
3. Si un componente dibujado después tiene un estilo con color de fondo sólido (`backgroundColor`), este cubrirá y tapará por completo a los componentes absolutos renderizados previamente.

### ¿Qué estaba sucediendo?

En el archivo `app/index.js`, el componente `<FabMenu />` estaba ubicado **al principio** del fragmento JSX:

```jsx
// ❌ ANTES (Incorrecto)
return (
  <>
    <FabMenu /> {/* Se renderiza primero (al fondo) */}
    <View style={[{ paddingTop: insets.top }]}>
      <AppBar />
    </View>
    <View style={globalStyles.container}> {/* Se renderiza después y cubre todo con #202124 */}
      ...
    </View>
  </>
);
```

Dado que `<View style={globalStyles.container}>` se declara **después** de `<FabMenu />` y ocupa todo el espacio con `flex: 1` y un fondo oscuro (`backgroundColor: '#202124'`), el navegador dibujaba este contenedor principal **por encima de los elementos desplegables de FabMenu**, ocultándolos detrás del fondo.

---

## 3. Ejemplo Real de Código (Antes vs. Después)

### ❌ Código Anterior (Con Error)

**`app/index.js`**
```jsx
import { View, StyleSheet, Button } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import AppBar from "./AppBar/AppBar";
import FabMenu from "./FabMenu/FabMenu";

const HomePet = () => {
  return (
    <>
      {/* ⚠️ INCORRECTO: FabMenu está arriba del contenedor principal */}
      <FabMenu />
      
      <View style={[{ paddingTop: insets.top }]}>
        <AppBar />
      </View>
      
      <View style={globalStyles.container}>
        {/* Contenido de la pantalla con backgroundColor: '#202124' */}
      </View>
    </>
  );
};
```

---

### ✅ Código Corregido (Solución)

**`app/index.js`**
```jsx
import { View, StyleSheet, Button } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import AppBar from "./AppBar/AppBar";
import FabMenu from "./FabMenu/FabMenu";

const HomePet = () => {
  return (
    <>
      <View style={[{ paddingTop: insets.top }]}>
        <AppBar />
      </View>
      
      <View style={globalStyles.container}>
        {/* Contenido de la pantalla */}
      </View>

      {/* ✅ CORRECTO: FabMenu está al final para renderizarse en la capa superior */}
      <FabMenu />
    </>
  );
};
```

**`app/FabMenu/FabMenu.js`**
```jsx
import { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS } from '../../constants/Theme';
import { globalStyles } from "../../styles/globalStyles";
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const FabMenu = () => {
  const [closefab, setClosefab] = useState(false);
  const router = useRouter();

  function handleFab() {
    setClosefab(!closefab);
  }

  const goRegisterPet = () => {
    router.push('/register/registerPet');
  };

  return (
    <>
      <TouchableOpacity style={styles.fabmenu} onPress={handleFab}>
        <MaterialIcons name="add" size={24} color="#F1F3F4" />
      </TouchableOpacity>
      
      <Text style={[styles.globotext, globalStyles.buttonText]}>
        ¡Agrega aquí a tu mascota!
      </Text>

      {closefab && (
        // ✅ El contenedor absolute ocupa los bordes adecuados y define zIndex
        <View style={styles.menuOverlay}>
          <TouchableOpacity style={[styles.menuitem, { bottom: 100 }]} onPress={goRegisterPet}>
            <Text style={globalStyles.buttonText}>Agregar Mascota</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.menuitem, { bottom: 160 }]} onPress={() => router.back()}>
            <Text style={globalStyles.buttonText}>Ver Código Qr</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.menuitem, { bottom: 220 }]} onPress={() => router.back()}>
            <Text style={globalStyles.buttonText}>Ubicaciones recientes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.fabclose} onPress={handleFab}>
            <MaterialIcons name="close" size={24} color="#F1F3F4" />
          </TouchableOpacity>
        </View>
      )}
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
    zIndex: 10,
  },
  menuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9,
  },
  menuitem: {
    height: 56,
    position: 'absolute',
    right: 16,
    paddingHorizontal: 24,
    backgroundColor: COLORS.secundaryButton,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  fabclose: {
    height: 56,
    width: 56,
    backgroundColor: COLORS.black,
    position: 'absolute',
    bottom: 40,
    right: 16,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  globotext: {
    position: 'absolute',
    bottom: 46,
    right: 105,
    zIndex: 10,
  },
});
```

---

## 4. Buenas Prácticas para Componentes Flotantes (FAB, Modales, Tooltips)

1. **Ubicación en el árbol JSX**: Los elementos emergentes o flotantes siempre deben posicionarse al final de la estructura JSX del componente padre para asegurar que queden por encima del resto del contenido.
2. **Definición de bordes absolutos**: Cuando se use `position: 'absolute'` en un contenedor padre, se deben definir `top: 0, left: 0, right: 0, bottom: 0` (o usar `StyleSheet.absoluteFillObject`) para que los valores de `bottom` / `right` de los hijos se calculen respecto a toda la ventana de la aplicación.
3. **Control de `zIndex`**: Asegurar que tanto el contenedor superpuesto como sus botones tengan un nivel de propiedad `zIndex` superior al de las vistas con fondos oscuros o tarjetas superiores.
