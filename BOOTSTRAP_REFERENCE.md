# REFERENCIA BOOTSTRAP 5 - LEVEL-UP GAMER
## Elementos y Clases Utilizadas en el Proyecto

---

## 📦 **CDN Y DEPENDENCIAS**

```html
<!-- Bootstrap 5 CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- Bootstrap Icons -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">

<!-- Bootstrap 5 JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
```

---

## 🧭 **NAVBAR (Barra de Navegación)**

### **Estructura Base:**
```html
<nav class="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
    <div class="container">
        <a class="navbar-brand" href="index.html">
            <i class="bi bi-controller me-2"></i>Level-Up Gamer
        </a>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto">
                <li class="nav-item">
                    <a class="nav-link" href="index.html">Inicio</a>
                </li>
            </ul>
        </div>
    </div>
</nav>
```

### **Clases Utilizadas:**
- **`navbar`**: Componente base de navegación
- **`navbar-expand-lg`**: Se expande en pantallas grandes (≥992px)
- **`navbar-dark`**: Tema oscuro para la navbar
- **`fixed-top`**: Fija la navbar en la parte superior
- **`navbar-brand`**: Logo/marca de la empresa
- **`navbar-toggler`**: Botón para colapsar en móviles
- **`navbar-toggler-icon`**: Icono del botón toggler
- **`collapse navbar-collapse`**: Contenido colapsable
- **`navbar-nav`**: Lista de navegación
- **`nav-item`**: Elemento individual de navegación
- **`nav-link`**: Enlace de navegación
- **`me-auto`**: Margen automático a la derecha

---

## 📋 **DROPDOWN (Menú Desplegable)**

### **Estructura:**
```html
<li class="nav-item dropdown me-2">
    <a class="nav-link dropdown-toggle text-white" href="#" id="authDropdown" role="button" data-bs-toggle="dropdown">
        <i class="bi bi-person-circle me-1"></i>Mi Cuenta
    </a>
    <ul class="dropdown-menu dropdown-menu-dark">
        <li><a class="dropdown-item text-white" href="login.html">
            <i class="bi bi-box-arrow-in-right me-2"></i>Login
        </a></li>
    </ul>
</li>
```

### **Clases Utilizadas:**
- **`dropdown`**: Componente dropdown
- **`dropdown-toggle`**: Botón que activa el dropdown
- **`dropdown-menu`**: Contenedor del menú desplegable
- **`dropdown-menu-dark`**: Tema oscuro para el menú
- **`dropdown-item`**: Elemento individual del menú

---

## 🔘 **BOTONES**

### **Tipos de Botones:**
```html
<!-- Botón primario -->
<button class="btn btn-gamer btn-lg">Botón Principal</button>

<!-- Botón outline -->
<button class="btn btn-outline-gamer">Botón Secundario</button>

<!-- Botón con posición relativa -->
<button class="btn btn-outline-gamer position-relative">
    <i class="bi bi-cart3 me-2"></i>Carrito
    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">0</span>
</button>

<!-- Botón de cierre -->
<button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
```

### **Clases Utilizadas:**
- **`btn`**: Clase base para botones
- **`btn-gamer`**: Clase personalizada (definida en CSS custom)
- **`btn-outline-gamer`**: Botón con borde personalizado
- **`btn-lg`**: Botón grande
- **`btn-sm`**: Botón pequeño
- **`btn-close`**: Botón de cierre (X)
- **`btn-close-white`**: Botón de cierre blanco
- **`position-relative`**: Posición relativa
- **`position-absolute`**: Posición absoluta
- **`top-0 start-100`**: Posicionamiento superior derecha
- **`translate-middle`**: Centrado perfecto

---

## 🏷️ **BADGES (Insignias)**

```html
<span class="badge bg-primary fs-6 px-3 py-2">📧 Email</span>
<span class="badge bg-success fs-6 px-3 py-2">💬 WhatsApp</span>
<span class="badge bg-warning fs-6 px-3 py-2">⏰ 24/7</span>
<span class="badge rounded-pill bg-success">0</span>
```

### **Clases Utilizadas:**
- **`badge`**: Componente base de insignia
- **`bg-primary`**: Fondo azul primario
- **`bg-success`**: Fondo verde éxito
- **`bg-warning`**: Fondo amarillo advertencia
- **`rounded-pill`**: Forma de píldora (completamente redondeada)
- **`fs-6`**: Tamaño de fuente 6
- **`px-3 py-2`**: Padding horizontal 3, vertical 2

---

## 📝 **FORMULARIOS**

### **Estructura de Formulario:**
```html
<form id="loginForm">
    <div class="mb-3">
        <label for="email" class="form-label">Correo Electrónico</label>
        <input type="email" class="form-control" id="email" required>
    </div>
    
    <div class="mb-3">
        <label for="asunto" class="form-label">Asunto</label>
        <select class="form-select" id="asunto" required>
            <option value="">Selecciona un asunto</option>
            <option value="consulta">Consulta General</option>
        </select>
    </div>
    
    <div class="mb-3">
        <label for="contenido" class="form-label">Mensaje</label>
        <textarea class="form-control" id="contenido" rows="5" placeholder="Escribe tu mensaje aquí..." required></textarea>
    </div>
    
    <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="terminos" required>
        <label class="form-check-label" for="terminos">
            Acepto los términos y condiciones
        </label>
    </div>
    
    <div class="d-grid">
        <button type="submit" class="btn btn-gamer btn-lg">Enviar</button>
    </div>
</form>
```

### **Clases de Formulario:**
- **`form-label`**: Etiqueta de formulario
- **`form-control`**: Input de texto, email, teléfono, textarea
- **`form-select`**: Select dropdown
- **`form-check`**: Contenedor de checkbox/radio
- **`form-check-input`**: Input de checkbox/radio
- **`form-check-label`**: Etiqueta de checkbox/radio
- **`form-text`**: Texto de ayuda
- **`mb-3`**: Margen inferior 3
- **`d-grid`**: Display grid (botón ocupa todo el ancho)

---

## 🃏 **CARDS (Tarjetas)**

### **Estructura de Card:**
```html
<div class="card product-card h-100">
    <img src="imagen.jpg" class="card-img-top" alt="Producto" style="height: 200px; object-fit: cover;">
    <div class="card-body d-flex flex-column">
        <h5 class="card-title">Título del Producto</h5>
        <p class="card-text">Descripción del producto</p>
        <div class="mt-auto">
            <div class="product-price mb-3">$299.990</div>
            <button class="btn btn-gamer w-100">Agregar al Carrito</button>
        </div>
    </div>
</div>
```

### **Clases de Card:**
- **`card`**: Componente base de tarjeta
- **`product-card`**: Clase personalizada para productos
- **`h-100`**: Altura 100% (igual altura en filas)
- **`card-img-top`**: Imagen en la parte superior
- **`card-body`**: Cuerpo de la tarjeta
- **`card-title`**: Título de la tarjeta
- **`card-text`**: Texto de la tarjeta
- **`d-flex flex-column`**: Flexbox vertical
- **`mt-auto`**: Margen superior automático (empuja hacia abajo)

---

## 📱 **GRID SYSTEM (Sistema de Rejilla)**

### **Estructura de Columnas:**
```html
<div class="container">
    <div class="row">
        <div class="col-lg-3 col-md-6 mb-4">
            <!-- Contenido -->
        </div>
        <div class="col-lg-6 col-md-8">
            <!-- Contenido -->
        </div>
        <div class="col-lg-3 col-md-4">
            <!-- Contenido -->
        </div>
    </div>
</div>
```

### **Clases de Grid:**
- **`container`**: Contenedor con ancho máximo y centrado
- **`container-fluid`**: Contenedor de ancho completo
- **`row`**: Fila de columnas
- **`col-lg-3`**: 3 columnas en pantallas grandes (≥992px)
- **`col-md-6`**: 6 columnas en pantallas medianas (≥768px)
- **`col-sm-12`**: 12 columnas en pantallas pequeñas (≥576px)
- **`col-12`**: 12 columnas en todas las pantallas
- **`justify-content-center`**: Centrar columnas horizontalmente
- **`align-items-center`**: Centrar columnas verticalmente

---

## 🎠 **CAROUSEL (Carrusel)**

### **Estructura:**
```html
<div id="productsCarousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="4000">
    <div class="carousel-inner">
        <div class="carousel-item active">
            <!-- Contenido del slide -->
        </div>
        <div class="carousel-item">
            <!-- Contenido del slide -->
        </div>
    </div>
    
    <!-- Controles -->
    <button class="carousel-control-prev" type="button" data-bs-target="#productsCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Anterior</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#productsCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Siguiente</span>
    </button>
    
    <!-- Indicadores -->
    <div class="carousel-indicators">
        <button type="button" data-bs-target="#productsCarousel" data-bs-slide-to="0" class="active"></button>
        <button type="button" data-bs-target="#productsCarousel" data-bs-slide-to="1"></button>
    </div>
</div>
```

### **Clases de Carousel:**
- **`carousel`**: Componente base de carrusel
- **`slide`**: Efecto de deslizamiento
- **`carousel-inner`**: Contenedor de slides
- **`carousel-item`**: Slide individual
- **`active`**: Slide activo
- **`carousel-control-prev`**: Botón anterior
- **`carousel-control-next`**: Botón siguiente
- **`carousel-control-prev-icon`**: Icono anterior
- **`carousel-control-next-icon`**: Icono siguiente
- **`carousel-indicators`**: Indicadores de posición
- **`visually-hidden`**: Oculto visualmente (solo para lectores de pantalla)

---

## 🪟 **MODAL (Ventana Emergente)**

### **Estructura:**
```html
<div class="modal fade" id="cartModal" tabindex="-1">
    <div class="modal-dialog modal-lg">
        <div class="modal-content" style="background: #1a1a1a; color: white;">
            <div class="modal-header border-secondary">
                <h5 class="modal-title">
                    <i class="bi bi-cart3 me-2"></i>Carrito de Compras
                </h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <div id="cartContent">
                    <!-- Contenido del modal -->
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-gamer">Proceder al Pago</button>
            </div>
        </div>
    </div>
</div>
```

### **Clases de Modal:**
- **`modal`**: Componente base de modal
- **`fade`**: Efecto de desvanecimiento
- **`modal-dialog`**: Contenedor del modal
- **`modal-lg`**: Modal grande
- **`modal-content`**: Contenido del modal
- **`modal-header`**: Encabezado del modal
- **`modal-title`**: Título del modal
- **`modal-body`**: Cuerpo del modal
- **`modal-footer`**: Pie del modal
- **`border-secondary`**: Borde gris secundario

---

## 📋 **ACCORDION (Acordeón)**

### **Estructura:**
```html
<div class="accordion" id="faqAccordion">
    <div class="accordion-item bg-dark">
        <h2 class="accordion-header">
            <button class="accordion-button bg-dark text-white" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                ¿Cuánto tiempo tarda el envío?
            </button>
        </h2>
        <div id="faq1" class="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
            <div class="accordion-body text-white">
                Los envíos a Santiago tardan 1-2 días hábiles...
            </div>
        </div>
    </div>
</div>
```

### **Clases de Accordion:**
- **`accordion`**: Componente base de acordeón
- **`accordion-item`**: Elemento individual del acordeón
- **`accordion-header`**: Encabezado del elemento
- **`accordion-button`**: Botón del encabezado
- **`accordion-collapse`**: Contenido colapsable
- **`collapse`**: Clase de colapso
- **`show`**: Mostrar contenido (abierto por defecto)
- **`accordion-body`**: Cuerpo del elemento

---

## 🎨 **UTILIDADES DE DISEÑO**

### **Espaciado:**
- **`m-0`** a **`m-5`**: Margen (0-5)
- **`p-0`** a **`p-5`**: Padding (0-5)
- **`mt-1`** a **`mt-5`**: Margen superior
- **`mb-1`** a **`mb-5`**: Margen inferior
- **`ms-1`** a **`ms-5`**: Margen izquierdo
- **`me-1`** a **`me-5`**: Margen derecho
- **`py-1`** a **`py-5`**: Padding vertical
- **`px-1`** a **`px-5`**: Padding horizontal

### **Display:**
- **`d-none`**: Ocultar elemento
- **`d-block`**: Mostrar como bloque
- **`d-flex`**: Display flexbox
- **`d-grid`**: Display grid
- **`d-inline`**: Display inline
- **`d-inline-block`**: Display inline-block

### **Flexbox:**
- **`flex-column`**: Dirección vertical
- **`flex-row`**: Dirección horizontal
- **`justify-content-center`**: Centrar horizontalmente
- **`justify-content-between`**: Espacio entre elementos
- **`align-items-center`**: Centrar verticalmente
- **`flex-grow-1`**: Crecer para llenar espacio

### **Texto:**
- **`text-center`**: Centrar texto
- **`text-start`**: Alinear texto a la izquierda
- **`text-end`**: Alinear texto a la derecha
- **`text-white`**: Color blanco
- **`text-primary`**: Color primario
- **`text-secondary`**: Color secundario
- **`text-muted`**: Color atenuado
- **`text-decoration-none`**: Sin decoración de texto
- **`fw-bold`**: Peso de fuente bold
- **`fs-1`** a **`fs-6`**: Tamaños de fuente

### **Colores de Fondo:**
- **`bg-primary`**: Fondo azul primario
- **`bg-secondary`**: Fondo gris secundario
- **`bg-success`**: Fondo verde éxito
- **`bg-danger`**: Fondo rojo peligro
- **`bg-warning`**: Fondo amarillo advertencia
- **`bg-info`**: Fondo azul información
- **`bg-light`**: Fondo claro
- **`bg-dark`**: Fondo oscuro

### **Bordes:**
- **`border`**: Borde estándar
- **`border-0`**: Sin borde
- **`border-primary`**: Borde color primario
- **`border-secondary`**: Borde color secundario
- **`rounded`**: Bordes redondeados
- **`rounded-3`**: Bordes muy redondeados
- **`rounded-pill`**: Forma de píldora

### **Posicionamiento:**
- **`position-relative`**: Posición relativa
- **`position-absolute`**: Posición absoluta
- **`position-fixed`**: Posición fija
- **`top-0`**: Parte superior
- **`start-0`**: Lado izquierdo
- **`end-0`**: Lado derecho
- **`bottom-0`**: Parte inferior

---

## 🎯 **ICONOS BOOTSTRAP**

### **Iconos Utilizados:**
```html
<i class="bi bi-controller"></i>          <!-- Controlador -->
<i class="bi bi-person-circle"></i>       <!-- Persona -->
<i class="bi bi-box-arrow-in-right"></i>  <!-- Login -->
<i class="bi bi-person-plus"></i>         <!-- Registro -->
<i class="bi bi-cart3"></i>               <!-- Carrito -->
<i class="bi bi-star-fill"></i>           <!-- Estrella -->
<i class="bi bi-play-circle-fill"></i>    <!-- Play -->
<i class="bi bi-grid-3x3-gap-fill"></i>   <!-- Grid -->
<i class="bi bi-headphones"></i>          <!-- Auriculares -->
<i class="bi bi-laptop"></i>              <!-- Laptop -->
<i class="bi bi-person-workspace"></i>    <!-- Escritorio -->
<i class="bi bi-dice-6"></i>              <!-- Dados -->
<i class="bi bi-mouse"></i>               <!-- Mouse -->
<i class="bi bi-square"></i>              <!-- Cuadrado -->
<i class="bi bi-shop"></i>                <!-- Tienda -->
<i class="bi bi-envelope"></i>            <!-- Email -->
<i class="bi bi-telephone"></i>           <!-- Teléfono -->
<i class="bi bi-chat-dots"></i>           <!-- Chat -->
<i class="bi bi-envelope-paper"></i>      <!-- Carta -->
<i class="bi bi-send"></i>                <!-- Enviar -->
<i class="bi bi-info-circle"></i>         <!-- Información -->
<i class="bi bi-shield-check"></i>        <!-- Escudo -->
<i class="bi bi-gift"></i>                <!-- Regalo -->
<i class="bi bi-question-circle"></i>     <!-- Pregunta -->
<i class="bi bi-clock"></i>               <!-- Reloj -->
<i class="bi bi-whatsapp"></i>            <!-- WhatsApp -->
<i class="bi bi-exclamation-triangle"></i> <!-- Advertencia -->
<i class="bi bi-check-circle"></i>        <!-- Éxito -->
<i class="bi bi-dash"></i>                <!-- Menos -->
<i class="bi bi-plus"></i>                <!-- Más -->
<i class="bi bi-trash"></i>               <!-- Basura -->
<i class="bi bi-eye"></i>                 <!-- Ojo -->
<i class="bi bi-cart-plus"></i>           <!-- Agregar carrito -->
<i class="bi bi-cart-check"></i>          <!-- Carrito check -->
<i class="bi bi-image"></i>               <!-- Imagen -->
<i class="bi bi-graph-up"></i>            <!-- Gráfico -->
<i class="bi bi-circle-fill"></i>         <!-- Círculo -->
<i class="bi bi-pencil"></i>              <!-- Lápiz -->
<i class="bi bi-pause"></i>               <!-- Pausa -->
<i class="bi bi-play"></i>                <!-- Play -->
<i class="bi bi-bell"></i>                <!-- Campana -->
<i class="bi bi-check-all"></i>           <!-- Check todos -->
```

---

## 📱 **RESPONSIVE BREAKPOINTS**

### **Tamaños de Pantalla:**
- **`xs`**: < 576px (Extra Small)
- **`sm`**: ≥ 576px (Small)
- **`md`**: ≥ 768px (Medium)
- **`lg`**: ≥ 992px (Large)
- **`xl`**: ≥ 1200px (Extra Large)
- **`xxl`**: ≥ 1400px (Extra Extra Large)

### **Ejemplos de Uso:**
```html
<!-- Diferentes tamaños por pantalla -->
<div class="col-12 col-md-6 col-lg-4 col-xl-3">
    <!-- 12 columnas en móvil, 6 en tablet, 4 en desktop, 3 en pantalla grande -->
</div>

<!-- Texto responsivo -->
<h1 class="display-1 display-md-2 display-lg-3">
    <!-- Tamaño 1 en móvil, 2 en tablet, 3 en desktop -->
</h1>
```

---

## 🎨 **CLASES PERSONALIZADAS**

### **Clases Custom del Proyecto:**
- **`navbar-custom`**: Navbar personalizada
- **`product-card`**: Tarjeta de producto personalizada
- **`btn-gamer`**: Botón con estilo gaming
- **`btn-outline-gamer`**: Botón outline gaming
- **`footer-custom`**: Footer personalizado
- **`hero-section`**: Sección hero personalizada
- **`cart-badge`**: Badge del carrito personalizado

---

## 📊 **RESUMEN DE COMPONENTES UTILIZADOS**

| Componente | Uso en el Proyecto | Archivos |
|------------|-------------------|----------|
| **Navbar** | Navegación principal | Todos los HTML |
| **Cards** | Productos, formularios | index.html, productos.html |
| **Forms** | Login, registro, contacto | login.html, registro.html, contacto.html |
| **Modals** | Carrito de compras | Todos los HTML |
| **Carousel** | Productos destacados | index.html |
| **Accordion** | FAQ | contacto.html |
| **Badges** | Contadores, etiquetas | Todos los HTML |
| **Buttons** | Acciones principales | Todos los HTML |
| **Grid** | Layout responsivo | Todos los HTML |
| **Icons** | Iconografía | Todos los HTML |

---

*Referencia completa de Bootstrap 5 utilizada en Level-Up Gamer*
*Proyecto de tienda gaming desarrollado con HTML5, CSS3, JavaScript y Bootstrap 5*
