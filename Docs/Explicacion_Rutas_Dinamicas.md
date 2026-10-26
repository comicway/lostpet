# Documentación de Rutas Dinámicas y Navegación con Expo Router

Este documento explica la resolución de los problemas encontrados al implementar la navegación entre la lista de mascotas y su ficha individual utilizando **Expo Router**.

## 1. El Problema Original
Inicialmente, el botón "Ir a la ficha" en `CardHome.js` no enviaba información específica sobre qué mascota se estaba seleccionando:

**Código Antiguo (Incorrecto):**
```javascript
// CardHome.js
const goUserPet = () => {
  router.push('/UserPet/UserPet'); // Navega a una ruta estática sin parámetros
};
```
*   **Problema:** Todas las tarjetas redirigían a la misma vista genérica, sin identificar qué `microchip` correspondía a la mascota seleccionada.

---

## 2. Implementación de Rutas Dinámicas
Para solucionar esto, se implementó una estructura de archivos dinámica: `app/UserPet/[id].js`. El uso de corchetes `[id]` permite que el sistema reconozca una parte de la URL como una variable.

### Paso A: Navegación con Parámetros
Se modificó la función de navegación para incluir el ID único (microchip) en la ruta.

**Código Nuevo (Corregido):**
```javascript
// CardHome.js
const goUserPet = () => {
  // El valor se inserta dinámicamente en la ruta: /UserPet/1234567890
  router.push(`/UserPet/${mascot.microchip}`); 
};
```

---

## 3. Captura de Parámetros en la Vista (View)
Al intentar leer el ID en el archivo `[id].js`, surgió un error porque `router.query` no es la forma adecuada para capturar parámetros definidos en la estructura de carpetas de Expo Router.

**Error Encontrado:**
```javascript
// Error: Cannot read property 'id' of undefined
const { id } = router.query; 
```

### Solución: `useLocalSearchParams`
Para leer variables que forman parte del "path" (como `[id]`), se debe utilizar el hook específico de Expo Router.

**Código Nuevo (Corregido):**
```javascript
// app/UserPet/[id].js
import { useLocalSearchParams } from 'expo-router';

export default function UserPet() {
  // Captura automáticamente "id" desde la URL dinámicamente
  const { id } = useLocalSearchParams(); 

  // Se utiliza el ID para filtrar los datos correctos del MockData
  const pet = mascotasMock.find(p => p.microchip === id);

  if (!pet) return <Text>Mascota no encontrada</Text>;

  return <CardUserPet mascot={pet} />;
}
```

---

## Resumen de Diferencias Técnicas

| Característica | Enfoque Anterior (No recomendado) | Enfoque Actual (Producción) |
| --- | --- | --- |
| **Destino** | Ruta estática: `/UserPet/UserPet` | Ruta dinámica: `/UserPet/[id]` |
| **Método de obtención** | `router.query` (para parámetros tipo `?key=val`) | `useLocalSearchParams()` (para parámetros de ruta) |
| **Identificador** | No existía en la URL | El `microchip` es parte integral de la URL |

## Conclusiones para Producción
1.  **Unicidad:** Siempre usar un ID único (como el microchip) para identificar registros en la base de datos.
2.  **Desacoplamiento:** El componente visual (`CardUserPet`) no debe saber cómo buscar los datos; solo debe recibir el objeto ya preparado y mostrarlo.
3.  **Escalabilidad:** Al usar rutas dinámicas, el mismo archivo `[id].js` sirve para miles de mascotas diferentes, ya que la lógica de búsqueda depende del ID recibido en el parámetro.
