# 🛍️ ShopEasy: Plataforma E-commerce Fullstack

<div align='center'>
  <img src="https://camo.githubusercontent.com/c8ad63a83bd6c5535bfaeba2157f5ad20e2e02ec2d0149972dd053ff53199bab/68747470733a2f2f692e706f7374696d672e63632f7a474373664662582f73686f70656173792d6c6f676f2e6a7067" alt="ShopEasy Banner" width="400" height="350">
</div>

## Descripción del Proyecto

**ShopEasy** es una plataforma de comercio electrónico moderna, rápida y segura, desarrollada como proyecto final para validar los conocimientos de desarrollo **Fullstack**.

El objetivo principal fue construir un sistema escalable y con estricta gestión de roles, replicando las funcionalidades esenciales de un Marketplace moderno: autenticación persistente con tokens, gestión completa de productos (CRUD), motor de búsqueda por similitud, carrito de compras y un panel de administración segregado.

## 🚀 Características Principales

* **Autenticación y Autorización (JWT):** Sistema de registro e inicio de sesión seguro basado en JSON Web Tokens (JWT).
* **Gestión de Roles (`admin` vs `user`):** Acceso restringido a rutas sensibles y diferenciación de la interfaz para Administradores y Usuarios comunes.
* **CRUD Completo de Productos:**
    * Los usuarios pueden **crear, modificar y eliminar** sus propias publicaciones desde el panel de perfil.
    * Los administradores pueden **eliminar cualquier producto** desde el Dashboard.
* **Búsqueda "Smart":** La barra de búsqueda filtra productos por título, descripción y categoría utilizando expresiones regulares en MongoDB, permitiendo búsquedas por similitud.
* **Paginación:** Visualización optimizada de productos con un sistema de paginación de 6 elementos por página.
* **Experiencia de Usuario (UX) Mejorada:** Utilización de modales consistentes para la creación de productos, carrito de compras y notificaciones (Toast/Confirmación) en lugar de *alerts* nativos.
* **Dashboard de Administración:** Panel dedicado para moderación, listando usuarios y productos de toda la plataforma (accesible solo desde `/profile` para administradores).
* **Perfil de Usuario Seguro:** Permite al usuario actualizar datos personales, dirección y cambiar contraseña.
* **Documentación OpenAPI:** La API expone su documentación completa en el endpoint `/api-docs` (Swagger UI).

---

## 💻 Tecnologías Utilizadas

| Categoría | Backend | Frontend |
| :--- | :--- | :--- |
| **Framework** | Node.js (Express) | React (Vite) |
| **Base de Datos** | MongoDB (Atlas) | LocalStorage (persistencia de sesión y carrito) |
| **ORM/ODM** | Mongoose | N/A |
| **Autenticación** | JSON Web Tokens (JWT), bcryptjs | Context API |
| **Validación** | `express-validator` | Validación React State |
| **Logging** | Winston (Archivos y Consola) | N/A |
| **Testing/Setup** | Nodemon, Dotenv | React Router DOM |

---

## 🛠️ Configuración e Instalación Local

Para levantar el proyecto en tu entorno local, sigue estos pasos en dos terminales separadas (una para el Backend y otra para el Frontend).

### 1. Backend Setup

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/MarianoMaldonado-dev/ShopEasyAPI.git
    cd ShopEasyAPI
    ```
2.  **Instalar dependencias:**
    ```bash
    npm install
    ```
3.  **Configurar Variables de Entorno:**
    * Crea un archivo llamado **`.env`** en la raíz de la carpeta `ShopEasyAPI`.
    * Copia el contenido de `env.template` y reemplaza los placeholders con tus credenciales reales de MongoDB Atlas (usuario y contraseña) y tu clave secreta de JWT.

    ```bash
    # Ejemplo de estructura del archivo .env
    PORT=4000
    MONGO_URI=mongodb+srv://USUARIO_REAL:CONTRASEÑA_REAL@cadena+de+conexión+mongodb+atlas/?appName=ShopEasy
    JWT_SECRET=tu_clave_secreta_aqui
    CLIENT_URL=http://localhost:5173
    NODE_ENV=development
    ```
4.  **Iniciar el servidor:**
    ```bash
    npm run dev
    ```
    (El servidor se iniciará en `http://localhost:4000`).

### 2. Frontend Setup

1.  **Clonar/Navegar a la carpeta frontend:**
    ```bash
    cd [ruta de la carpeta frontend]
    ```
2.  **Instalar dependencias:**
    ```bash
    npm install
    ```
3.  **Iniciar la aplicación:**
    ```bash
    npm run dev
    ```
    (La aplicación se abrirá en `http://localhost:5173`).

---

## 🔑 Roles de Prueba y Acceso a la Documentación

Utiliza estas credenciales para verificar la funcionalidad completa del sistema:

| Rol | Email | Contraseña    |
| :--- | :--- |:--------------|
| **Administrador** | `webmaster@admin.com` | `[abc123456]` |
| **Usuario Estándar** | `usuarioqa@user.com` | `[abc123456]` |

### Acceso a la Documentación (Swagger UI)

Una vez iniciado el servidor backend, la documentación interactiva de la API está disponible en:
> **`http://localhost:4000/api-docs`** (o la URL de despliegue correspondiente).

---

## 👨‍💻 Equipo de Desarrollo

* **Team Leader y Desarrollo Fullstack:** Mariano Maldonado
* **Colaboradores Fullstack:** Yanina Osuna, Griselda Chaparro (Ver más detalles en la ruta `/developers`).

<table align='center' style="width: 100%; border-collapse: collapse;">
  <tr>
    <td align='center'>
      <h4>Mariano Maldonado</h4>
      <a href="https://github.com/MarianoMaldonado-dev" target="_blank">
        <img width="110" src="https://avatars.githubusercontent.com/u/124847965?v=4" style="border-radius: 50%;"/>
      </a>
      <p>Diseño y desarrollo Fullstack<br>Team Leader</p>
    </td>
    <td align='center'>
      <h4>Yanina Osuna</h4>
      <a href="https://github.com/" target="_blank">
        <img width="110" src="https://avatars.githubusercontent.com/u/206969685?v=4" style="border-radius: 50%;"/>
      </a>
      <p>Diseño y desarrollo Fullstack</p>
    </td>
    <td align='center'>
      <h4>Griselda Chaparro</h4>
      <a href="https://github.com/chaparrogriselda09-wq" target="_blank">
        <img width="110" src="https://avatars.githubusercontent.com/u/227479594?v=4" style="border-radius: 50%;"/>
      </a>
      <p>Desarrollo Fullstack</p>
    </td>
  </tr>
</table>
---

## 📄 Licencia

Este proyecto está bajo la Licencia **MIT**.