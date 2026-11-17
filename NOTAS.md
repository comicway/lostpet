# Corrección de llamadas a SearchPet

## Tareas pendientes

- Arreglar `SearchPet.js`: devuelve un array de dos elementos.
- Arreglar `SearchPet.js`: comprobar el caso de un ID que no existe. Debe devolver `null`.
- Arreglar `app/Location/[id].js`: llamar a `SearchPet` una sola vez y guardar el resultado.
- Arreglar `app/Location/[id].js`: extraer usuario y mascota. Eliminar la línea 22.
- Arreglar `app/Location/[id].js`: cambiar `if (!mascota)` para que use la variable.
- Arreglar `app/Location/[id].js`: corregir las líneas 26 y 29.
- Repetir el mismo patrón en `app/UserPet/[id].js` y `app/InterQR/[id].js`.
- Probar con microchip válido e inexistente. Borrar los `console.log`.

## Nota A: Desestructurar un array

Una función puede devolver varios valores juntos. Debes tomarlos por su posición.

Usa corchetes `[]` para arrays. Usa llaves `{}` solo para objetos.

Incorrecto:

```js
const { usuario, mascota } = SearchPet(mascotasMock, id);
```

No funciona. Busca propiedades que no existen. El resultado es `undefined`.

Correcto:

```js
const [usuario, mascota] = SearchPet(mascotasMock, id);
```

Toma el primero en `usuario` y el segundo en `mascota`.

## Nota B: El operador coma y return

`return (usuario, mascota)` no devuelve un array.

La coma agrupa expresiones. Devuelve solo la última. Por eso retorna `mascota`.

Usa esta forma para devolver los dos:

```js
return [usuario, mascota]
```

Otro ejemplo:

```js
console.log(mascota, mascota.pets);
```

La coma evalúa ambas cosas. El resultado es `mascota.pets`.

[REVISAR: En el ejemplo original no queda claro si `true` es un segundo argumento o una coma.]
