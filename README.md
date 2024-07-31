# Librería Del Ande - Frontend

Bienvenidos al repositorio del frontend del proyecto Librería Del Ande. Este proyecto es una aplicación web desarrollada con Angular que permite a los usuarios buscar, rentar y gestionar libros en línea. Los administradores pueden gestionar los libros, usuarios y reservas a través de una interfaz dedicada.

## Descripción del Proyecto

Este proyecto forma parte del sistema de gestión de una librería. La aplicación web está diseñada para ofrecer una experiencia de usuario intuitiva y eficiente, permitiendo a los usuarios finales navegar por el catálogo de libros, rentar libros y gestionar sus perfiles. Los administradores tienen acceso a herramientas avanzadas para gestionar el inventario de libros, usuarios y reservas.

## Características

Registro y Autenticación de Usuarios: Los usuarios pueden registrarse y autenticarse en la aplicación.
Exploración y Búsqueda de Libros: Los usuarios pueden explorar el catálogo de libros y realizar búsquedas por título.
Renta de Libros: Los usuarios pueden rentar libros y ver su historial de rentas.
Gestión de Perfiles: Los usuarios pueden editar su información personal.
Gestión de Libros, Usuarios y Reservas (Administradores): Los administradores pueden añadir, editar y eliminar libros, así como gestionar usuarios y reservas.
Tecnologías Utilizadas

Angular: Framework principal para la construcción del frontend.
TypeScript: Lenguaje de programación utilizado para escribir código JavaScript tipado.
HTML y CSS: Utilizados para estructurar y estilizar la aplicación web.
Bootstrap: Framework de CSS utilizado para el diseño responsivo.
Instalación y Configuración

## Prerrequisitos
Node.js y npm deben estar instalados en tu máquina.
Angular CLI debe estar instalado globalmente. Puedes instalarlo ejecutando:
bash
Copy code
npm install -g @angular/cli
Clonación del Repositorio

## Clona el repositorio en tu máquina local:

git clone https://github.com/Addriank12/LibreriaAnde.git
cd LibreriaAnde
Instalación de Dependencias
Instala las dependencias del proyecto ejecutando:

npm install
Configuración del Entorno
Crea un archivo .env en la raíz del proyecto y agrega las siguientes variables de entorno (reemplaza con tus propios valores):

API_URL=http://localhost:8080/api
Ejecución del Proyecto
Para iniciar el servidor de desarrollo, ejecuta:

ng serve -o
La aplicación estará disponible en http://localhost:4200.

## Guía de Usuario
a) Usuario Final: 
		Registro y Autenticación:
1. El usuario deberá registrarse en la página usando su correo, una clave y un nombre.

Inicio de Sesión:
1. Una vez el usuario tenga una cuenta, podrá ingresar sesión con esta.

Navegación por la Aplicación:
1. El usuario podrá navegar por las páginas “Inicio”, “Catálogo”, “Mis Rentas” (Si es que tiene por lo menos una renta a su nombre), “Locaciones” y “Acerca de”.
2. En la sección de catálogo, el usuario podrá rentar uno o más libros a la biblioteca, el usuario deberá seleccionar una fecha en la que inicia su renta, y deberá devolverlo en el plazo que le asigne la biblioteca.
3. En caso de que el cliente no devuelva el libro dentro de la fecha indicada por la biblioteca, la biblioteca le notificará y deberá pagar una multa.

Gestión de Perfil:
1. El usuario podrá agregar campos en su perfil, tales como “Dirección” y “Teléfono” o podrá modificar el campo de Nombre.

a) Administrador: 
Registro y Autenticación:
1. El registro de nuevos administradores debe ser realizado por un administrador existente.
2. El logueo es igual al del cliente.

Inicio de Sesión:
1.	Iniciar sesión con las credenciales de administrador.  
2.	Haz clic en iniciar sesión.
