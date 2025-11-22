# E-commerce Full Stack Project

Un proyecto completo de e-commerce construido con el stack MERN (MongoDB, Express, React, Node.js).

## 🚀 Características

### Frontend (React + Vite)
- ✅ Autenticación de usuarios (Login/Registro)
- ✅ Búsqueda y filtrado de productos
- ✅ Carrito de compras con persistencia
- ✅ Proceso de checkout
- ✅ Integración de pasarela de pagos (Stripe)
- ✅ Formulario de contacto
- ✅ Diseño responsive
- ✅ Rutas protegidas

### Backend (Node.js + Express)
- ✅ API RESTful completa
- ✅ Autenticación JWT
- ✅ Validación de datos
- ✅ Manejo de errores
- ✅ Seguridad (Helmet, Rate Limiting, CORS)
- ✅ Integración con MongoDB
- ✅ Envío de emails (Nodemailer)
- ✅ Procesamiento de pagos (Stripe)

## 📁 Estructura del Proyecto

```
ecomm_talent/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── api/           # Llamadas a la API
│   │   ├── components/    # Componentes reutilizables
│   │   ├── context/       # Context API
│   │   ├── hooks/         # Custom Hooks
│   │   ├── pages/         # Páginas
│   │   ├── routes/        # Configuración de rutas
│   │   ├── services/      # Lógica de negocio
│   │   ├── styles/        # Estilos globales
│   │   └── utils/         # Utilidades
│   └── package.json
│
└── server/                # Backend Node.js
    ├── src/
    │   ├── config/        # Configuraciones
    │   ├── controllers/   # Controladores
    │   ├── middleware/    # Middlewares
    │   ├── models/        # Modelos MongoDB
    │   ├── routes/        # Rutas de la API
    │   ├── services/      # Servicios
    │   └── utils/         # Utilidades
    └── package.json
```

## 🛠️ Instalación

### Prerrequisitos
- Node.js (v20+)
- MongoDB
- npm o yarn

### 1. Clonar el repositorio
```bash
cd ecomm_talent
```

### 2. Configurar el Backend

```bash
cd server
npm install
```

Crear archivo `.env` en la carpeta `server`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=tu_clave_secreta_aqui
JWT_EXPIRE=7d
STRIPE_SECRET_KEY=tu_stripe_secret_key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_password
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### 3. Configurar el Frontend

```bash
cd ../client
npm install
```

Crear archivo `.env` en la carpeta `client`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=tu_stripe_public_key
```

## 🚀 Ejecución

### Iniciar MongoDB
```bash
mongod
```

### Iniciar el Backend
```bash
cd server
npm run dev
```
El servidor estará corriendo en `http://localhost:5000`

### Iniciar el Frontend
```bash
cd client
npm run dev
```
La aplicación estará disponible en `http://localhost:5173`

## 📚 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/forgot-password` - Recuperar contraseña
- `POST /api/auth/reset-password/:token` - Resetear contraseña
- `GET /api/auth/me` - Obtener usuario actual

### Productos
- `GET /api/products` - Obtener todos los productos
- `GET /api/products/:id` - Obtener producto por ID
- `GET /api/products/:id/related` - Obtener productos relacionados
- `POST /api/products` - Crear producto (Admin)
- `PUT /api/products/:id` - Actualizar producto (Admin)
- `DELETE /api/products/:id` - Eliminar producto (Admin)
- `POST /api/products/:id/reviews` - Agregar review

### Carrito
- `GET /api/cart` - Obtener carrito
- `POST /api/cart/add` - Agregar al carrito
- `PUT /api/cart/update/:productId` - Actualizar cantidad
- `DELETE /api/cart/remove/:productId` - Eliminar del carrito
- `DELETE /api/cart/clear` - Vaciar carrito

### Órdenes
- `POST /api/orders/create` - Crear orden
- `POST /api/orders/payment` - Procesar pago
- `GET /api/orders/:id` - Obtener orden
- `GET /api/orders/user/:userId` - Obtener órdenes del usuario

### Contacto
- `POST /api/contact` - Enviar mensaje
- `GET /api/contact/messages` - Obtener mensajes (Admin)
- `PUT /api/contact/:id/status` - Actualizar estado (Admin)

## 🔐 Seguridad

- Contraseñas hasheadas con bcrypt
- Autenticación con JWT
- Validación de datos en cliente y servidor
- Rate limiting en endpoints
- Headers de seguridad con Helmet
- Protección CORS
- Sanitización de inputs

## 🎨 Tecnologías Utilizadas

### Frontend
- React 19
- React Router DOM
- Axios
- Vite
- CSS3 (con variables CSS)

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- JWT
- Bcrypt
- Nodemailer
- Stripe
- Helmet
- Express Validator
