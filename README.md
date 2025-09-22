## Arquitectura de la aplicación
La arquitectura de la aplicación se basa en el patrón de diseño de componentes. Se crean componentes reutilizables que se pueden utilizar en diferentes partes de la aplicación.

Se navega utilizando la librería de navegación de Next.js basada en rutas que se crean con carpetas y archivos page.tsx.


## Funcionamiento de la aplicación
La página principal contiene la lista de autores y permite a los usuarios añadir, editar y eliminar autores. Además, permite a los usuarios añadir autores a sus favoritos y ver los autores favoritos.

Al hacer clic en un autor, se muestra su información detallada, incluyendo su imagen, nombre, fecha de nacimiento, descripción, los libros que ha publicado y las premiaciones que ha recibido.

Para la creación de autores, se muestra un formulario que permite a los usuarios ingresar los datos del autor, incluyendo su nombre, fecha de nacimiento, descripción y imagen. La imagen debe ser una URL válida y debe tener una extensión de archivo de imagen válida (jpg, png, etc.).
Por defefecto, el formualario no es válido y se le hace saber al usuario mediante la deshabilitación del botón de envío.

Para la edición de autores, se muestra un formulario similar al crear autores, pero con los campos rellenados con los datos del autor seleccionado.

Toda la lógica del CRUD se maneja en el archivo AuthorContext.tsx, que se encarga de manejar los datos de los autores, los libros, las premiaciones y las organizaciones. Este archivo es el conetxto global donde viven los valores de estado y los efectos de cambio de estado.

Cada página se encarga de renderizar la información correspondiente y de manejar los cambios de estado en la aplicación mediante el consumo del contexto AuthorContext.


## Accesibilidad
Para la parte B se decidio añadir accesibilidad a la aplicación mediante el desarrollo semántico de HTML que permite navegación con Teclado y etiquetas ARIA.


## Instrucciones de instalación y ejecución
Para correr la aplicación localmente, se debe instalar Node.js y npm, y luego ejecutar los siguientes comandos en la terminal:

npm install
npm run dev

El comando npm install instala las dependencias necesarias para la aplicación, mientras que npm run dev inicia el servidor de desarrollo y se carga la aplicación en el navegador.
Se puede acceder a la aplicación en http://localhost:3000/.

## Requisitos

- Node.js
- npm