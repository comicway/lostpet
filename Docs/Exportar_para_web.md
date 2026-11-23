# Exportar LostPet para web (solo la vista de la mascota)

Esta guía explica cómo convertir una parte de la app de LostPet (React Native con Expo) en una página web estática, que se abre en el navegador. La usamos para que, al escanear el QR, el usuario vea los datos de la mascota y de su dueño desde el celular.

---

## 1. Entender qué estamos haciendo

Tu app está escrita en React Native. Ese código no corre directamente en un navegador, así que Expo lo **traduce** a HTML, CSS y JavaScript. A ese proceso se le llama **exportar** (o *build*).

Por defecto, Expo exporta **todas** las pantallas de la carpeta `app/`. Aquí queremos solo la vista de la mascota, así que creamos una carpeta separada con esa pantalla.

**Analogía:** es como imprimir un catálogo. Por defecto imprimes todas las páginas del libro. Nosotros solo queremos imprimir la página de una mascota, así que armamos un "libro" nuevo con esa página, copiando lo que necesita.

---

## 2. Estructura del proyecto

Antes de tocar nada, tu proyecto debe verse así (las carpetas importantes):

```
lostpet/
├── app/                  ← pantallas de la app nativa (no se toca)
│   ├── AppBar/
│   ├── CardUserPet/
│   ├── FabVisitor/
│   ├── UserPet/
│   └── Utils/MockData.json
├── app-web/              ← pantallas solo para la web (la creamos nueva)
│   ├── _layout.js
│   └── UserPet/
│       └── [id].js
├── styles/
│   └── globalStyles.js
├── app.json
└── package.json
```

- `app/` es la app de celular. Lo dejamos igual.
- `app-web/` contiene **solo** lo que la web necesita.
- `styles/` y `constants/` están en la raíz, para que ambas carpetas los compartan.

---

## 3. Instalar lo necesario para la web

Expo necesita dos librerías para convertir la app a navegador:

```bash
npx expo install react-dom react-native-web
```

- **react-dom**: la librería de React para navegadores.
- **react-native-web**: traduce los componentes de React Native (`View`, `Text`) a elementos HTML (`div`, `span`).

Solo se instala una vez.

---

## 4. Crear la carpeta `app-web/`

Crea la carpeta en la raíz del proyecto, con esta estructura:

```
app-web/
├── _layout.js
└── UserPet/
    └── [id].js
```

### `_layout.js`

Es el "marco" de todas las páginas de la web. Un ejemplo sencillo:

```javascript
import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
```

- `<Stack />` muestra la página que corresponde a la URL.
- `headerShown: false` oculta la barra superior nativa.

### `UserPet/[id].js`

Es la página de la mascota. Copia el contenido de `app/UserPet/[id].js`, pero **corrige los imports**, porque la carpeta cambió de nivel.

---

## 5. Corregir los imports (el error más común)

Un import relativo depende de dónde está el archivo. Si copias un archivo de `app/` a `app-web/`, sus rutas relativas dejan de funcionar.

**Ejemplo real de este proyecto:**

```javascript
// ❌ Esto funciona en app/UserPet/[id].js, pero NO en app-web/UserPet/[id].js
import AppBar from "../AppBar/AppBar";

// ✅ Desde app-web/UserPet/[id].js hay que subir a la raíz y entrar a app/
import AppBar from "../../app/AppBar/AppBar";
```

**Regla simple:** cuenta cuántas carpetas subes con `../` hasta llegar a la raíz, y desde ahí baja a la carpeta que quieres.

- Desde `app-web/UserPet/`, `../../` llega a la raíz.
- Desde ahí, `app/AppBar/AppBar` es la ruta correcta.

Corrige así los imports de `AppBar`, `FabVisitor`, `CardUserPet`, `MockData.json` y `styles/globalStyles`.

---

## 6. Decirle a Expo qué carpeta usar

En `app.json`, dentro de `plugins`, cambia `expo-router` para indicar la carpeta de rutas:

```json
"plugins": [
  ["expo-router", { "root": "./app-web" }],
  "@react-native-community/datetimepicker",
  "expo-image",
  "expo-status-bar"
]
```

- `root` le dice a Expo que busque las rutas en `app-web/` en lugar de `app/`.
- Esta opción la documenta Expo, pero **la propia documentación advierte que conviene no usarla** salvo que tengas una necesidad concreta. Tenlo en cuenta si cambias de versión.

---

## 7. Exportar

Antes de exportar, borra el resultado anterior y la caché:

```bash
rm -rf dist
npx expo export --platform web --clear
```

- `rm -rf dist` borra la carpeta de salida anterior.
- `--clear` limpia la caché de Metro, el compilador de Expo.
- El proceso puede tardar un minuto. Espera a que termine.

### Cómo saber si salió bien

Al final verás algo como `Exported: dist`. Luego revisa:

```bash
ls dist/_expo/static/js/web/
```

Solo deben aparecer los archivos de las pantallas de `app-web/`. Si aparecen `RegisterPet`, `ShareLocation` u otras que no pusiste ahí, el `root` no se aplicó.

### Errores comunes en esta etapa

| Mensaje | Qué significa | Solución |
|---|---|---|
| `Unable to resolve "../AppBar/AppBar"` | Un import relativo apunta a una carpeta que no existe desde `app-web/` | Corrige la ruta como en el paso 5 |
| La barra de progreso se detiene y el prompt vuelve | El proceso se interrumpió | Repite el comando sin cerrar la terminal |
| `dist/` vacía | El build no terminó | Revisa el mensaje de error completo |

Para guardar todo el registro de un build:

```bash
set -o pipefail
npx expo export --platform web --clear 2>&1 | tee export.log
```

`set -o pipefail` hace que el código de salida sea el de Expo, no el de `tee`.

---

## 8. Ver el resultado en tu computadora

Expo genera HTML y JavaScript, pero no un servidor. Necesitas uno para abrirlo:

```bash
npx serve -s dist
```

- `serve` es un servidor web sencillo.
- `-s` hace que cualquier ruta, como `/UserPet/123`, devuelva `index.html`. Sin esto, al recargar una ruta dinámica verás un 404.
- Abre la dirección que aparece en la terminal, normalmente `http://localhost:3000`.

---

## 9. Probar en el celular

Desde el celular, `localhost` apunta al propio teléfono, no a tu PC. Usa la IP de tu computadora:

```
http://192.168.1.87:3000
```

Puedes ver tu IP con `hostname -I` en Linux o `ipconfig` en Windows.

### Importante: el GPS necesita HTTPS

El botón de compartir ubicación usa `navigator.geolocation`, que solo funciona con **HTTPS** en el celular. `http://192.168.x.x` no es HTTPS, así que en el celular la ubicación no funcionará con este servidor.

En tu PC sí funciona, porque `localhost` está excepcionado.

Para probarlo en el celular necesitas HTTPS. Opciones:

- Subir la carpeta `dist/` a **Netlify**, **Vercel** o **GitHub Pages**. Todos dan HTTPS automáticamente.
- Usar un túnel como `ngrok`, que da una dirección HTTPS temporal que apunta a tu `localhost`.

---

## 10. Resumen de comandos

```bash
# 1. Instalar dependencias web (una sola vez)
npx expo install react-dom react-native-web

# 2. Exportar solo app-web/
rm -rf dist
npx expo export --platform web --clear

# 3. Verificar qué se exportó
ls dist/_expo/static/js/web/

# 4. Servir en tu PC
npx serve -s dist
```

---

## Preguntas de repaso

1. Si tu archivo está en `app-web/UserPet/[id].js`, ¿cuántos niveles `../` necesitas para llegar a la raíz?
2. ¿Por qué `localhost` no sirve para probar en el celular?
3. ¿Qué hace la opción `-s` en `npx serve`?
