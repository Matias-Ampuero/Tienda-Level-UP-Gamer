# EXPLICACIÓN DETALLADA DE FUNCIONES - LEVEL-UP GAMER
## ¿Qué hace cada función y línea de código?

---

## 🔧 **VALIDACIONES CENTRALIZADAS** (`js/validations.js`)

### **Clase FormValidator**

```javascript
constructor() {
    this.errors = {};  // Crea un objeto vacío para almacenar errores
    this.init();       // Llama a la función de inicialización
}
```
- **`this.errors = {}`**: Crea un objeto vacío donde se guardarán todos los errores de validación
- **`this.init()`**: Ejecuta la función que configura las validaciones automáticas

---

```javascript
validateForm(formId) {
    const form = document.getElementById(formId);  // Busca el formulario por su ID
    if (!form) return false;                      // Si no existe, retorna falso
    
    this.errors = {};                             // Limpia errores anteriores
    let isValid = true;                           // Variable para saber si todo está bien
    
    const requiredFields = form.querySelectorAll('[required]');  // Encuentra todos los campos obligatorios
    requiredFields.forEach(field => {             // Para cada campo obligatorio:
        if (!this.validateField(field)) {         // Si la validación falla:
            isValid = false;                      // Marca como inválido
        }
    });
    
    return isValid;                               // Retorna si el formulario es válido o no
}
```
- **`document.getElementById(formId)`**: Busca el formulario en el HTML usando su ID
- **`form.querySelectorAll('[required]')`**: Encuentra todos los campos que tienen el atributo "required"
- **`forEach`**: Recorre cada campo encontrado uno por uno
- **`isValid`**: Variable que se mantiene en `true` solo si todos los campos son válidos

---

### **Validación de Email**

```javascript
validateEmail(field) {
    const email = field.value.trim();                    // Obtiene el valor del campo y quita espacios
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;    // Patrón para validar formato de email
    
    if (!emailRegex.test(email)) {                      // Si el email no coincide con el patrón:
        this.showError(field, 'Ingrese un email válido');  // Muestra error
        return false;                                   // Retorna falso
    }
    
    if (email.includes('@duocuc.cl')) {                 // Si el email es de DUOC:
        this.showSuccess(field, '🎉 ¡Email DUOC detectado! Obtienes 20% de descuento');  // Muestra mensaje especial
    }
    
    return true;                                        // Si todo está bien, retorna verdadero
}
```
- **`field.value.trim()`**: Obtiene el texto del campo y elimina espacios al inicio y final
- **`emailRegex`**: Es una expresión regular que verifica que el email tenga formato válido (texto@texto.texto)
- **`emailRegex.test(email)`**: Prueba si el email coincide con el patrón
- **`email.includes('@duocuc.cl')`**: Verifica si el email contiene "@duocuc.cl"

---

### **Validación de Contraseña**

```javascript
validatePassword(field) {
    const password = field.value;                       // Obtiene el valor del campo contraseña
    
    if (password.length < 6) {                         // Si la contraseña tiene menos de 6 caracteres:
        this.showError(field, 'La contraseña debe tener al menos 6 caracteres');  // Muestra error
        return false;                                  // Retorna falso
    }
    
    if (password.length < 8) {                         // Si tiene menos de 8 caracteres:
        this.showWarning(field, 'Para mayor seguridad, usa al menos 8 caracteres');  // Muestra advertencia
    } else {                                           // Si tiene 8 o más:
        this.showSuccess(field, 'Contraseña segura');  // Muestra mensaje de éxito
    }
    
    return true;                                       // Retorna verdadero
}
```
- **`password.length`**: Cuenta cuántos caracteres tiene la contraseña
- **`< 6`**: Verifica si es menor a 6 caracteres
- **`< 8`**: Verifica si es menor a 8 caracteres (recomendación de seguridad)

---

### **Formateo de Teléfono**

```javascript
formatPhone(field) {
    let value = field.value.replace(/\D/g, '');        // Quita todos los caracteres que no sean números
    
    if (value.startsWith('56')) {                      // Si empieza con 56 (código de Chile):
        if (value.length <= 2) value = '+56';          // Si solo tiene 2 dígitos: "+56"
        else if (value.length <= 4) value = '+56 ' + value.substring(2);  // Si tiene 3-4: "+56 9"
        else if (value.length <= 7) value = '+56 ' + value.substring(2, 3) + ' ' + value.substring(3);  // Si tiene 5-7: "+56 9 1234"
        else value = '+56 ' + value.substring(2, 3) + ' ' + value.substring(3, 7) + ' ' + value.substring(7, 11);  // Si tiene 8+: "+56 9 1234 5678"
    }
    
    field.value = value;                               // Actualiza el campo con el formato
}
```
- **`replace(/\D/g, '')`**: Reemplaza todos los caracteres que NO sean números con nada (solo deja números)
- **`startsWith('56')`**: Verifica si el número empieza con "56" (código de país de Chile)
- **`substring(2)`**: Toma el texto desde la posición 2 en adelante
- **`substring(2, 3)`**: Toma solo el carácter en la posición 2

---

## 🔐 **LOGIN** (`js/login.js`)

```javascript
document.addEventListener('DOMContentLoaded', function() {  // Cuando la página termine de cargar:
    const loginForm = document.getElementById('loginForm');  // Busca el formulario de login
    
    loginForm.addEventListener('submit', function(e) {      // Cuando se envíe el formulario:
        e.preventDefault();                                 // Evita que se recargue la página
        
        const email = document.getElementById('email').value;        // Obtiene el email
        const password = document.getElementById('password').value;  // Obtiene la contraseña
        const remember = document.getElementById('remember').checked; // Verifica si marcó "recordarme"
        
        if (email && password) {                           // Si ambos campos tienen contenido:
            showAlert('¡Login exitoso! Bienvenido a Level-Up Gamer', 'success');  // Muestra mensaje de éxito
            
            if (remember) {                                // Si marcó "recordarme":
                localStorage.setItem('userEmail', email);  // Guarda el email en el navegador
            }
            
            setTimeout(() => {                             // Después de 1.5 segundos:
                window.location.href = 'index.html';       // Redirige a la página principal
            }, 1500);
        } else {                                           // Si faltan campos:
            showAlert('Por favor completa todos los campos', 'danger');  // Muestra error
        }
    });
});
```
- **`DOMContentLoaded`**: Evento que se ejecuta cuando el HTML está completamente cargado
- **`e.preventDefault()`**: Evita que el formulario se envíe normalmente (recarga la página)
- **`localStorage.setItem()`**: Guarda información en el navegador del usuario
- **`setTimeout()`**: Ejecuta código después de un tiempo determinado (en milisegundos)

---

## 📝 **REGISTRO** (`js/register.js`)

### **Validación de Edad**

```javascript
function validarEdad(fechaNacimiento) {
    const hoy = new Date();                              // Fecha actual
    const fechaNac = new Date(fechaNacimiento);          // Fecha de nacimiento del usuario
    const edad = hoy.getFullYear() - fechaNac.getFullYear();  // Calcula la diferencia de años
    const mes = hoy.getMonth() - fechaNac.getMonth();    // Calcula la diferencia de meses
    
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {  // Si aún no cumple años:
        return edad - 1 >= 18;                           // Resta 1 año y verifica si es mayor de 18
    }
    
    return edad >= 18;                                   // Si ya cumplió años, verifica si es mayor de 18
}
```
- **`new Date()`**: Crea un objeto de fecha con la fecha actual
- **`getFullYear()`**: Obtiene el año de la fecha
- **`getMonth()`**: Obtiene el mes de la fecha (0-11)
- **`getDate()`**: Obtiene el día del mes

### **Validaciones del Formulario**

```javascript
registerForm.addEventListener('submit', function(e) {    // Cuando se envíe el formulario:
    e.preventDefault();                                  // Evita recarga de página
    
    const nombre = document.getElementById('nombre').value;                    // Obtiene el nombre
    const email = document.getElementById('email').value;                      // Obtiene el email
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;  // Obtiene la fecha
    const password = document.getElementById('password').value;                // Obtiene la contraseña
    const confirmPassword = document.getElementById('confirmPassword').value;  // Obtiene la confirmación
    const terminos = document.getElementById('terminos').checked;              // Verifica si aceptó términos
    
    if (!validarEdad(fechaNacimiento)) {                // Si no es mayor de 18:
        showAlert('Debes ser mayor de 18 años para registrarte', 'danger');  // Muestra error
        return;                                         // Termina la función
    }
    
    if (password !== confirmPassword) {                  // Si las contraseñas no coinciden:
        showAlert('Las contraseñas no coinciden', 'danger');  // Muestra error
        return;                                         // Termina la función
    }
    
    if (!terminos) {                                    // Si no aceptó términos:
        showAlert('Debes aceptar los términos y condiciones', 'danger');  // Muestra error
        return;                                         // Termina la función
    }
    
    const esDuoc = email.includes('@duocuc.cl');        // Verifica si es email DUOC
    showAlert('¡Registro exitoso! ' + (esDuoc ? 'Tienes 20% de descuento permanente por ser estudiante Duoc.' : ''), 'success');  // Muestra mensaje con descuento si aplica
});
```
- **`!validarEdad()`**: El "!" significa "NO", entonces verifica si NO es mayor de edad
- **`password !== confirmPassword`**: Verifica si las contraseñas son diferentes
- **`!terminos`**: Verifica si NO marcó la casilla de términos
- **`esDuoc ? 'mensaje' : ''`**: Si es DUOC muestra el mensaje, si no muestra nada

---

## 📞 **CONTACTO** (`js/contacto.js`)

```javascript
function validarFormulario(nombre, correo, asunto, contenido, terminos) {
    let esValido = true;                                // Variable para saber si todo está bien
    
    if (!nombre || nombre.trim().length < 2) {          // Si no hay nombre o tiene menos de 2 caracteres:
        showFieldError('nombreCompleto', 'El nombre debe tener al menos 2 caracteres');  // Muestra error
        esValido = false;                               // Marca como inválido
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;    // Patrón para validar email
    if (!emailRegex.test(correo)) {                     // Si el email no es válido:
        showFieldError('correo', 'Por favor ingresa un correo electrónico válido');  // Muestra error
        esValido = false;                               // Marca como inválido
    }
    
    if (!contenido || contenido.trim().length < 10) {   // Si no hay contenido o tiene menos de 10 caracteres:
        showFieldError('contenido', 'El mensaje debe tener al menos 10 caracteres');  // Muestra error
        esValido = false;                               // Marca como inválido
    }
    
    if (!terminos) {                                    // Si no aceptó términos:
        showFieldError('aceptoTerminos', 'Debes aceptar los términos y condiciones');  // Muestra error
        esValido = false;                               // Marca como inválido
    }
    
    return esValido;                                    // Retorna si todo está bien o no
}
```
- **`nombre.trim().length`**: Quita espacios y cuenta caracteres
- **`!nombre`**: Verifica si el nombre está vacío
- **`esValido = false`**: Cambia la variable a falso cuando encuentra un error

---

## 🛒 **CARRITO** (`js/cart.js`)

### **Agregar al Carrito**

```javascript
function addToCart(id, name, price, image, category) {
    let existingItem = cart.find(item => item.id === id);  // Busca si el producto ya está en el carrito
    
    if (existingItem) {                                   // Si ya existe:
        existingItem.quantity += 1;                       // Aumenta la cantidad en 1
    } else {                                              // Si no existe:
        cart.push({                                       // Agrega el producto al carrito:
            id: id, name: name, price: price, 
            image: image, category: category, quantity: 1
        });
    }
    
    updateCartDisplay();                                  // Actualiza la visualización del carrito
    showNotification(`${name} agregado al carrito`, 'success');  // Muestra notificación
}
```
- **`cart.find()`**: Busca en el array del carrito un elemento que coincida con la condición
- **`item => item.id === id`**: Función que verifica si el ID del item coincide con el ID buscado
- **`cart.push()`**: Agrega un nuevo elemento al final del array
- **`updateCartDisplay()`**: Actualiza lo que se ve en pantalla

### **Actualizar Visualización**

```javascript
function updateCartDisplay() {
    total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);  // Calcula el total sumando precio × cantidad de cada item
    
    const cartCount = document.getElementById('cartCount');  // Busca el contador del carrito
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);  // Suma todas las cantidades
    if (cartCount) {                                       // Si existe el contador:
        cartCount.textContent = totalItems;                // Actualiza el número mostrado
    }
}
```
- **`cart.reduce()`**: Recorre todo el carrito y calcula un valor total
- **`(sum, item) => sum + (item.price * item.quantity)`**: Para cada item, suma el precio multiplicado por la cantidad
- **`textContent`**: Cambia el texto que se muestra en el elemento

---

## 🎮 **PRODUCTOS** (`js/products.js`)

### **Mostrar Productos**

```javascript
function displayProducts() {
    const productsGrid = document.getElementById('productsGrid');  // Busca el contenedor de productos
    if (!productsGrid) return;                                   // Si no existe, termina la función
    productsGrid.innerHTML = '';                                 // Limpia el contenido anterior
    
    filteredProducts.forEach(product => {                        // Para cada producto filtrado:
        const productCard = createProductCard(product);          // Crea la tarjeta del producto
        productsGrid.innerHTML += productCard;                   // Agrega la tarjeta al contenedor
    });
}
```
- **`innerHTML = ''`**: Limpia todo el contenido del elemento
- **`forEach`**: Recorre cada elemento del array
- **`innerHTML +=`**: Agrega contenido al final del elemento existente

### **Filtrar Productos**

```javascript
function filterProducts() {
    const category = document.getElementById('categoryFilter').value;  // Obtiene la categoría seleccionada
    
    if (category === '') {                                           // Si no hay categoría seleccionada:
        filteredProducts = [...products];                            // Muestra todos los productos
    } else {                                                         // Si hay categoría:
        filteredProducts = products.filter(product => product.category === category);  // Filtra solo los de esa categoría
    }
    
    displayProducts();                                               // Actualiza la visualización
}
```
- **`[...products]`**: Crea una copia del array original (no modifica el original)
- **`products.filter()`**: Crea un nuevo array solo con los elementos que cumplen la condición
- **`product => product.category === category`**: Función que verifica si la categoría del producto coincide

### **Buscar Productos**

```javascript
function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();  // Obtiene el término de búsqueda en minúsculas
    
    filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||           // Si el nombre contiene el término
        product.description.toLowerCase().includes(searchTerm) ||    // O si la descripción contiene el término
        product.category.toLowerCase().includes(searchTerm)          // O si la categoría contiene el término
    );
    
    displayProducts();                                               // Actualiza la visualización
}
```
- **`toLowerCase()`**: Convierte el texto a minúsculas para comparar sin importar mayúsculas
- **`includes(searchTerm)`**: Verifica si el texto contiene el término de búsqueda
- **`||`**: Significa "O", entonces si cualquiera de las tres condiciones se cumple, incluye el producto

---

## 👥 **ADMINISTRACIÓN** (`js/admin-users.js`)

### **Filtrar Usuarios**

```javascript
function filterUsers() {
    const searchTerm = document.getElementById('searchUsers').value.toLowerCase();  // Término de búsqueda
    const statusFilter = document.getElementById('filterStatus').value;             // Filtro de estado
    const regionFilter = document.getElementById('filterRegion').value;             // Filtro de región
    
    filteredUsers = users.filter(user => {                                         // Filtra usuarios que cumplan:
        const matchesSearch = user.nombre.toLowerCase().includes(searchTerm) ||    // Nombre coincide con búsqueda
                            user.correo.toLowerCase().includes(searchTerm) ||      // O email coincide
                            user.telefono.includes(searchTerm);                    // O teléfono coincide
        const matchesStatus = !statusFilter || user.estado === statusFilter;       // Estado coincide (o no hay filtro)
        const matchesRegion = !regionFilter || user.region === regionFilter;       // Región coincide (o no hay filtro)
        
        return matchesSearch && matchesStatus && matchesRegion;                    // Todas las condiciones deben cumplirse
    });
    
    displayUsers();                                                                // Actualiza la visualización
    updatePagination();                                                            // Actualiza la paginación
}
```
- **`matchesSearch`**: Variable que es verdadera si el usuario coincide con la búsqueda
- **`matchesStatus`**: Variable que es verdadera si el estado coincide (o no hay filtro de estado)
- **`matchesRegion`**: Variable que es verdadera si la región coincide (o no hay filtro de región)
- **`&&`**: Significa "Y", entonces todas las condiciones deben ser verdaderas

### **Crear Usuario**

```javascript
function crearUsuario() {
    const nuevoUsuario = {                                                         // Crea un objeto con los datos del usuario:
        id: users.length + 1,                                                      // ID único (cantidad actual + 1)
        nombre: document.getElementById('nombreCompleto').value,                   // Nombre del formulario
        correo: document.getElementById('correo').value,                           // Email del formulario
        telefono: document.getElementById('telefono').value || 'No especificado',  // Teléfono o texto por defecto
        region: document.getElementById('region').value,                           // Región del formulario
        comuna: document.getElementById('comuna').value,                           // Comuna del formulario
        estado: 'activo',                                                         // Estado por defecto
        fechaRegistro: new Date().toISOString().split('T')[0],                    // Fecha actual en formato YYYY-MM-DD
        fechaNacimiento: document.getElementById('fechaNacimiento').value          // Fecha de nacimiento del formulario
    };
    
    const password = document.getElementById('password').value;                    // Obtiene la contraseña
    const confirmPassword = document.getElementById('confirmPassword').value;      // Obtiene la confirmación
    
    if (password !== confirmPassword) {                                           // Si las contraseñas no coinciden:
        alert('Las contraseñas no coinciden');                                    // Muestra alerta
        return;                                                                   // Termina la función
    }
    
    if (users.some(user => user.correo === nuevoUsuario.correo)) {                // Si ya existe un usuario con ese email:
        alert('Ya existe un usuario con este correo electrónico');               // Muestra alerta
        return;                                                                   // Termina la función
    }
    
    users.push(nuevoUsuario);                                                    // Agrega el usuario al array
    filteredUsers = [...users];                                                  // Actualiza la lista filtrada
    displayUsers();                                                              // Actualiza la visualización
    updatePagination();                                                          // Actualiza la paginación
}
```
- **`users.length + 1`**: Crea un ID único basado en la cantidad actual de usuarios
- **`|| 'No especificado'`**: Si el teléfono está vacío, usa "No especificado"
- **`new Date().toISOString().split('T')[0]`**: Obtiene la fecha actual en formato YYYY-MM-DD
- **`users.some()`**: Verifica si existe al menos un usuario que cumpla la condición
- **`users.push()`**: Agrega el nuevo usuario al final del array

---

## 📊 **RESUMEN DE CONCEPTOS CLAVE**

### **Variables:**
- **`const`**: Variable que no puede cambiar su valor
- **`let`**: Variable que puede cambiar su valor
- **`var`**: Variable antigua (no recomendada)

### **Operadores:**
- **`===`**: Comparación estricta (valor y tipo)
- **`!==`**: Diferente estricto
- **`&&`**: Y lógico (ambas condiciones deben ser verdaderas)
- **`||`**: O lógico (al menos una condición debe ser verdadera)
- **`!`**: NO lógico (invierte el valor)

### **Métodos de Arrays:**
- **`forEach()`**: Recorre cada elemento
- **`filter()`**: Crea nuevo array con elementos que cumplen condición
- **`find()`**: Busca el primer elemento que cumple condición
- **`push()`**: Agrega elemento al final
- **`reduce()`**: Calcula un valor total recorriendo el array

### **Métodos de Strings:**
- **`trim()`**: Quita espacios al inicio y final
- **`toLowerCase()`**: Convierte a minúsculas
- **`includes()`**: Verifica si contiene un texto
- **`substring()`**: Extrae parte del texto

### **Métodos de DOM:**
- **`getElementById()`**: Busca elemento por ID
- **`querySelectorAll()`**: Busca elementos por selector CSS
- **`addEventListener()`**: Agrega escuchador de eventos
- **`textContent`**: Cambia el texto del elemento
- **`innerHTML`**: Cambia el HTML del elemento

---

*Explicación detallada de cada función del sistema Level-Up Gamer*
