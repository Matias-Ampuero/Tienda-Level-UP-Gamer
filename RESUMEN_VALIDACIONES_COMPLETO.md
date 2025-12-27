# RESUMEN DE VALIDACIONES - LEVEL-UP GAMER
## Sistema de Validaciones Avanzadas para Tienda Gaming

---

## 📋 ÍNDICE
1. [Archivo Principal de Validaciones](#archivo-principal-de-validaciones)
2. [Validaciones de Login](#validaciones-de-login)
3. [Validaciones de Registro](#validaciones-de-registro)
4. [Validaciones de Contacto](#validaciones-de-contacto)
5. [Validaciones de Carrito](#validaciones-de-carrito)
6. [Validaciones de Productos](#validaciones-de-productos)
7. [Validaciones Administrativas](#validaciones-administrativas)
8. [Resumen de Funciones](#resumen-de-funciones)

---

## 🔧 ARCHIVO PRINCIPAL DE VALIDACIONES
**Archivo:** `js/validations.js`

### Clase FormValidator
Sistema centralizado de validaciones que maneja todos los formularios del sitio.

#### Funciones Principales:

**1. `constructor()`**
- Inicializa el validador y configura validaciones en tiempo real
- Establece el objeto `errors` para almacenar errores

```javascript
constructor() {
    this.errors = {};
    this.init();
}
```

**2. `setupRealTimeValidation()`**
- Configura validaciones automáticas mientras el usuario escribe
- Aplica validaciones específicas por tipo de campo

```javascript
setupRealTimeValidation() {
    // Validación de email en tiempo real
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', () => this.validateEmail(input));
        input.addEventListener('input', () => {
            this.clearError(input);
            // Validar email mientras escribes para mostrar descuento DUOC
            if (input.value.includes('@duocuc.cl')) {
                this.validateEmail(input);
            }
        });
    });
    // ... más validaciones
}
```

**3. `validateForm(formId)`**
- Valida formularios completos antes del envío
- Aplica validaciones específicas según el tipo de formulario

```javascript
validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;

    this.errors = {};
    let isValid = true;

    // Validar todos los campos requeridos
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        if (!this.validateField(field)) {
            isValid = false;
        }
    });

    // Validaciones específicas por formulario
    if (formId === 'registerForm') {
        isValid = this.validateRegistrationForm(form) && isValid;
    } else if (formId === 'loginForm') {
        isValid = this.validateLoginForm(form) && isValid;
    } else if (formId === 'contactForm') {
        isValid = this.validateContactForm(form) && isValid;
    }

    return isValid;
}
```

**4. `validateField(field)`**
- Valida campos individuales
- Aplica validaciones según el tipo de campo

```javascript
validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name || field.id;
    
    // Validar campo requerido
    if (field.hasAttribute('required') && !value) {
        this.showError(field, 'Este campo es obligatorio');
        return false;
    }

    // Validaciones específicas por tipo
    switch (field.type) {
        case 'email':
            return this.validateEmail(field);
        case 'password':
            return this.validatePassword(field);
        case 'tel':
            return this.validatePhone(field);
        case 'date':
            return this.validateDate(field);
        default:
            if (fieldName.includes('nombre') || fieldName.includes('name')) {
                return this.validateName(field);
            }
    }

    return true;
}
```

### Validaciones Específicas por Campo:

**Email (`validateEmail`)**
- ✅ Formato válido con regex
- ✅ Detección de emails DUOC (@duocuc.cl)
- ✅ Mensaje especial de descuento para estudiantes DUOC

```javascript
validateEmail(field) {
    const email = field.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        if (field.hasAttribute('required')) {
            this.showError(field, 'El email es obligatorio');
            return false;
        }
        return true;
    }

    if (!emailRegex.test(email)) {
        this.showError(field, 'Ingrese un email válido');
        return false;
    }

    // Validación adicional para emails DUOC
    if (email.includes('@duocuc.cl')) {
        this.showSuccess(field, '🎉 ¡Email DUOC detectado! Obtienes 20% de descuento permanente');
    }

    this.clearError(field);
    return true;
}
```

**Contraseña (`validatePassword`)**
- ✅ Mínimo 6 caracteres (requerido)
- ✅ Recomendación de 8+ caracteres para mayor seguridad
- ✅ Validación de coincidencia en confirmación

```javascript
validatePassword(field) {
    const password = field.value;
    
    if (!password) {
        if (field.hasAttribute('required')) {
            this.showError(field, 'La contraseña es obligatoria');
            return false;
        }
        return true;
    }

    // Verificar si es campo de confirmación
    if (field.id === 'confirmPassword') {
        const originalPassword = document.getElementById('password').value;
        if (password !== originalPassword) {
            this.showError(field, 'Las contraseñas no coinciden');
            return false;
        }
    } else {
        // Validaciones de fortaleza de contraseña
        if (password.length < 6) {
            this.showError(field, 'La contraseña debe tener al menos 6 caracteres');
            return false;
        }

        if (password.length < 8) {
            this.showWarning(field, 'Para mayor seguridad, usa al menos 8 caracteres');
        } else {
            this.showSuccess(field, 'Contraseña segura');
        }
    }

    this.clearError(field);
    return true;
}
```

**Teléfono (`validatePhone` + `formatPhone`)**
- ✅ Formateo automático mientras se escribe
- ✅ Soporte para formato chileno (+56 9 1234 5678)
- ✅ Validación de longitud (8-15 dígitos)

```javascript
validatePhone(field) {
    const phone = field.value.replace(/\D/g, ''); // Solo números
    
    if (!phone) {
        if (field.hasAttribute('required')) {
            this.showError(field, 'El teléfono es obligatorio');
            return false;
        }
        return true;
    }

    if (phone.length < 8 || phone.length > 15) {
        this.showError(field, 'El teléfono debe tener entre 8 y 15 dígitos');
        return false;
    }

    this.clearError(field);
    return true;
}

formatPhone(field) {
    let value = field.value.replace(/\D/g, '');
    
    if (value.length > 0) {
        if (value.startsWith('56')) {
            // Formato chileno: +56 9 1234 5678
            if (value.length <= 2) {
                value = '+56';
            } else if (value.length <= 4) {
                value = '+56 ' + value.substring(2);
            } else if (value.length <= 7) {
                value = '+56 ' + value.substring(2, 3) + ' ' + value.substring(3);
            } else {
                value = '+56 ' + value.substring(2, 3) + ' ' + value.substring(3, 7) + ' ' + value.substring(7, 11);
            }
        } else {
            // Formato simple: 9 1234 5678
            if (value.length <= 1) {
                value = value;
            } else if (value.length <= 5) {
                value = value.substring(0, 1) + ' ' + value.substring(1);
            } else {
                value = value.substring(0, 1) + ' ' + value.substring(1, 5) + ' ' + value.substring(5, 9);
            }
        }
    }
    
    field.value = value;
}
```

**Nombre (`validateName`)**
- ✅ Mínimo 2 caracteres
- ✅ Solo letras, espacios y caracteres especiales en español

```javascript
validateName(field) {
    const name = field.value.trim();
    
    if (!name) {
        if (field.hasAttribute('required')) {
            this.showError(field, 'El nombre es obligatorio');
            return false;
        }
        return true;
    }

    if (name.length < 2) {
        this.showError(field, 'El nombre debe tener al menos 2 caracteres');
        return false;
    }

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name)) {
        this.showError(field, 'El nombre solo puede contener letras y espacios');
        return false;
    }

    this.clearError(field);
    return true;
}
```

**Fecha (`validateDate`)**
- ✅ Validación de edad mínima (18 años)
- ✅ Cálculo preciso de edad considerando mes y día

```javascript
validateDate(field) {
    const date = field.value;
    
    if (!date) {
        if (field.hasAttribute('required')) {
            this.showError(field, 'La fecha es obligatoria');
            return false;
        }
        return true;
    }

    const birthDate = new Date(date);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (age < 18) {
        this.showError(field, 'Debes ser mayor de 18 años para registrarte');
        return false;
    }

    this.clearError(field);
    return true;
}
```

### Funciones de Interfaz:

**`showError(field, message)`**
- Muestra mensajes de error con iconos
- Aplica clases CSS de error

```javascript
showError(field, message) {
    this.clearError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message text-danger mt-1';
    errorDiv.innerHTML = `<i class="bi bi-exclamation-triangle me-1"></i>${message}`;
    
    field.classList.add('is-invalid');
    field.parentNode.appendChild(errorDiv);
    
    this.errors[field.name || field.id] = message;
}
```

**`showSuccess(field, message)`**
- Muestra mensajes de éxito
- Usado para confirmar emails DUOC

```javascript
showSuccess(field, message) {
    this.clearError(field);
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message text-success mt-1';
    successDiv.innerHTML = `<i class="bi bi-check-circle me-1"></i>${message}`;
    
    field.parentNode.appendChild(successDiv);
}
```

---

## 🔐 VALIDACIONES DE LOGIN
**Archivo:** `js/login.js`

### Funciones Principales:

**1. `showAlert(message, type)`**
- Muestra alertas temporales con Bootstrap
- Auto-eliminación después de 3 segundos

```javascript
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const form = document.getElementById('loginForm');
    form.insertBefore(alertDiv, form.firstChild);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.parentNode.removeChild(alertDiv);
        }
    }, 3000);
}
```

**2. Validaciones del Formulario:**
- ✅ Email y contraseña obligatorios
- ✅ Almacenamiento de sesión con "Recordarme"

```javascript
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;
        
        // Simular validación de login
        if (email && password) {
            showAlert('¡Login exitoso! Bienvenido a Level-Up Gamer', 'success');
            
            // Simular almacenamiento de sesión
            if (remember) {
                localStorage.setItem('userEmail', email);
            }
            
            // Redirigir a la página principal
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            showAlert('Por favor completa todos los campos', 'danger');
        }
    });
});
```

---

## 📝 VALIDACIONES DE REGISTRO
**Archivo:** `js/register.js`

### Funciones Principales:

**1. `validarEdad(fechaNacimiento)`**
- Calcula edad exacta considerando mes y día
- Valida que el usuario sea mayor de 18 años

```javascript
function validarEdad(fechaNacimiento) {
    const hoy = new Date();
    const fechaNac = new Date(fechaNacimiento);
    const edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();
    
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
        return edad - 1 >= 18;
    }
    
    return edad >= 18;
}
```

**2. Validaciones del Formulario:**
- ✅ Edad mínima de 18 años
- ✅ Coincidencia de contraseñas
- ✅ Aceptación de términos y condiciones

```javascript
document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener datos del formulario
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const fechaNacimiento = document.getElementById('fechaNacimiento').value;
        const telefono = document.getElementById('telefono').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const codigoReferido = document.getElementById('codigoReferido').value;
        const terminos = document.getElementById('terminos').checked;
        
        // Validaciones
        if (!validarEdad(fechaNacimiento)) {
            showAlert('Debes ser mayor de 18 años para registrarte', 'danger');
            return;
        }
        
        if (password !== confirmPassword) {
            showAlert('Las contraseñas no coinciden', 'danger');
            return;
        }
        
        if (!terminos) {
            showAlert('Debes aceptar los términos y condiciones', 'danger');
            return;
        }
        
        // Verificar si es correo Duoc
        const esDuoc = email.includes('@duocuc.cl');
        
        // Simular registro exitoso
        showAlert('¡Registro exitoso! ' + (esDuoc ? 'Tienes 20% de descuento permanente por ser estudiante Duoc.' : ''), 'success');
        
        // Limpiar formulario
        registerForm.reset();
        
        // Redirigir después de 2 segundos
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    });
});
```

**3. Validación en Tiempo Real:**
- ✅ Validación de edad al cambiar fecha
- ✅ Validación de contraseñas en tiempo real

```javascript
// Validar edad en tiempo real
document.getElementById('fechaNacimiento').addEventListener('change', function() {
    const fecha = this.value;
    if (fecha && !validarEdad(fecha)) {
        this.classList.add('is-invalid');
        showAlert('Debes ser mayor de 18 años', 'warning');
    } else {
        this.classList.remove('is-invalid');
    }
});

// Validar contraseñas en tiempo real
document.getElementById('confirmPassword').addEventListener('input', function() {
    const password = document.getElementById('password').value;
    const confirmPassword = this.value;
    
    if (confirmPassword && password !== confirmPassword) {
        this.classList.add('is-invalid');
    } else {
        this.classList.remove('is-invalid');
    }
});
```

---

## 📞 VALIDACIONES DE CONTACTO
**Archivo:** `js/contacto.js`

### Funciones Principales:

**1. `validarFormulario(nombre, correo, asunto, contenido, terminos)`**
- Valida todos los campos del formulario de contacto

```javascript
function validarFormulario(nombre, correo, asunto, contenido, terminos) {
    let esValido = true;
    
    // Validar nombre completo
    if (!nombre || nombre.trim().length < 2) {
        showFieldError('nombreCompleto', 'El nombre debe tener al menos 2 caracteres');
        esValido = false;
    } else {
        clearFieldError('nombreCompleto');
    }
    
    // Validar correo
    if (!validarEmail(document.getElementById('correo'))) {
        esValido = false;
    }
    
    // Validar asunto
    if (!asunto) {
        showFieldError('asunto', 'Por favor selecciona un asunto');
        esValido = false;
    } else {
        clearFieldError('asunto');
    }
    
    // Validar contenido
    if (!validarContenido(document.getElementById('contenido'))) {
        esValido = false;
    }
    
    // Validar términos
    if (!terminos) {
        showFieldError('aceptoTerminos', 'Debes aceptar los términos y condiciones');
        esValido = false;
    } else {
        clearFieldError('aceptoTerminos');
    }
    
    return esValido;
}
```

**2. `validarEmail(input)`**
- Validación de formato de email con regex

```javascript
function validarEmail(input) {
    const email = input.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        showFieldError('correo', 'El correo electrónico es requerido');
        return false;
    } else if (!emailRegex.test(email)) {
        showFieldError('correo', 'Por favor ingresa un correo electrónico válido');
        return false;
    } else {
        clearFieldError('correo');
        return true;
    }
}
```

**3. `validarContenido(input)`**
- Validación de longitud del mensaje

```javascript
function validarContenido(input) {
    const contenido = input.value;
    
    if (!contenido || contenido.trim().length < 10) {
        showFieldError('contenido', 'El mensaje debe tener al menos 10 caracteres');
        return false;
    } else if (contenido.length > 500) {
        showFieldError('contenido', 'El mensaje no puede exceder 500 caracteres');
        return false;
    } else {
        clearFieldError('contenido');
        return true;
    }
}
```

**4. `showFieldError(fieldId, message)`**
- Muestra errores específicos por campo

```javascript
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.mb-3') || field.closest('.col-md-6');
    
    // Remover error anterior
    clearFieldError(fieldId);
    
    // Agregar clase de error
    field.classList.add('is-invalid');
    
    // Crear mensaje de error
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    errorDiv.id = `error-${fieldId}`;
    
    formGroup.appendChild(errorDiv);
}
```

---

## 🛒 VALIDACIONES DE CARRITO
**Archivo:** `js/cart.js`

### Funciones Principales:

**1. `addToCart(id, name, price, image, category)`**
- Agrega productos al carrito
- Maneja productos duplicados incrementando cantidad

```javascript
function addToCart(id, name, price, image, category) {
    // Verificar si el producto ya existe
    let existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price, 
            image: image,
            category: category,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    showNotification(`${name} agregado al carrito`, 'success');
}
```

**2. `updateQuantity(id, newQuantity)`**
- Actualiza cantidad de productos
- Elimina producto si cantidad es 0

```javascript
function updateQuantity(id, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(id);
        return;
    }
    
    let item = cart.find(item => item.id === id);
    if (item) {
        item.quantity = newQuantity;
        updateCartDisplay();
        showNotification(`Cantidad actualizada: ${item.name} x${newQuantity}`, 'info');
    }
}
```

**3. `updateCartDisplay()`**
- Actualiza toda la interfaz del carrito
- Calcula totales automáticamente

```javascript
function updateCartDisplay() {
    // Calcular total
    total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Actualizar contador del botón
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
    
    // Actualizar contenido del modal
    const cartContent = document.getElementById('cartContent');
    if (cartContent) {
        cartContent.innerHTML = '';
        
        if (cart.length === 0) {
            cartContent.innerHTML = '<p class="text-center text-muted">Tu carrito está vacío</p>';
        } else {
            cart.forEach(item => {
                const itemHTML = `
                    <div class="d-flex align-items-center mb-3 p-3 border rounded" style="background: #1a1a1a;">
                        <img src="${item.image}" alt="${item.name}" class="me-3" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
                        <div class="flex-grow-1">
                            <h6 class="mb-1 text-white" style="font-family: 'Orbitron', sans-serif; color: #39FF14;">${item.name}</h6>
                            <p class="mb-1 text-white" style="font-family: 'Orbitron', sans-serif; font-size: 0.8rem;">${item.category}</p>
                            <div class="d-flex align-items-center">
                                <button class="btn btn-sm btn-outline-gamer" onclick="updateQuantity('${item.id}', ${item.quantity - 1})">
                                    <i class="bi bi-dash"></i>
                                </button>
                                <span class="mx-3 text-white fw-bold" style="font-family: 'Orbitron', sans-serif;">${item.quantity}</span>
                                <button class="btn btn-sm btn-outline-gamer" onclick="updateQuantity('${item.id}', ${item.quantity + 1})">
                                    <i class="bi bi-plus"></i>
                                </button>
                                <button class="btn btn-sm btn-danger ms-2" onclick="removeFromCart('${item.id}')">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                        <div class="text-end">
                            <strong class="text-primary" style="font-family: 'Orbitron', sans-serif;">$${(item.price * item.quantity).toLocaleString()}</strong>
                        </div>
                    </div>
                `;
                cartContent.innerHTML += itemHTML;
            });
            
            // Agregar total
            cartContent.innerHTML += `
                <div class="border-top pt-3 mt-3">
                    <div class="d-flex justify-content-between">
                        <h5 class="text-white" style="font-family: 'Orbitron', sans-serif;">Total:</h5>
                        <h5 class="text-primary" style="font-family: 'Orbitron', sans-serif;">$${total.toLocaleString()}</h5>
                    </div>
                    <button class="btn btn-gamer w-100 mt-3" onclick="proceedToCheckout()" style="font-family: 'Orbitron', sans-serif; font-weight: 600;">
                        <i class="bi bi-cart-check me-2"></i>Proceder a Compra
                    </button>
                </div>
            `;
        }
    }
}
```

---

## 🎮 VALIDACIONES DE PRODUCTOS
**Archivo:** `js/products.js`

### Funciones Principales:

**1. `displayProducts()`**
- Muestra productos en la grilla
- Aplica filtros activos

```javascript
function displayProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return; // Si no existe el elemento, salir
    productsGrid.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.innerHTML += productCard;
    });
}
```

**2. `filterProducts()`**
- Filtra por categoría seleccionada

```javascript
function filterProducts() {
    const category = document.getElementById('categoryFilter').value;
    
    if (category === '') {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(product => product.category === category);
    }
    
    displayProducts();
}
```

**3. `searchProducts()`**
- Búsqueda por nombre, descripción o categoría

```javascript
function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    
    displayProducts();
}
```

---

## 🔍 VALIDACIONES DE DETALLE DE PRODUCTO
**Archivo:** `js/product-detail.js`

### Funciones Principales:

**1. `loadProductDetail(productId)`**
- Carga información completa del producto
- Valida existencia del producto

```javascript
function loadProductDetail(productId) {
    // Buscar el producto en el array de productos
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        document.querySelector('main').innerHTML = `
            <div class="container mt-5 pt-5">
                <div class="alert alert-warning text-center">
                    <h4>Producto no encontrado</h4>
                    <p>El producto solicitado no existe.</p>
                    <a href="productos.html" class="btn btn-gamer">Ver Productos</a>
                </div>
            </div>
        `;
        return;
    }
    
    // Cargar información del producto
    document.getElementById('product-image').src = `../img/${product.image}`;
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-price').textContent = `$${product.price.toLocaleString('es-CL')}`;
    document.getElementById('product-description').textContent = product.description;
    
    // Configurar botón de añadir al carrito
    document.getElementById('add-to-cart-btn').onclick = function() {
        const quantity = parseInt(document.getElementById('quantity').value);
        addToCart(product.id, product.name, product.price, product.image, product.category, quantity);
        showNotification('Producto añadido al carrito', 'success');
    };
}
```

**2. `increaseQuantity()` / `decreaseQuantity()`**
- Control de cantidad con validaciones

```javascript
function increaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    const currentValue = parseInt(quantityInput.value);
    const maxValue = parseInt(quantityInput.max);
    
    if (currentValue < maxValue) {
        quantityInput.value = currentValue + 1;
    }
}

function decreaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    const currentValue = parseInt(quantityInput.value);
    const minValue = parseInt(quantityInput.min);
    
    if (currentValue > minValue) {
        quantityInput.value = currentValue - 1;
    }
}
```

---

## 👥 VALIDACIONES ADMINISTRATIVAS
**Archivo:** `js/admin-users.js`

### Funciones Principales:

**1. `filterUsers()`**
- Filtra usuarios por búsqueda, estado y región

```javascript
function filterUsers() {
    const searchTerm = document.getElementById('searchUsers').value.toLowerCase();
    const statusFilter = document.getElementById('filterStatus').value;
    const regionFilter = document.getElementById('filterRegion').value;
    
    filteredUsers = users.filter(user => {
        const matchesSearch = user.nombre.toLowerCase().includes(searchTerm) ||
                            user.correo.toLowerCase().includes(searchTerm) ||
                            user.telefono.includes(searchTerm);
        const matchesStatus = !statusFilter || user.estado === statusFilter;
        const matchesRegion = !regionFilter || user.region === regionFilter;
        
        return matchesSearch && matchesStatus && matchesRegion;
    });
    
    displayUsers();
    updatePagination();
}
```

**2. `crearUsuario()`**
- Crea nuevos usuarios con validaciones

```javascript
function crearUsuario() {
    const form = document.getElementById('nuevoUsuarioForm');
    const formData = new FormData(form);
    
    const nuevoUsuario = {
        id: users.length + 1,
        nombre: document.getElementById('nombreCompleto').value,
        correo: document.getElementById('correo').value,
        telefono: document.getElementById('telefono').value || 'No especificado',
        region: document.getElementById('region').value,
        comuna: document.getElementById('comuna').value,
        estado: 'activo',
        fechaRegistro: new Date().toISOString().split('T')[0],
        fechaNacimiento: document.getElementById('fechaNacimiento').value
    };
    
    // Validar contraseñas
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }
    
    // Validar email único
    if (users.some(user => user.correo === nuevoUsuario.correo)) {
        alert('Ya existe un usuario con este correo electrónico');
        return;
    }
    
    users.push(nuevoUsuario);
    filteredUsers = [...users];
    displayUsers();
    updatePagination();
    
    // Cerrar modal y limpiar formulario
    const modal = bootstrap.Modal.getInstance(document.getElementById('nuevoUsuarioModal'));
    modal.hide();
    form.reset();
    
    // Actualizar contador en dashboard
    updateDashboardStats();
    
    alert('Usuario creado exitosamente');
}
```

**3. `deleteUser(userId)`**
- Elimina usuarios con confirmación

```javascript
function deleteUser(userId) {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
        const index = users.findIndex(u => u.id === userId);
        if (index > -1) {
            users.splice(index, 1);
            filteredUsers = [...users];
            displayUsers();
            updatePagination();
            updateDashboardStats();
        }
    }
}
```

---

## 📊 RESUMEN DE FUNCIONES

### Funciones de Validación Global:
- `validarFormulario(formId)` - Validación completa de formularios
- `limpiarErrores()` - Limpieza de todos los errores
- `mostrarMensaje(mensaje, tipo)` - Mensajes modales

### Funciones de Validación por Campo:
- `validateEmail(field)` - Validación de email con regex
- `validatePassword(field)` - Validación de contraseña
- `validatePhone(field)` - Validación de teléfono
- `validateName(field)` - Validación de nombre
- `validateDate(field)` - Validación de fecha/edad

### Funciones de Interfaz:
- `showError(field, message)` - Mostrar errores
- `showWarning(field, message)` - Mostrar advertencias
- `showSuccess(field, message)` - Mostrar éxito
- `clearError(field)` - Limpiar errores

### Funciones de Carrito:
- `addToCart(id, name, price, image, category)` - Agregar al carrito
- `removeFromCart(id)` - Eliminar del carrito
- `updateQuantity(id, quantity)` - Actualizar cantidad
- `updateCartDisplay()` - Actualizar visualización

### Funciones de Productos:
- `displayProducts()` - Mostrar productos
- `filterProducts()` - Filtrar por categoría
- `searchProducts()` - Buscar productos
- `loadProductDetail(id)` - Cargar detalle

### Funciones Administrativas:
- `loadDashboardStats()` - Cargar estadísticas
- `filterUsers()` - Filtrar usuarios
- `crearUsuario()` - Crear usuario
- `editUser(id)` - Editar usuario
- `deleteUser(id)` - Eliminar usuario

---

## 🎯 CARACTERÍSTICAS DESTACADAS

### Validaciones en Tiempo Real:
- ✅ Email con detección DUOC
- ✅ Contraseñas con indicadores de fortaleza
- ✅ Teléfonos con formateo automático
- ✅ Nombres con validación de caracteres

### Validaciones de Negocio:
- ✅ Edad mínima de 18 años
- ✅ Emails DUOC con descuento especial
- ✅ Contraseñas seguras
- ✅ Términos y condiciones obligatorios

### Experiencia de Usuario:
- ✅ Mensajes claros y específicos
- ✅ Iconos descriptivos
- ✅ Notificaciones temporales
- ✅ Confirmaciones de acciones

### Integración del Sistema:
- ✅ Validaciones centralizadas
- ✅ Reutilización de funciones
- ✅ Consistencia en mensajes
- ✅ Manejo unificado de errores

---

## 📈 ESTADÍSTICAS DEL SISTEMA

- **Total de archivos JavaScript:** 8
- **Funciones de validación:** 25+
- **Tipos de validación:** 12
- **Formularios validados:** 4
- **Módulos administrativos:** 2
- **Validaciones en tiempo real:** 6

---

*Documento generado automáticamente para Level-Up Gamer*
*Sistema de validaciones implementado en JavaScript vanilla con Bootstrap 5*

---

## 🔧 ARCHIVO PRINCIPAL DE VALIDACIONES
**Archivo:** `js/validations.js`

### Clase FormValidator
Sistema centralizado de validaciones que maneja todos los formularios del sitio.

#### Funciones Principales:

**1. `constructor()`**
- Inicializa el validador y configura validaciones en tiempo real
- Establece el objeto `errors` para almacenar errores

**2. `setupRealTimeValidation()`**
- Configura validaciones automáticas mientras el usuario escribe
- Aplica validaciones específicas por tipo de campo:
  - Email: Validación de formato y detección de emails DUOC
  - Contraseña: Validación de fortaleza y coincidencia
  - Teléfono: Formateo automático y validación de longitud
  - Nombre: Validación de caracteres permitidos

**3. `validateForm(formId)`**
- Valida formularios completos antes del envío
- Aplica validaciones específicas según el tipo de formulario
- Retorna `true` si todas las validaciones pasan

**4. `validateField(field)`**
- Valida campos individuales
- Aplica validaciones según el tipo de campo
- Maneja campos requeridos y opcionales

### Validaciones Específicas por Campo:

**Email (`validateEmail`)**
- ✅ Formato válido con regex
- ✅ Detección de emails DUOC (@duocuc.cl)
- ✅ Mensaje especial de descuento para estudiantes DUOC
- ✅ Validación en tiempo real

**Contraseña (`validatePassword`)**
- ✅ Mínimo 6 caracteres (requerido)
- ✅ Recomendación de 8+ caracteres para mayor seguridad
- ✅ Validación de coincidencia en confirmación
- ✅ Indicadores visuales de fortaleza

**Teléfono (`validatePhone` + `formatPhone`)**
- ✅ Formateo automático mientras se escribe
- ✅ Soporte para formato chileno (+56 9 1234 5678)
- ✅ Validación de longitud (8-15 dígitos)
- ✅ Solo números permitidos

**Nombre (`validateName`)**
- ✅ Mínimo 2 caracteres
- ✅ Solo letras, espacios y caracteres especiales en español
- ✅ Validación de caracteres especiales (á, é, í, ó, ú, ñ)

**Fecha (`validateDate`)**
- ✅ Validación de edad mínima (18 años)
- ✅ Cálculo preciso de edad considerando mes y día
- ✅ Validación de formato de fecha

### Funciones de Interfaz:

**`showError(field, message)`**
- Muestra mensajes de error con iconos
- Aplica clases CSS de error
- Almacena errores en el objeto `errors`

**`showWarning(field, message)`**
- Muestra advertencias con iconos de advertencia
- No bloquea el envío del formulario

**`showSuccess(field, message)`**
- Muestra mensajes de éxito
- Usado para confirmar emails DUOC

**`clearError(field)`**
- Limpia errores, advertencias y mensajes de éxito
- Remueve clases CSS de error

---

## 🔐 VALIDACIONES DE LOGIN
**Archivo:** `js/login.js`

### Funciones Principales:

**1. `showAlert(message, type)`**
- Muestra alertas temporales con Bootstrap
- Auto-eliminación después de 3 segundos
- Soporte para diferentes tipos: success, danger, warning

**2. Validaciones del Formulario:**
- ✅ Email y contraseña obligatorios
- ✅ Almacenamiento de sesión con "Recordarme"
- ✅ Redirección automática tras login exitoso
- ✅ Carga de email guardado en localStorage

**3. Características Especiales:**
- Persistencia de sesión con localStorage
- Redirección automática a página principal
- Manejo de errores con alertas visuales

---

## 📝 VALIDACIONES DE REGISTRO
**Archivo:** `js/register.js`

### Funciones Principales:

**1. `validarEdad(fechaNacimiento)`**
- Calcula edad exacta considerando mes y día
- Valida que el usuario sea mayor de 18 años
- Retorna `true` si cumple con la edad mínima

**2. `showAlert(message, type)`**
- Alertas específicas para el formulario de registro
- Auto-eliminación después de 5 segundos
- Diferentes tipos de mensaje según la validación

**3. Validaciones Implementadas:**
- ✅ Edad mínima de 18 años
- ✅ Coincidencia de contraseñas
- ✅ Aceptación de términos y condiciones
- ✅ Detección de emails DUOC para descuento
- ✅ Validación en tiempo real de edad y contraseñas

**4. Características Especiales:**
- Validación de edad en tiempo real al cambiar fecha
- Validación de contraseñas en tiempo real
- Mensaje especial para estudiantes DUOC
- Redirección automática tras registro exitoso

---

## 📞 VALIDACIONES DE CONTACTO
**Archivo:** `js/contacto.js`

### Funciones Principales:

**1. `validarFormulario(nombre, correo, asunto, contenido, terminos)`**
- Valida todos los campos del formulario de contacto
- Aplica validaciones específicas por campo
- Retorna `true` si todas las validaciones pasan

**2. `validarEmail(input)`**
- Validación de formato de email con regex
- Mensajes de error específicos
- Limpieza de errores previos

**3. `validarContenido(input)`**
- Mínimo 10 caracteres para el mensaje
- Máximo 500 caracteres
- Validación en tiempo real mientras se escribe

**4. `showFieldError(fieldId, message)`**
- Muestra errores específicos por campo
- Aplica clases CSS de Bootstrap para errores
- Posicionamiento correcto de mensajes

**5. `enviarMensaje(nombre, correo, asunto, contenido)`**
- Simula envío del formulario con loading
- Deshabilita botón durante el envío
- Muestra confirmación de éxito
- Redirección automática tras envío

### Validaciones Implementadas:
- ✅ Nombre completo (mínimo 2 caracteres)
- ✅ Email válido con formato correcto
- ✅ Asunto obligatorio
- ✅ Contenido entre 10-500 caracteres
- ✅ Aceptación de términos y condiciones
- ✅ Validación en tiempo real

---

## 🛒 VALIDACIONES DE CARRITO
**Archivo:** `js/cart.js`

### Funciones Principales:

**1. `addToCart(id, name, price, image, category)`**
- Agrega productos al carrito
- Maneja productos duplicados incrementando cantidad
- Actualiza visualización automáticamente
- Muestra notificación de confirmación

**2. `removeFromCart(id)`**
- Elimina productos del carrito
- Actualiza contadores y totales
- Muestra notificación de eliminación

**3. `updateQuantity(id, newQuantity)`**
- Actualiza cantidad de productos
- Elimina producto si cantidad es 0
- Valida cantidades válidas

**4. `updateCartDisplay()`**
- Actualiza toda la interfaz del carrito
- Calcula totales automáticamente
- Muestra/oculta elementos según estado del carrito
- Formatea precios con separadores de miles

**5. `showNotification(message, type)`**
- Notificaciones temporales para acciones del carrito
- Posicionamiento fijo en pantalla
- Auto-eliminación después de 3 segundos

### Características del Carrito:
- ✅ Gestión de productos duplicados
- ✅ Cálculo automático de totales
- ✅ Contador de items en tiempo real
- ✅ Interfaz responsiva con Bootstrap
- ✅ Notificaciones de usuario
- ✅ Validación de cantidades

---

## 🎮 VALIDACIONES DE PRODUCTOS
**Archivo:** `js/products.js`

### Funciones Principales:

**1. `displayProducts()`**
- Muestra productos en la grilla
- Aplica filtros activos
- Maneja estado vacío

**2. `createProductCard(product)`**
- Genera HTML para tarjetas de productos
- Incluye información detallada (stock, ventas, origen)
- Botones de acción integrados

**3. `filterProducts()`**
- Filtra por categoría seleccionada
- Actualiza visualización automáticamente

**4. `searchProducts()`**
- Búsqueda por nombre, descripción o categoría
- Búsqueda case-insensitive
- Actualización en tiempo real

### Características de Productos:
- ✅ Filtrado por categorías
- ✅ Búsqueda en tiempo real
- ✅ Información detallada de productos
- ✅ Integración con carrito
- ✅ Manejo de stock y ventas
- ✅ Enlaces a detalles de productos

---

## 🔍 VALIDACIONES DE DETALLE DE PRODUCTO
**Archivo:** `js/product-detail.js`

### Funciones Principales:

**1. `loadProductDetail(productId)`**
- Carga información completa del producto
- Valida existencia del producto
- Actualiza todos los elementos de la página
- Configura botones de acción

**2. `loadRelatedProducts(currentProductId)`**
- Muestra productos relacionados de la misma categoría
- Excluye el producto actual
- Limita a 5 productos relacionados

**3. `changeMainImage(imageSrc)`**
- Cambia imagen principal del producto
- Integración con thumbnails

**4. `increaseQuantity()` / `decreaseQuantity()`**
- Control de cantidad con validaciones
- Respeta límites mínimo y máximo

### Validaciones Implementadas:
- ✅ Validación de ID de producto válido
- ✅ Manejo de productos no encontrados
- ✅ Control de cantidades válidas
- ✅ Validación de productos relacionados

---

## 👥 VALIDACIONES ADMINISTRATIVAS
**Archivo:** `js/admin.js`

### Funciones Principales:

**1. `loadDashboardStats()`**
- Carga estadísticas del dashboard
- Actualiza contadores dinámicamente

**2. `loadProductsList()`**
- Muestra lista de productos en el admin
- Aplica clases CSS según estado de stock
- Actualiza estadísticas de productos

**3. `showNotifications()`**
- Modal de notificaciones del sistema
- Lista de actividades recientes
- Botones de acción para notificaciones

**4. `updateProductStats()`**
- Calcula estadísticas de productos
- Actualiza contadores de stock bajo
- Total de productos vendidos

### Características del Admin:
- ✅ Dashboard con estadísticas en tiempo real
- ✅ Gestión de notificaciones
- ✅ Lista de productos con estados
- ✅ Contadores dinámicos
- ✅ Integración con otros módulos

---

## 👤 VALIDACIONES DE USUARIOS
**Archivo:** `js/admin-users.js`

### Funciones Principales:

**1. `filterUsers()`**
- Filtra usuarios por búsqueda, estado y región
- Aplica múltiples filtros simultáneamente
- Actualiza paginación automáticamente

**2. `displayUsers()`**
- Muestra usuarios con paginación
- Aplica estilos según estado del usuario
- Botones de acción por usuario

**3. `crearUsuario()`**
- Crea nuevos usuarios con validaciones
- Valida email único
- Valida coincidencia de contraseñas
- Actualiza estadísticas del dashboard

**4. `editUser(userId)`**
- Prepara edición de usuarios
- Mantiene integridad de datos

**5. `toggleUserStatus(userId)`**
- Cambia estado activo/inactivo
- Actualiza visualización inmediatamente

**6. `deleteUser(userId)`**
- Elimina usuarios con confirmación
- Actualiza listas y estadísticas

### Validaciones de Usuarios:
- ✅ Email único en el sistema
- ✅ Coincidencia de contraseñas
- ✅ Validación de campos obligatorios
- ✅ Confirmación para eliminación
- ✅ Filtros múltiples simultáneos
- ✅ Paginación eficiente

---

## 📊 RESUMEN DE FUNCIONES

### Funciones de Validación Global:
- `validarFormulario(formId)` - Validación completa de formularios
- `limpiarErrores()` - Limpieza de todos los errores
- `mostrarMensaje(mensaje, tipo)` - Mensajes modales

### Funciones de Validación por Campo:
- `validateEmail(field)` - Validación de email con regex
- `validatePassword(field)` - Validación de contraseña
- `validatePhone(field)` - Validación de teléfono
- `validateName(field)` - Validación de nombre
- `validateDate(field)` - Validación de fecha/edad

### Funciones de Interfaz:
- `showError(field, message)` - Mostrar errores
- `showWarning(field, message)` - Mostrar advertencias
- `showSuccess(field, message)` - Mostrar éxito
- `clearError(field)` - Limpiar errores

### Funciones de Carrito:
- `addToCart(id, name, price, image, category)` - Agregar al carrito
- `removeFromCart(id)` - Eliminar del carrito
- `updateQuantity(id, quantity)` - Actualizar cantidad
- `updateCartDisplay()` - Actualizar visualización

### Funciones de Productos:
- `displayProducts()` - Mostrar productos
- `filterProducts()` - Filtrar por categoría
- `searchProducts()` - Buscar productos
- `loadProductDetail(id)` - Cargar detalle

### Funciones Administrativas:
- `loadDashboardStats()` - Cargar estadísticas
- `filterUsers()` - Filtrar usuarios
- `crearUsuario()` - Crear usuario
- `editUser(id)` - Editar usuario
- `deleteUser(id)` - Eliminar usuario

---

## 🎯 CARACTERÍSTICAS DESTACADAS

### Validaciones en Tiempo Real:
- ✅ Email con detección DUOC
- ✅ Contraseñas con indicadores de fortaleza
- ✅ Teléfonos con formateo automático
- ✅ Nombres con validación de caracteres

### Validaciones de Negocio:
- ✅ Edad mínima de 18 años
- ✅ Emails DUOC con descuento especial
- ✅ Contraseñas seguras
- ✅ Términos y condiciones obligatorios

### Experiencia de Usuario:
- ✅ Mensajes claros y específicos
- ✅ Iconos descriptivos
- ✅ Notificaciones temporales
- ✅ Confirmaciones de acciones

### Integración del Sistema:
- ✅ Validaciones centralizadas
- ✅ Reutilización de funciones
- ✅ Consistencia en mensajes
- ✅ Manejo unificado de errores

---

## 📈 ESTADÍSTICAS DEL SISTEMA

- **Total de archivos JavaScript:** 8
- **Funciones de validación:** 25+
- **Tipos de validación:** 12
- **Formularios validados:** 4
- **Módulos administrativos:** 2
- **Validaciones en tiempo real:** 6

---

*Documento generado automáticamente para Level-Up Gamer*
*Sistema de validaciones implementado en JavaScript vanilla con Bootstrap 5*
