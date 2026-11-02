# Explicación del Mapeo de Mascotas y Flujo de Datos

Este documento describe cómo se estructuró el flujo de datos para resolver la relación entre usuarios, mascotas y sus respectivas fichas en la aplicación.

## 1. El Desafío del Diseño
El objetivo era mostrar una lista de mascotas en la pantalla principal (`index.js`) y luego navegar a una ficha detallada donde aparecieran tanto los datos de la mascota como los detalles del dueño que ella pertenece.

Para resolver esto, se decidió estructurar los datos de forma anidada: **Dueño $\rightarrow$ Lista de Mascotas**.

## 2. El Motor de Selección: `index.js`
En la pantalla principal, utilizamos una técnica de mapeo para convertir los datos del JSON en componentes visuales:

```javascript
mascotasMock[0].pets.map((pet, index) => (
  <CardHome key={index} mascot={pet} />
))
```

**Explicación paso a paso:**
1. **`mascotasMock`**: Es el array que contiene los objetos de usuario del archivo `MockData.json`.
2. **`[0]`**: Accedemos al primer usuario (en este caso, "Moises"). Esto nos permite entrar en su objeto personal.
3. **`.pets`**: Entramos a la propiedad de ese usuario que contiene el array de sus mascotas.
4. **`.map()`**: Iteramos sobre cada mascota encontrada en esa lista.
5. **`<CardHome ... />`**: Por cada mascota, generamos una tarjeta nueva pasando el objeto `pet` completo como un "prop".

---

## 3. Visualización de la Tarjeta: `CardHome.js`
Cada vez que el usuario ve una tarjeta en la pantalla inicial, está viendo el resultado del mapeo anterior.

* **Acceso a datos:** El componente recibe `mascot`. Al usar `mascot.nombre` o `mascot.raza`, estamos extrayendo información directamente del objeto de esa mascota específica.
* **Navegación dinámica:** Usamos el microchip para crear la ruta: 
  `router.push(\`/UserPet/\${mascot.microchip}\`)`.

---

## 4. Recuperación y Relación en `[id].js`
Cuando el usuario pulsa "Ir a la ficha", el sistema recibe un ID (el microchip) por la URL. Aquí es donde reconstruimos el contexto:

1. **Identificar el Owner:** Buscamos al dueño cuyo ID coincide con nuestro sistema de autenticación.
2. **Filtrar la Mascota:** Dentro de ese usuario, buscamos específicamente la mascota que tiene ese microchip único.
3. **Preparar para la Vista:** Una vez encontrados ambos objetos (`pet` y `usuario`), los enviamos a la pantalla final.

---

## 5. El Destino Final: `CardUserPet.js`
Finalmente, en la ficha detallada, el componente recibe dos "bolsas" de información:

1. **Mascota (`mascot`):** Contiene nombre, raza, peso, etc.
2. **Dueño (`owner`):** Contiene el nombre del dueño, teléfono y email.

**Resultado:** El código es limpio porque `CardUserPet` no tiene que "buscar" nada; simplemente muestra la información que ya le entregamos en el paso anterior a través de las propiedades (props).

## Resumen del Flujo
1. **MockData** $\rightarrow$ Define la relación entre dueño y mascota.
2. **index.js** $\rightarrow$ Filtra el array para mostrar solo las mascotas del usuario actual.
3. **CardHome** $\rightarrow$ Muestra los datos básicos de la mascota y permite navegar con su ID único.
4. **[id].js** $\rightarrow$ Recibe el ID, busca al dueño correspondiente y extrae la mascota específica.
5. **CardUserPet** $\rightarrow$ Recibe ambos objetos y renderiza la información completa en pantalla.
