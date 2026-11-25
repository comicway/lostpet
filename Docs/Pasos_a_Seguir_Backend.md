Con esas tres respuestas el orden queda fijo, porque cada paso depende del anterior:
1. Proyecto Firebase + reglas de seguridad
Antes de escribir una sola línea de datos: colecciones, índices y firestore.rules. Si dejas las reglas para el final, vas a tener que reescribir todas las consultas.
2. Login en la app
Firebase Auth con Google + correo. Sesión persistente. Después, la biometría como candado: al abrir la app, si hay sesión guardada, expo-local-authentication pide huella antes de mostrar contenido. Ojo: la biometría no reemplaza el login, solo lo desbloquea en ese dispositivo.
3. Formularios dueño → mascota
Van directo con el SDK de Firestore. Regla clave: una mascota se crea con ownerId == request.auth.uid, y las reglas rechazan cualquier escritura donde eso no se cumpla.
4. Token público + pantalla del QR
Cada mascota recibe un token aleatorio (no el petId). El QR contiene la URL de Vercel, no un esquema de la app. Aquí ya puedes probar el escaneo antes de que exista el endpoint.
5. Endpoint público en Vercel
POST /api/report recibe { token, lat, lng }, valida el token contra publicTokens, escribe en locations y envía el push en la misma petición.
Ese último punto te evita Firebase Cloud Functions y su plan de pago: como el reporte ya pasa por Vercel, ahí mismo mandas la notificación con el token de Expo guardado en users/{uid}. Vercel → escribe → Vercel → push. Sin trigger de Firestore.
6. Push
expo-notifications registra el token del dispositivo al iniciar sesión y lo guarda en el perfil del dueño.
Dos advertencias: la geolocalización del navegador solo funciona con HTTPS (Vercel te lo da), y el endpoint anónimo necesita límite de peticiones o cualquiera puede llenarte la base de ubicaciones falsas.
¿Empezamos definiendo el esquema y las reglas, o prefieres primero el login?
