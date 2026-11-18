# LostPet - Gestión y Seguimiento de Mascotas

## Introducción

LostPet es una aplicación móvil desarrollada en React Native con alcance de **MVP (Producto Mínimo Viable)**. Está diseñada para facilitar la identificación, registro y geolocalización de mascotas. El proyecto permite a los usuarios registrar información detallada de sus mascotas, generar códigos QR para identificación rápida y visualizar ubicaciones en tiempo real mediante mapas.

## Tecnologías

El proyecto utiliza las siguientes tecnologías y bibliotecas principales:

- **Framework:** React Native con el ecosistema Expo.
- **Navegación:** Expo Router para una estructura de rutas basada en archivos.
- **Gestión de Formularios:** React Hook Form y Zod para validación de esquemas.
- **Mapas:** React Native Maps para visualización y seguimiento geográfico.
- **Gráficos:** React Native SVG y react-native-qrcode-svg para generación de códigos QR.
- **Iconos:** Expo Vector Icons.
- **Estilizado:** Estilos personalizados integrados con un sistema de temas (colors y typography).

## Sistema de Diseño

El sistema de diseño que se utilizará para el MVP se llama **Sys-Script**. Este sistema proporciona la base visual y estructural sobre la cual se construyen los componentes de la aplicación, incluyendo la tipografía, colores, espaciados y patrones de interfaz que garantizan una experiencia de usuario coherente.

## Estado del Proyecto

Actualmente, el proyecto cuenta con las siguientes funcionalidades implementadas:

- [x] **Interfaz Principal:** Pantalla de inicio con visualización de tarjetas de mascotas.
- [x] **Registro de Mascotas:** Formulario completo con validación de datos (Nombre, Raza, Peso, Color, Fecha de Nacimiento y Microchip).
- [x] **Identificación por QR:** Sistema para generación e interacción con códigos QR.
- [x] **Geolocalización:** Integración con mapas para visualización de ubicaciones y compartir puntos de interés.
- [x] **Interfaz de Usuario (UI):** Implementación de componentes globales como `AppBar` y `FabMenu`.
- [x] **Estructura de Datos:** Uso de datos mockeados para demostración de funciones de búsqueda y filtrado.

## Guía de Inicio / Próximos Pasos

Para ejecutar el proyecto en un entorno de desarrollo:

1. **Instalar dependencias:**
   ```bash
   npm install
   ```
2. **Iniciar el servidor de desarrollo:**
   ```bash
   npx expo start
   ```
3. **Desarrollo:** El proyecto utiliza `expo-router`, por lo que la navegación se maneja automáticamente a través de la carpeta `app/`.

---

## Contacto

**Moises Contreras**
🌐 [moises-script.cl](http://moises-script.cl)
📧 moiselias7@gmail.com
📸 [Instagram](https://www.instagram.com/moises_script/) | 🧵 [Threads](https://www.threads.com/@moises_script)
