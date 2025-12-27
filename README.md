# 🎮 Level-Up Gamer - Tienda E-commerce

Plataforma web moderna diseñada para la venta de productos gaming (Consolas, Hardware y Accesorios). Este proyecto se enfoca en el desarrollo **Frontend** utilizando estándares modernos de **JavaScript (ES6+)** y diseño responsivo con **Bootstrap 5**.

## 🚀 Tecnologías
* **Estructura:** HTML5 Semántico.
* **Estilos:** CSS3 + **Bootstrap 5.3** (Diseño Responsive).
* **Lógica:** JavaScript Vanilla (Programación Orientada a Objetos).
* **Iconos:** Bootstrap Icons.

## ✨ Funcionalidades Destacadas

### 1. Sistema de Validaciones Avanzado 🛡️
Se implementó una clase personalizada `FormValidator` que maneja:
* Validación en tiempo real (mientras el usuario escribe).
* Expresiones Regulares (Regex) para emails, teléfonos chilenos y contraseñas seguras.
* **Lógica de Negocio:** Detección automática de correos institucionales (`@duocuc.cl`) para aplicar descuentos.
* *Ver documentación técnica:* [RESUMEN_VALIDACIONES_COMPLETO.md](./RESUMEN_VALIDACIONES_COMPLETO.md)

### 2. Panel Administrativo Simulado 📊
Interfaz de dashboard que permite visualizar:
* Estadísticas de ventas y usuarios.
* Gestión de inventario (CRUD simulado en memoria).
* Alertas de stock crítico y notificaciones.

### 3. Carrito de Compras 🛒
Lógica completa en el cliente:
* Agregar/Eliminar productos.
* Cálculo automático de totales.
* Persistencia temporal de estado.

## 📂 Estructura del Proyecto
```text
├── Css/            # Estilos personalizados y de admin
├── Html/           # Vistas (Home, Login, Admin, Productos)
├── img/            # Recursos gráficos optimizados
├── js/             # Lógica de negocio (Validaciones, Carrito, Admin)
└── *.md            # Documentación técnica del proyecto
