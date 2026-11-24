# Inicio con Firebase

Resumen de la puesta en marcha del backend: proyecto, reglas de seguridad y
conexión desde la app.

---

## 1. Las reglas de seguridad, explicadas con una analogía

El archivo `firestore.rules` es la lista de instrucciones para un **portero** en
un edificio. Nadie entra sin que el portero revise la puerta y el carnet.

- **`service cloud.firestore`** = el edificio completo. Todo lo demás ocurre
  dentro.
- **`match /databases/{database}/documents`** = el único piso con oficinas.
  `{database}` no lo eliges tú: el portero lo lee de la dirección (normalmente
  `(default)`).
- **`match /users/{uid}`** = una puerta por cada inquilino, y en la puerta está
  escrito su nombre. Las llaves `{}` significan "aquí hay un valor que varía en
  cada petición". El portero lo copia y ese nombre queda disponible para todo lo
  que esté dentro de esa puerta. En nuestro caso es el `uid`.
- **`allow read, write: if ...`** = qué puede hacer quien pase. `read` es mirar
  (un documento o una lista); `write` es crear, modificar y borrar, todo junto.
- **`if request.auth != null && request.auth.uid == uid`** = dos condiciones.
  Primero, trae carnet (`auth` no es nulo, o sea está logueado). Segundo, el
  nombre del carnet coincide con el de la puerta. Sin carnet no entra; con carnet
  ajeno tampoco.
- **`match /pets/{docId}`** = dentro de la habitación del inquilino, un armario
  con sus mascotas. Las reglas de arriba no se heredan: esta puerta tiene sus
  propias instrucciones, aunque repitan la misma frase.
- **`match /locations/{locId}`** = un cajón dentro del armario. Solo
  `allow read`: puede mirar, no puede meter ni sacar nada.
- **`publicTokens`** no aparece. El portero no improvisa: lo que no está escrito
  está prohibido.
- La indentación es solo para leerlo; lo que manda son las llaves y el
  anidamiento.

### Regla de oro

**Todo está denegado por defecto.** Si una ruta no tiene un bloque `match` con su
`allow`, nadie puede leerla ni escribirla, aunque esté dentro de una ruta
permitida. Las reglas no se heredan hacia abajo.

### Estructura de datos que protegen estas reglas

```
[users/{uid}]                              perfil del dueño
   └── [pets/{docId}]                      sus mascotas
          └── [locations/{locId}]          reportes de ubicación (solo lectura)

[publicTokens/{token}]                     token del QR -> { uid, petId }
```

El visitante que escanea el QR **no lee Firestore directamente**: pasa por el
endpoint de Vercel, que usa credenciales de servidor y por eso se salta las
reglas.

---

## 2. Los dos paquetes que se confunden

| Paquete          | Para qué sirve                                       |
| ---------------- | ---------------------------------------------------- |
| `firebase`       | SDK que se usa **dentro** de la app: login, lecturas |
| `firebase-tools` | Programa de **consola**: `login`, `deploy`, emulador |

Para el SDK: `npx expo install firebase`.
Para la consola: `npm install -g firebase-tools` (sin `sudo`, porque deja
archivos con permisos de root y rompe las actualizaciones).

---

## 3. Archivos de configuración

### `.env`

Guarda los valores de `firebaseConfig` (los que copias de la consola en
*Configuración del proyecto → Tus apps → Web*). Cada variable lleva el prefijo
`EXPO_PUBLIC_`, porque Expo solo expone al celular las que empiezan así:

```
EXPO_PUBLIC_FIREBASE_API_KEY=...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=...
EXPO_PUBLIC_FIREBASE_PROJECT_ID=...
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=...
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
EXPO_PUBLIC_FIREBASE_APP_ID=...
```

- El `apiKey` **no es un secreto**: termina dentro del paquete de la app de todos
  modos. Va en `.env` para no tenerlo disperso, no por seguridad.
- `.env` debe estar en `.gitignore`.
- Un typo en el nombre de la variable no da error claro: llega `undefined` y
  Firestore falla con un mensaje que no menciona la variable.
- Después de crear o editar `.env`, reinicia con `npx expo start -c`; con la
  caché vieja las variables llegan vacías.

### `firebase.json`

Es el mapa que le dice al CLI qué archivos locales desplegar. No lleva la
configuración de Firebase (esa vive en la consola), lleva rutas.

```json
{
  "firestore": {
    "rules": "firestore.rules"
  }
}
```

- JSON no admite comentarios ni comas finales.
- Más adelante crecerá con `"indexes"` (índices compuestos) y los emuladores.
- Cuidado con `firebase init firestore`: ofrece sobrescribir las reglas
  existentes. Es más seguro crear el `firebase.json` a mano.

### `services/firebase.js`

Inicializa Firebase **una sola vez** y exporta solo lo que el resto del código
necesita: `auth` y `db`.

```js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

- Llamar `initializeApp` dos veces en la misma ejecución produce un error.
- Este archivo **no** va dentro de `app/`: en expo-router cada archivo de esa
  carpeta se convierte en una ruta (una pantalla).

---

## 4. Desplegar las reglas

```
firebase login          # abre el navegador para autorizar la cuenta
firebase use --add      # elige el proyecto (ej. lostpet-e5566)
firebase deploy --only firestore:rules
```

Salida que confirma que quedó bien:

```
✔ cloud.firestore: rules file firestore.rules compiled successfully
✔ firestore: released rules firestore.rules to cloud.firestore
✔ Deploy complete!
```

- El archivo local es solo la fuente: **si editas reglas y no vuelves a
  desplegar, el servidor sigue con la versión anterior**.
- Si el nombre del archivo tiene un espacio al final (`firestore.rules `), el CLI
  no lo encuentra y el error es confuso. `ls -b` lo muestra.

---

## 5. Auth no crea documentos en Firestore

Son servicios separados: Auth guarda la credencial (uid, correo, proveedor) y
nada más. Firestore solo cambia cuando alguien escribe en él.

```
[registro] → [Auth crea la cuenta y devuelve un uid] → [tu código escribe users/{uid}]
```

- El perfil se escribe con `setDoc(doc(db, "users", user.uid), {...})` justo
  después del registro.
- Con Google no hay registro previo: al iniciar sesión hay que comprobar si el
  documento existe y crearlo si falta.
- Automatizarlo requiere una función de Firebase (`onCreate` sobre Auth), que
  exige el plan de pago. Por eso lo hace el código de la app.
- Borrar `users/{uid}` **no** borra sus mascotas: las subcolecciones sobreviven
  al documento padre.
