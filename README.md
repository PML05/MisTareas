# MisTareas

MisTareas es una aplicación móvil para organizar tareas y llevar un control sencillo de las actividades pendientes y completadas.

## Funcionalidades

- Agregar tareas e impedir entradas vacías o compuestas solamente por espacios.
- Marcar tareas como completadas y volverlas a pendientes.
- Eliminar tareas.
- Mostrar contadores de tareas totales, pendientes y completadas.
- Filtrar la lista por Todas, Pendientes y Completadas.
- Mostrar mensajes cuando no hay tareas o cuando un filtro no tiene resultados.
- Activar una función oculta mediante un código secreto.

## Función oculta

La aplicación tiene una sorpresa que se activa al ingresar un código especial en el mismo campo donde se escriben las tareas. Al descubrirla, aparece un mensaje de felicitaciones que se puede cerrar con el botón «Cerrar mensaje».

**Pista:** Para descubrir la función oculta, escribí en el campo de tareas un código de seis números consecutivos, comenzando desde el 1, y presioná «Agregar tarea».

## Tecnologías utilizadas

- React Native.
- Expo.
- JavaScript.

## Cómo ejecutar el proyecto

1. Tener instalados Node.js (versión LTS) y npm.
2. Descargar o clonar el repositorio. Si se descarga como ZIP, descomprimirlo.
3. Abrir una terminal en la carpeta del proyecto, donde está `package.json`.
4. Instalar las dependencias:

   ```bash
   npm install
   ```

5. Iniciar Expo:

   ```bash
   npm start
   ```

6. Abrir Expo Go en un celular Android compatible con la versión de Expo del proyecto y escanear el código QR que aparece en la terminal.

La computadora y el celular deben estar conectados a la misma red Wi-Fi. Dejar la terminal ejecutándose mientras se prueba la aplicación.

## Información adicional

- Las tareas se almacenan temporalmente en memoria mientras la aplicación está abierta.
- Al reiniciar la aplicación, las tareas no se conservan.
- El proyecto no utiliza una base de datos.

## Proyecto académico

MisTareas fue desarrollada como trabajo académico de programación móvil.
