# 📌 Proyecto: Plataforma de Gestión de Servicios Freelance

## 🧾 Contexto del cliente
Una pequeña agencia necesita una aplicación web para gestionar:

- Clientes  
- Proyectos  
- Tareas  
- Pagos  

Actualmente utilizan Excel y WhatsApp, lo que genera desorganización y pérdida de información.  
El objetivo es centralizar toda la operación en una sola plataforma.

---

## 🎯 Objetivo del proyecto
Desarrollar una aplicación web fullstack que permita:

- Organizar clientes y proyectos
- Gestionar tareas internas
- Registrar pagos
- Visualizar métricas clave en un dashboard

---

## 🧱 Stack tecnológico

### Frontend
- React
- Manejo de estado: Context API / Zustand / Redux
- Formularios: React Hook Form

### Backend
- Node.js + Express
- ORM: Prisma

### Base de datos
- PostgreSQL

---

## 📦 Requisitos funcionales

### 👤 Autenticación
- Registro de usuario
- Login
- Autenticación con JWT
- Roles:
  - Admin
  - Usuario

---

### 🧑‍💼 Clientes
- Crear cliente
- Editar cliente
- Eliminar cliente
- Listar clientes

**Campos:**
- Nombre
- Email
- Empresa
- Estado (activo / inactivo)

---

### 📁 Proyectos
- Crear proyecto asociado a cliente
- Editar proyecto
- Eliminar proyecto
- Listar proyectos

**Campos:**
- Nombre
- Descripción
- Estado:
  - Pendiente
  - En progreso
  - Terminado

---

### ✅ Tareas
- Crear tareas por proyecto
- Editar tareas
- Eliminar tareas
- Listar tareas

**Campos:**
- Título
- Descripción
- Prioridad:
  - Baja
  - Media
  - Alta
- Estado:
  - Pendiente
  - En progreso
  - Hecho

---

### 💰 Pagos
- Registrar pagos por proyecto
- Listar pagos

**Campos:**
- Monto
- Fecha
- Estado:
  - Pagado
  - Pendiente

---

### 📊 Dashboard
Vista general con:

- Total de proyectos activos
- Total de ingresos
- Tareas pendientes

---

## 🧠 Requisitos técnicos

### Backend
- Arquitectura por capas:
  - routes
  - controllers
  - services
- Validación de datos (Zod recomendado)
- Manejo centralizado de errores

---

### Base de datos (Prisma)
Modelos principales:

- User
- Client
- Project
- Task
- Payment

Relaciones:
- Cliente → Proyectos (1:N)
- Proyecto → Tareas (1:N)
- Proyecto → Pagos (1:N)

---

### Frontend
- Componentes reutilizables
- Manejo de estado global
- Formularios controlados
- Consumo de API REST

---

## 🔐 Seguridad
- Hash de contraseñas (bcrypt)
- Protección de rutas (middleware JWT)
- Validación de inputs en backend

---

## 🧪 Testing

### Backend
- Tests de endpoints (Jest o Vitest)

### Frontend
- Tests básicos de componentes

---

## 🚀 Funcionalidades extra (opcional)
- Filtros por estado/prioridad
- Búsqueda de clientes/proyectos
- Paginación
- Notificaciones
- Dark mode

---

## 📦 Entregables

1. Estructura del proyecto
2. Modelo de base de datos (Prisma schema)
3. API funcional
4. Frontend conectado al backend
5. Tests básicos implementados
6. README documentado

---

## 🧑‍💻 Primera tarea

### 1. Propuesta de arquitectura
- Estructura de carpetas (frontend + backend)

### 2. Modelo de base de datos (alto nivel)
- Entidades
- Relaciones

---

## 📌 Notas
- El código debe ser mantenible y escalable
- Evitar lógica duplicada
- Seguir buenas prácticas de desarrollo