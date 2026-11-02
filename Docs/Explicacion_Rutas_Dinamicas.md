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

---

## Concepto: Expo Router
Expo Router es una capa de abstracción sobre React Navigation diseñada específicamente para proyectos creados con Expo. Simplifica la definición de rutas al usar la estructura de archivos y provee hooks como `useLocalSearchParams` o `router.push` para manejar navegación sin necesidad de escribir manualmente configuraciones.

**Analogía:** Puedes pensar en Expo Router como un **autobús que recorre las calles** de tu aplicación. Cada ruta es una parada y la estructura de archivos determina el itinerario. En lugar de pedirle al autobús a dónde ir con instrucciones complejas, simplemente escribes una parada (`/UserPet/[id]`) y el autobús sabe automáticamente que debe cargar los datos correspondientes.

**Ejemplo corto:**
```javascript
// app/Profile/index.js – vista estática
export default function Profile() {
  return <Text>Perfil del usuario</Text>;
}
```
Navegar a ella:
```javascript
import { router } from 'expo-router';
router.push('/Profile'); // Navega a /app/Profile/index.js
```
---

## Concepto: Los corchetes `[ ]` en la estructura dinámica
Los corchetes indican que el segmento de la ruta es **dinámico**. En `app/UserPet/[id].js`, cualquier valor colocado después de `/UserPet/` será capturado como la variable `id`.

**Analogía:** Imagina una carpeta con un nombre marcado como `{nombre}`; cada vez que creas una subcarpeta (`/John`, `/Maria`) se adapta el mismo esquema, pero con datos diferentes.

**Ejemplo de ruta dinámica:**
```
app/
 └─ UserPet/
     ├─ [id].js   ← capturará cualquier id (ej. 123, abc)
     └─ index.js  ← vista genérica sin parámetro
```
Al acceder a `/UserPet/9876543210`, `useLocalSearchParams()` devuelve `{ id: '9876543210' }`.
---

## Concepto: Parámetros (query y local)
En Expo Router, **los parámetros de ruta** (`[id]`) se obtienen con `useLocalSearchParams()`. Si necesitas enviar datos adicionales sin alteraciones en la URL, puedes usar los **parámetros de búsqueda** (query) con el hook `useSearchParams()`.

**Analogía:** Los parámetros de ruta son como una dirección postal completa (`/UserPet/123`), mientras que los query son adjetivos opcionales añadidos al final (`?ref=home`).

**Ejemplo:**
```javascript
// Navegación con query
router.push({ pathname: '/UserPet/123', params: { ref: 'home' } });
```
En el componente:
```javascript
import { useSearchParams } from 'expo-router';
const { ref } = useSearchParams(); // ref == 'home'
```
---

## Concepto: Navegación con Parámetros
Navegar pasando datos de forma explícita puede hacerse en dos modos:
1️⃣ **Path Parameters** – se añaden al “camino” (`/UserPet/${id}`) y se recuperan con `useLocalSearchParams()`. 2️⃣ **Query Parameters** – se adjuntan después del signo ? (`?ref=home`) y se acceden con `router.query` o `useSearchParams()`.

Analogía: 
- Path → dirección completa de una casa.  
- Query → etiqueta extra que pones en la caja antes de enviarla.

Ejemplo rápido:
```javascript
// Navegar a un perfil con ID y referencia desde Home
router.push({
  pathname: '/UserPet/123',
  params: { ref: 'home' } // query
});
```
## Concepto: router.query
`router.query` devuelve los **query string** (los parámetros después de `?`) de la URL actual.  En rutas dinámicas, intentar usarlo para leer `[id]` no funciona porque ese valor forma parte del path, no del query.

Analogía: Si tu casa es `/UserPet/123`, el número 123 está en la dirección; los detalles que puedas añadir después con `?ref=home` son extras que puedes leer con `router.query`.

Ejemplo:
```javascript
// En cualquier pantalla
import { router } from 'expo-router';

const goHome = () => {
  router.push({
    pathname: '/UserPet/123',
    params: { ref: 'home' }
  });
};

// Dentro de la misma pantalla, leer el query
const refFromQuery = router.query.ref; // 'home'
```
## Concepto: useLocalSearchParams
Hook especializado que extrae los **parámetros de ruta** definidos con corchetes en la estructura de archivos (`[id].js`).  Es el equivalente a `react-router`’s `useParams`.

Analogía: Cuando entras en una casa, las habitaciones están marcadas por números; al llegar te dicen “entra a la habitación 123” y tú ya sabes que tu número es 123 sin necesidad de preguntar.

Ejemplo:
```javascript
// app/UserPet/[id].js
import { useLocalSearchParams } from 'expo-router';

export default function UserPet() {
  const { id } = useLocalSearchParams(); // id = '123'
  
  return <Text>Detalles de mascota con microchip {id}</Text>;
}
```
---