// Level-Up Gamer - Carrito de Compras
let cart = [];
let total = 0;

// Función para agregar producto al carrito
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

// Función para remover producto del carrito
function removeFromCart(id) {
    let item = cart.find(item => item.id === id);
    if (item) {
        cart = cart.filter(item => item.id !== id);
        updateCartDisplay();
        showNotification(`${item.name} eliminado del carrito`, 'warning');
    }
}

// Función para actualizar cantidad
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

// Función para actualizar la visualización del carrito
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

// Función para proceder a compra
function proceedToCheckout() {
    alert('¡Gracias por tu compra! Esta funcionalidad está en desarrollo.');
}

// Función para mostrar notificaciones
function showNotification(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alertDiv.style.top = '20px';
    alertDiv.style.right = '20px';
    alertDiv.style.zIndex = '9999';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.parentNode.removeChild(alertDiv);
        }
    }, 3000);
}

// Inicializar carrito al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    updateCartDisplay();
});
