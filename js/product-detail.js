// Level-Up Gamer - Detalle de Producto

document.addEventListener('DOMContentLoaded', function() {
    // Obtener ID del producto desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (productId) {
        loadProductDetail(productId);
        loadRelatedProducts(productId);
    } else {
        // Si no hay ID, mostrar error
        document.querySelector('main').innerHTML = `
            <div class="container mt-5 pt-5">
                <div class="alert alert-danger text-center">
                    <h4>Producto no encontrado</h4>
                    <p>No se ha especificado un producto válido.</p>
                    <a href="productos.html" class="btn btn-gamer">Ver Productos</a>
                </div>
            </div>
        `;
    }
});

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
    
    // Solo actualizar elementos que existen
    const manufacturerEl = document.getElementById('product-manufacturer');
    if (manufacturerEl) manufacturerEl.textContent = product.manufacturer;
    
    const distributorEl = document.getElementById('product-distributor');
    if (distributorEl) distributorEl.textContent = product.distributor;
    
    const originEl = document.getElementById('product-origin');
    if (originEl) originEl.textContent = product.origin;
    
    const warrantyEl = document.getElementById('product-warranty');
    if (warrantyEl) warrantyEl.textContent = product.warranty;
    
    // Actualizar breadcrumb
    document.getElementById('breadcrumb-category').textContent = product.category;
    
    // Configurar thumbnails (usar la misma imagen por ahora)
    document.getElementById('thumb-1').src = `../img/${product.image}`;
    document.getElementById('thumb-2').src = `../img/${product.image}`;
    document.getElementById('thumb-3').src = `../img/${product.image}`;
    
    // Configurar botón de añadir al carrito
    document.getElementById('add-to-cart-btn').onclick = function() {
        const quantity = parseInt(document.getElementById('quantity').value);
        addToCart(product.id, product.name, product.price, product.image, product.category, quantity);
        showNotification('Producto añadido al carrito', 'success');
    };
    
    // Actualizar título de la página
    document.title = `${product.name} - Level-Up Gamer`;
}

function loadRelatedProducts(currentProductId) {
    // Obtener productos de la misma categoría (excluyendo el actual)
    const currentProduct = products.find(p => p.id === currentProductId);
    const relatedProducts = products.filter(p => 
        p.category === currentProduct.category && p.id !== currentProductId
    ).slice(0, 5); // Exactamente 5 productos relacionados como en el mockup
    
    const relatedContainer = document.getElementById('related-products');
    
    if (relatedProducts.length === 0) {
        relatedContainer.innerHTML = `
            <div class="col-12 text-center">
                <p class="text-muted">No hay productos relacionados disponibles</p>
            </div>
        `;
        return;
    }
    
    relatedContainer.innerHTML = relatedProducts.map(product => `
        <div class="col-lg-2 col-md-4 col-sm-6 mb-4">
            <div class="related-product-card">
                <div class="related-product-image">
                    <i class="bi bi-image"></i>
                </div>
            </div>
        </div>
    `).join('');
}

function changeMainImage(imageSrc) {
    document.getElementById('product-image').src = imageSrc;
}

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

function showNotification(message, type) {
    // Crear notificación temporal
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}
