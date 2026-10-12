# Explicación del Layout Grid en CodeQR (React Native / React Native Web)

Este documento detalla la solución al problema por el cual las tarjetas `cardQR` no se mostraban una al lado de la otra (en cuadrícula de 2 columnas) en las plataformas Web y Android Studio. También explica las mejores prácticas en el uso del componente `ScrollView`.

---

## 1. Análisis Detallado del Problema

### El Desbordamiento del Ancho (Overflow en Flexbox)

El diseño utilizaba la regla CSS/Flexbox `flexWrap: 'wrap'` en el contenedor para permitir colocar tarjetas lado a lado. Sin embargo, las tarjetas no cabían en una sola fila debido al siguiente cálculo matemático de espacios:

#### Código del problema:
```javascript
innerContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  paddingHorizontal: 5, // 5px a la izquierda + 5px a la derecha = 10px total
},
cardQR: {
  maxWidth: '48%',
  margin: 5, // 5px a la izquierda + 5px a la derecha = 10px por tarjeta
}
```

#### El cálculo en una pantalla móvil estándar (ej. Android 360px de ancho):
1. **Espacio disponible**: `360px - 10px (paddingHorizontal) = 350px`.
2. **Ancho de Tarjeta 1**: `48% de 350px (168px) + 10px (margin) = 178px`.
3. **Ancho de Tarjeta 2**: `48% de 350px (168px) + 10px (margin) = 178px`.
4. **Suma de 2 Tarjetas**: `178px + 178px = 356px`.

Dado que `356px` es mayor que los `350px` disponibles en la pantalla, el motor de layout (Yoga) determina que **ambas tarjetas no caben juntas**, forzando a `flexWrap: 'wrap'` a mover la segunda tarjeta a una nueva fila hacia abajo.

### La diferencia entre `maxWidth` y `width`
Usar `maxWidth: '48%'` sin definir `width: '48%'` o `flexBasis: '48%'` hace que el ancho sea reactivo al contenido interno (`auto`). En tarjetas con textos largos (ej. *"San Pablo 4025 Quinta Normal"*), las tarjetas se expandían hasta su máximo permitido, provocando que la suma del ancho + márgenes rompiera la fila.

---

## 2. Explicación de `ScrollView` y sus Propiedades

En el archivo `CodeQR.js` se implementó la siguiente estructura:

```jsx
<ScrollView contentContainerStyle={globalStyles.innerContainer} showsVerticalScrollIndicator={false}>
  <View style={globalStyles.cardQR}>...</View>
  <View style={globalStyles.cardQR}>...</View>
</ScrollView>
```

### ¿Por qué utilizar `contentContainerStyle`?

En React Native, el componente `<ScrollView>` consta de dos capas:
1. **El contenedor exterior (Marco / viewport)**: Se controla mediante el prop `style`.
2. **El contenedor interior (Content Container)**: Se controla mediante el prop `contentContainerStyle`. Es el `<View>` real que envuelve a todos los elementos hijos scrolleables.

Si se asignan reglas de layout cuadrícula (como `flexDirection: 'row'`, `flexWrap: 'wrap'` o `justifyContent: 'space-between'`) a la propiedad `style` de un `<ScrollView>` o a un `<View>` interno sin configurar el `contentContainerStyle`, el scroll no calcula correctamente el alto/ancho del contenido y el envoltorio interno falla al posicionar las columnas.

Al usar `contentContainerStyle={globalStyles.innerContainer}`, le ordenamos directamente al contenedor interno de desplazamiento que organice los elementos hijos en filas wrapping y distribuya el espacio uniformemente.

### ¿Qué hace `showsVerticalScrollIndicator={false}`?

Esta propiedad desactiva visualmente la barra de desplazamiento vertical (*scrollbar*) en Android, iOS y Web:
- **Mejora UI/UX**: Mantiene una interfaz limpia sin barras grises o negras que distraigan en la pantalla.
- **Comportamiento táctil intacto**: El usuario puede seguir desplazando el contenido con el dedo (o rueda del mouse) normalmente; únicamente se oculta el indicador visual.

---

## 3. Ejemplo Real de Código (Antes vs. Después)

### ❌ Código Anterior (Incorrecto)

**`styles/globalStyles.js`**
```javascript
innerContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  paddingHorizontal: 5,
},
cardQR: {
  maxWidth: '48%', // ⚠️ No garantiza ancho uniforme y el margin rompe la fila
  backgroundColor: '#1B1C1E',
  borderRadius: 6,
  borderColor: '#37393A',
  borderWidth: 1,
  paddingBottom: 20,
  margin: 5, // ⚠️ 10px laterales extra que causaban desbordamiento
},
```

**`app/CodeQR/CodeQR.js`**
```jsx
// ⚠️ ScrollView envolviendo un View interno sin contentContainerStyle
<View style={globalStyles.containerQR}>
  <ScrollView>
    <View style={globalStyles.innerContainer}>
      <View style={globalStyles.cardQR}>...</View>
      <View style={globalStyles.cardQR}>...</View>
    </View>
  </ScrollView>
</View>
```

---

### ✅ Código Corregido (Solución)

**`styles/globalStyles.js`**
```javascript
containerQR: {
  flex: 1,
  paddingTop: 10,
  paddingBottom: 10,
  paddingHorizontal: 10, // Padding controlado en el contenedor raíz
  backgroundColor: '#202124',
},
innerContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  paddingBottom: 20,
},
cardQR: {
  width: '48%', // ✅ Cada tarjeta ocupa exactamente el 48% (48% + 48% = 96%)
  backgroundColor: '#1B1C1E',
  borderRadius: 6,
  borderColor: '#37393A',
  borderWidth: 1,
  paddingBottom: 15,
  marginBottom: 15, // Espaciado vertical entre filas
  overflow: 'hidden', // Recorta bordes superiores de la imagen
},
petLocationsQR: {
  paddingHorizontal: 12,
  paddingTop: 8,
},
```

**`app/CodeQR/CodeQR.js`**
```jsx
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import AppBar from '../AppBar/AppBar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { globalStyles } from '../../styles/globalStyles';
import { Image as ExpoImage } from 'expo-image';
import FabMenu from '../FabMenu/FabMenu';

const CodeQR = () => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <View style={[{ paddingTop: insets.top }]}>
        <AppBar />
      </View>
      <View style={globalStyles.containerQR}>
        {/* ✅ ScrollView con contentContainerStyle y sin indicador visible */}
        <ScrollView 
          contentContainerStyle={globalStyles.innerContainer} 
          showsVerticalScrollIndicator={false}
        >
          <View style={globalStyles.cardQR}>
            <View style={globalStyles.mapLocation}>
              <ExpoImage
                source={require('../../assets/emma.png')}
                style={styles.img}
                contentFit='cover'
                transition={1000}
                cachePolicy='memory-disk'
              />
            </View>
            <View style={globalStyles.petLocationsQR}>
              <Text style={globalStyles.textpH1}>Emma</Text>
              <Text style={globalStyles.textp}>San Pablo 4025 Quinta Normal</Text>
            </View>
          </View>

          <View style={globalStyles.cardQR}>
            <View style={globalStyles.mapLocation}>
              <ExpoImage
                source={require('../../assets/emma.png')}
                style={styles.img}
                contentFit='cover'
                transition={1000}
                cachePolicy='memory-disk'
              />
            </View>
            <View style={globalStyles.petLocationsQR}>
              <Text style={globalStyles.textpH1}>Emma</Text>
              <Text style={globalStyles.textp}>San Pablo 4025 Quinta Normal</Text>
            </View>
          </View>
        </ScrollView>
      </View>
      <FabMenu />
    </>
  );
};

export default CodeQR;

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: 120,
  },
});
```

---

## 4. Resumen de Beneficios

1. **Compatibilidad total**: Funciona perfectamente en Web, Android Studio (emulador/dispositivo real) e iOS.
2. **Diseño Adaptable (Responsive)**: Las tarjetas mantienen la proporción de 2 columnas independientemente de la resolución de la pantalla.
3. **Desplazamiento Limpio**: El uso de `contentContainerStyle` optimiza el rendimiento del desplazamiento y `showsVerticalScrollIndicator={false}` brinda un acabado visual pulido.
