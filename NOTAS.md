¿Cuántas llamadas a SearchPet te quedan en la pantalla?

Todos
  Corregir el return de SearchPet.js para devolver un array de dos elementos
  Verificar el contrato: con id inexistente debe devolver null (o pet: undefined) sin romper
  En app/Location/[id].js, llamar SearchPet una sola vez y guardar el resultado
  Extraer usuario y pet del resultado y eliminar la línea 22 suelta
  Ajustar if (!pet) para que use la variable ya declarada
  Corregir las líneas 26 y 29 para usar el resultado guardado, no llamadas nuevas
  Repetir el mismo patrón en app/UserPet/[id].js y app/InterQR/[id].js
  Probar con microchip válido y con uno inexistente, y borrar los console.log

Dos errores de destructuración relacionados que conviene dejar escritos juntos.

---

### Nota A: destructurar un array con llaves `{}`

La función devuelve `(usuario, pet)`, que es una tupla: un array de dos elementos. Cuando desestructuras, la forma que usas importa:

```js
// Mal: {} busca propiedades del array
const { usuario, pet } = SearchPet(mascotasMock, id);
// usuario = undefined, pet = undefined

// Bien: [] itera los elementos del array
const [usuario, pet] = SearchPet(mascotasMock, id);
```

La analogía: `SearchPet` te devuelve una bandeja con dos objetos en fila, `[usuario, pet]`. Si usas `const [usuario, pet]`, le decís a JS: "ponme el primero en usuario y el segundo en pet". Si usas `const { usuario, pet }`, le estás diciendo: "busca el objeto con propiedades `usuario` y `pet`". Como una bandeja de elementos no tiene esas propiedades, ambas salen `undefined`.

Pregunta para afianzar: ¿por qué al desestructurar un array usamos corchetes y a los objetos llaves?

---

### Nota B: el operador coma y `return (usuario, pet)`

La línea que parecía un array era en realidad el operador coma dentro de paréntesis:

```js
return (usuario, pet)
```

Los paréntesis solo agrupan. Dentro hay dos expresiones separadas por una coma. En JavaScript el operador coma evalúa las dos y devuelve solo la última. O sea, esta función devuelve `pet` (un objeto), no `[usuario, pet]`.

La analogía: `return (usuario, pet)` se lee como "dame la última cosa que evalué después de pasar por el usuario". Es `pet`.

La corrección es volver un array real:

```js
return [usuario, pet]
```

Con eso, `const [usuario, pet] = SearchPet(mascotasMock, id)` funciona: JS ve un array y extrae los elementos.

Un segundo ejemplo con el operador coma, para verlo desde otro lado:

```js
const mascota = mascotaPorId(id, true);   // evalúa las dos, devuelve la de verdad
console.log(mascota, mascota.pets);        // ya queríamos las dos
```

Aquí sí quiero las dos, y lo único que cambié es que ahora `mascota` es un array.

Pregunta: ¿por qué `return (a, b)` no es lo mismo que `return [a, b]`?
