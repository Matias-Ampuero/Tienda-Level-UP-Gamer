// Level-Up Gamer - Dashboard Administrativo

// Datos de estadísticas del dashboard
const dashboardStats = {
    totalUsers: 127,
    activeProducts: 89,
    monthlyOrders: 342,
    monthlySales: 2400000, // $2.4M en pesos chilenos
    recentActivity: [
        {
            type: 'user',
            message: 'Nuevo usuario registrado: Juan Pérez',
            time: 'Hace 2 horas',
            icon: 'bi-person-plus',
            color: 'text-success'
        },
        {
            type: 'order',
            message: 'Nuevo pedido realizado: #ORD-001',
            time: 'Hace 4 horas',
            icon: 'bi-cart-plus',
            color: 'text-primary'
        },
        {
            type: 'product',
            message: 'Producto actualizado: PlayStation 5',
            time: 'Hace 6 horas',
            icon: 'bi-box-seam',
            color: 'text-warning'
        }
    ]
};

// Cargar dashboard al iniciar la página
document.addEventListener('DOMContentLoaded', function() {
    // Esperar un poco para que admin-users.js se cargue primero
    setTimeout(() => {
        loadDashboardStats();
        loadRecentActivity();
        loadProductsList();
        setupEventListeners();
        
        // Actualizar contador de usuarios si está disponible
        if (typeof window.users !== 'undefined') {
            updateUserCount(window.users.length);
        }
    }, 100);
});

// Configurar event listeners
function setupEventListeners() {
    // Botón de notificaciones
    const notificationBtn = document.querySelector('.btn-outline-primary');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            showNotifications();
        });
    }
}

// Cargar estadísticas del dashboard
function loadDashboardStats() {
    // Los números ya están en el HTML, pero podríamos actualizarlos dinámicamente
    // si necesitáramos datos en tiempo real
    console.log('Dashboard stats loaded:', dashboardStats);
}

// Cargar actividad reciente
function loadRecentActivity() {
    const activityList = document.querySelector('.activity-list');
    if (!activityList) return;
    
    // El HTML ya tiene la actividad hardcodeada, pero podríamos actualizarla dinámicamente
    console.log('Recent activity loaded:', dashboardStats.recentActivity);
}

// Cargar lista de productos
function loadProductsList() {
    const productsListBody = document.getElementById('productsListBody');
    if (!productsListBody) return;
    
    // Verificar si los productos están disponibles
    if (typeof window.products !== 'undefined') {
        let productsHTML = '';
        
        // Mostrar solo los primeros 10 productos para el dashboard
        const productsToShow = window.products.slice(0, 10);
        
        productsToShow.forEach(product => {
            const stockClass = product.stock < 20 ? 'text-danger' : 
                              product.stock < 50 ? 'text-warning' : 'text-success';
            const statusClass = product.status === 'activo' ? 'text-success' : 'text-danger';
            
            productsHTML += `
                <tr>
                    <td>
                        <div class="d-flex align-items-center">
                            <img src="${product.image}" alt="${product.name}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px; margin-right: 10px;">
                            <div>
                                <strong>${product.name}</strong>
                                <br>
                                <small class="text-muted">${product.id}</small>
                            </div>
                        </div>
                    </td>
                    <td>
                        <span class="badge bg-secondary">${product.category}</span>
                    </td>
                    <td>
                        <strong>$${product.price.toLocaleString()}</strong>
                    </td>
                    <td>
                        <span class="${stockClass}">
                            <i class="bi bi-box-seam me-1"></i>${product.stock}
                        </span>
                    </td>
                    <td>
                        <span class="text-primary">
                            <i class="bi bi-graph-up me-1"></i>${product.sold}
                        </span>
                    </td>
                    <td>
                        <span class="${statusClass}">
                            <i class="bi bi-circle-fill me-1"></i>${product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                        </span>
                    </td>
                </tr>
            `;
        });
        
        productsListBody.innerHTML = productsHTML;
        
        // Actualizar estadísticas de productos
        updateProductStats();
    }
}

// Actualizar estadísticas de productos
function updateProductStats() {
    if (typeof window.products !== 'undefined') {
        const totalProducts = window.products.length;
        const activeProducts = window.products.filter(p => p.status === 'activo').length;
        const lowStockProducts = window.products.filter(p => p.stock < 20).length;
        const totalSold = window.products.reduce((sum, p) => sum + p.sold, 0);
        
        // Actualizar elementos si existen
        const totalProductsEl = document.getElementById('totalProducts');
        if (totalProductsEl) totalProductsEl.textContent = totalProducts;
        
        const activeProductsEl = document.getElementById('activeProducts');
        if (activeProductsEl) activeProductsEl.textContent = activeProducts;
        
        const lowStockProductsEl = document.getElementById('lowStockProducts');
        if (lowStockProductsEl) lowStockProductsEl.textContent = lowStockProducts;
        
        const totalSoldEl = document.getElementById('totalSold');
        if (totalSoldEl) totalSoldEl.textContent = totalSold;
    }
}

// Mostrar notificaciones
function showNotifications() {
    // Crear modal de notificaciones
    const notificationModal = document.createElement('div');
    notificationModal.className = 'modal fade';
    notificationModal.id = 'notificationsModal';
    notificationModal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content bg-dark">
                <div class="modal-header">
                    <h5 class="modal-title text-white">
                        <i class="bi bi-bell me-2"></i>Notificaciones
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="notification-item">
                        <i class="bi bi-person-plus text-success me-2"></i>
                        <div>
                            <p class="mb-1">Nuevo usuario registrado</p>
                            <small class="text-muted">Hace 2 horas</small>
                        </div>
                    </div>
                    <div class="notification-item">
                        <i class="bi bi-cart-plus text-primary me-2"></i>
                        <div>
                            <p class="mb-1">Nuevo pedido recibido</p>
                            <small class="text-muted">Hace 4 horas</small>
                        </div>
                    </div>
                    <div class="notification-item">
                        <i class="bi bi-box-seam text-warning me-2"></i>
                        <div>
                            <p class="mb-1">Producto actualizado</p>
                            <small class="text-muted">Hace 6 horas</small>
                        </div>
                    </div>
                    <div class="notification-item">
                        <i class="bi bi-exclamation-triangle text-danger me-2"></i>
                        <div>
                            <p class="mb-1">Stock bajo en PlayStation 5</p>
                            <small class="text-muted">Hace 1 día</small>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-gamer" onclick="markAllAsRead()">
                        <i class="bi bi-check-all me-1"></i>Marcar todas como leídas
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(notificationModal);
    
    // Mostrar modal
    const modal = new bootstrap.Modal(notificationModal);
    modal.show();
    
    // Limpiar modal cuando se cierre
    notificationModal.addEventListener('hidden.bs.modal', function() {
        document.body.removeChild(notificationModal);
    });
}

// Marcar todas las notificaciones como leídas
function markAllAsRead() {
    alert('Todas las notificaciones han sido marcadas como leídas');
    const modal = bootstrap.Modal.getInstance(document.getElementById('notificationsModal'));
    modal.hide();
}

// Actualizar estadísticas (función que puede ser llamada desde otros archivos)
function updateDashboardStats() {
    // Esta función puede ser llamada desde admin-users.js para actualizar las estadísticas
    // cuando se agreguen, editen o eliminen usuarios
    console.log('Dashboard stats updated');
}

// Función para actualizar el contador de usuarios
function updateUserCount(newCount) {
    const totalUsersElement = document.getElementById('totalUsers');
    if (totalUsersElement) {
        totalUsersElement.textContent = newCount;
    }
}

// Función para actualizar el contador de productos
function updateProductCount(newCount) {
    const totalProductsElement = document.getElementById('totalProducts');
    if (totalProductsElement) {
        totalProductsElement.textContent = newCount;
    }
}

// Función para actualizar el contador de pedidos
function updateOrderCount(newCount) {
    const totalOrdersElement = document.getElementById('totalOrders');
    if (totalOrdersElement) {
        totalOrdersElement.textContent = newCount;
    }
}

// Función para actualizar el contador de ventas
function updateSalesCount(newAmount) {
    const totalSalesElement = document.getElementById('totalSales');
    if (totalSalesElement) {
        totalSalesElement.textContent = `$${(newAmount / 1000000).toFixed(1)}M`;
    }
}

// Exportar funciones para uso global
window.updateDashboardStats = updateDashboardStats;
window.updateUserCount = updateUserCount;
window.updateProductCount = updateProductCount;
window.updateOrderCount = updateOrderCount;
window.updateSalesCount = updateSalesCount;
window.showNotifications = showNotifications;
window.markAllAsRead = markAllAsRead;
