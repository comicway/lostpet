# Explicación del Mapeo de Mascotas y Flujo de Datos

Este documento describe cómo se estructuró el flujo de datos entre usuarios, mascotas y sus fichas en la aplicación. Por ahora los datos son de prueba (`MockData.json`): todavía no hay login ni servidor.

## 1. El desafío del diseño

El objetivo era mostrar una lista de mascotas en la pantalla principal (`index.js`) y, al elegir una, navegar a una ficha detallada con los datos de la mascota y los del dueño al que pertenece.

Para resolverlo, los datos se estructuraron de forma anidada: **Dueño → Lista de mascotas**.

```javascript
// Esquema simplificado (los nombres exactos pueden variar en tu JSON)
[
  {
    userId: "1234",
    // ...datos del dueño (nombre, teléfono, email)
    pets: [
      { microchip: "...", nombre: "...", raza: "..." },
    ],
  },
]
```

## 2. El motor de selección: `index.js`

En la pantalla principal se usa `.map()` para convertir los datos del JSON en componentes visuales:

```javascript
mascotasMock[0].pets.map((pet) => (
  <CardHome key={pet.microchip} mascot={pet} />
))
```

**Explicación paso a paso:**

1. **`mascotasMock`**: es el array de usuarios del archivo `MockData.json`.
2. **`[0]`**: toma el primer usuario. Como todavía no hay login, la app "decide" que el usuario actual es el primero de la lista.
3. **`.pets`**: entra a la propiedad de ese usuario que contiene el array de sus mascotas.
4. **`.map()`**: recorre cada mascota de esa lista y devuelve un componente por cada una.
5. **`<CardHome ... />`**: genera una tarjeta pasando el objeto `pet` completo como prop (`mascot`).
6. **`key={pet.microchip}`**: React usa la `key` para reconocer cada elemento entre un renderizado y otro.

**Sobre la `key`:** usar el índice (`key={index}`) funciona mientras la lista no cambie, pero si se reordena, se agrega o se borra una mascota, React puede mezclar los datos de una tarjeta con otra. Por eso conviene una clave **única y estable**: el microchip.

---

## 3. Visualización de la tarjeta: `CardHome.js`

Cada tarjeta de la pantalla inicial es el resultado del mapeo anterior.

* **Acceso a datos:** el componente recibe `mascot`. Con `mascot.nombre` o `mascot.raza` se extrae información del objeto de esa mascota específica.
* **Navegación dinámica:** se usa el microchip para construir la ruta:

```javascript
router.push(`/UserPet/${mascot.microchip}`);
```

---

## 4. Recuperación y relación en `[id].js`

Al pulsar "Ir a la ficha", la pantalla recibe el microchip por la URL. Aquí se reconstruye el contexto:

```javascript
const { id } = useLocalSearchParams();

const usuario = mascotasMock.find((u) => u.userId === "1234");
const pet = usuario?.pets.find((p) => p.microchip === id);
```

1. **Identificar al dueño (`usuario`):** se busca con `.find()` el usuario cuyo `userId` es `"1234"`.
2. **Filtrar la mascota (`pet`):** dentro de ese usuario, se busca la mascota con el microchip recibido. El `?.` evita un error si `usuario` no existe: en ese caso devuelve `undefined`.
3. **Validar:** si `pet` no existe, la pantalla muestra "Mascota no encontrada" y termina ahí.
4. **Preparar la vista:** si ambos objetos existen, se envían a la pantalla final.

**Sobre el dueño:** en esta versión de prueba **no hay autenticación**. El dueño se busca con un `userId` fijo. Cuando exista un login, ese valor vendría de la sesión del usuario.

**Detalles para tener en cuenta:**

* `index.js` usa `mascotasMock[0]` y `[id].js` busca `"1234"`. **Deben ser el mismo usuario**, o la lista mostrará mascotas que la ficha no encuentra.
* El `id` que llega por la URL es **texto**. El `microchip` del JSON también debe ser texto (entre comillas) para que la comparación con `===` coincida.

---

## 5. El destino final: `CardUserPet.js`

En la ficha detallada, el componente recibe dos "bolsas" de información:

```javascript
<CardUserPet mascot={pet} owner={usuario} />
```

1. **Mascota (`mascot`):** nombre, raza, peso, etc.
2. **Dueño (`owner`):** nombre del dueño, teléfono y email.

> **Ojo:** `owner` debe recibir **un solo objeto** (`usuario`), no la lista completa (`mascotasMock`). Si recibe la lista, `owner` sería un array y datos como `owner.nombre` no existirían.

**Resultado:** el código es limpio porque `CardUserPet` no tiene que buscar nada. Solo muestra la información que ya recibió por sus props.

## Resumen del flujo

1. **MockData** → define la relación entre dueño y mascotas.
2. **index.js** → toma el primer usuario y recorre sus mascotas con `.map()`.
3. **CardHome** → muestra los datos básicos de la mascota y navega con su microchip.
4. **[id].js** → recibe el microchip, busca al dueño y a la mascota con `.find()`.
5. **CardUserPet** → recibe la mascota y el dueño y muestra la ficha completa.

```
[MockData] → [index.js: .map()] → [CardHome] → (router.push con el microchip)
                                                        ↓
                          [CardUserPet] ← [[id].js: .find() usuario + .find() mascota]
```

## Preguntas de repaso

1. ¿Por qué `key={pet.microchip}` es mejor que `key={index}`?
2. ¿Qué devuelve `.find()` si no encuentra nada, y cómo lo maneja el código?
3. ¿Qué pasaría si `owner` recibiera `mascotasMock` en lugar de `usuario`?
