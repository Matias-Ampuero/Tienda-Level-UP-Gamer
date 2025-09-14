// Level-Up Gamer - Gestión de Productos

// Datos de productos según las instrucciones
const products = [
    // Juegos de Mesa
    { 
        id: 'JM001', 
        name: 'Catan', 
        price: 29990, 
        category: 'Juegos de Mesa', 
        image: '../img/catan.jpg', 
        description: 'Un clásico juego de estrategia donde los jugadores compiten por colonizar y expandirse en la isla de Catan.',
        manufacturer: 'Catan Studio',
        distributor: 'Asmodee Chile',
        origin: 'Alemania',
        warranty: '2 años'
    },
    { 
        id: 'JM002', 
        name: 'Carcassonne', 
        price: 24990, 
        category: 'Juegos de Mesa', 
        image: '../img/carcassonne.jpg', 
        description: 'Un juego de colocación de fichas donde los jugadores construyen el paisaje alrededor de la fortaleza medieval.',
        manufacturer: 'Hans im Glück',
        distributor: 'Asmodee Chile',
        origin: 'Alemania',
        warranty: '2 años'
    },
    
    // Accesorios
    { 
        id: 'AC001', 
        name: 'Controlador Inalámbrico Xbox Series X', 
        price: 59990, 
        category: 'Accesorios', 
        image: '../img/controlador-xbox-series.jpg', 
        description: 'Ofrece una experiencia de juego cómoda con botones mapeables y una respuesta táctil mejorada.',
        manufacturer: 'Microsoft Corporation',
        distributor: 'Microsoft Chile',
        origin: 'China',
        warranty: '1 año'
    },
    { 
        id: 'AC002', 
        name: 'Auriculares Gamer HyperX Cloud II', 
        price: 79990, 
        category: 'Accesorios', 
        image: '../img/hyperx_cloud.jpg', 
        description: 'Proporcionan un sonido envolvente de calidad con un micrófono desmontable.',
        manufacturer: 'Kingston Technology',
        distributor: 'Kingston Chile',
        origin: 'Taiwán',
        warranty: '2 años'
    },
    
    // Consolas
    { 
        id: 'CO001', 
        name: 'PlayStation 5', 
        price: 549990, 
        category: 'Consolas', 
        image: '../img/playstation5.jpg', 
        description: 'La consola de última generación de Sony, que ofrece gráficos impresionantes y tiempos de carga ultrarrápidos.',
        manufacturer: 'Sony Interactive Entertainment',
        distributor: 'Sony Chile',
        origin: 'Japón',
        warranty: '1 año'
    },
    { 
        id: 'CO002', 
        name: 'Xbox Series X', 
        price: 549990, 
        category: 'Consolas', 
        image: '../img/xboxseriesx.jpg', 
        description: 'La consola más potente de Microsoft con rendimiento excepcional.',
        manufacturer: 'Microsoft Corporation',
        distributor: 'Microsoft Chile',
        origin: 'China',
        warranty: '1 año'
    },
    { 
        id: 'CO003', 
        name: 'Nintendo Switch', 
        price: 399990, 
        category: 'Consolas', 
        image: '../img/nitendo-switch.jpg', 
        description: 'Consola híbrida portátil y de escritorio perfecta para cualquier lugar.',
        manufacturer: 'Nintendo Co., Ltd.',
        distributor: 'Nintendo Chile',
        origin: 'Japón',
        warranty: '1 año'
    },
    
    // Computadores Gamers
    { 
        id: 'CG001', 
        name: 'PC Gamer ASUS ROG Strix', 
        price: 1299990, 
        category: 'Computadores Gamers', 
        image: '../img/rogstrix.jpg', 
        description: 'Un potente equipo diseñado para los gamers más exigentes, equipado con los últimos componentes.',
        manufacturer: 'ASUS Computer International',
        distributor: 'ASUS Chile',
        origin: 'Taiwán',
        warranty: '3 años'
    },
    
    // Sillas Gamers
    { 
        id: 'SG001', 
        name: 'Silla Gamer Secretlab Titan', 
        price: 349990, 
        category: 'Sillas Gamers', 
        image: '../img/sillagamersecretlab.jpg', 
        description: 'Diseñada para el máximo confort, esta silla ofrece un soporte ergonómico y personalización ajustable.',
        manufacturer: 'Secretlab',
        distributor: 'Secretlab Chile',
        origin: 'Singapur',
        warranty: '5 años'
    },
    
    // Mouse
    { 
        id: 'MS001', 
        name: 'Mouse Gamer Logitech G502 HERO', 
        price: 49990, 
        category: 'Mouse', 
        image: '../img/g502-heroe.jpg', 
        description: 'Con sensor de alta precisión y botones personalizables, ideal para gamers que buscan control preciso.',
        manufacturer: 'Logitech International',
        distributor: 'Logitech Chile',
        origin: 'Suiza',
        warranty: '2 años'
    },
    
    // Mousepad
    { 
        id: 'MP001', 
        name: 'Mousepad Razer Goliathus Extended Chroma', 
        price: 29990, 
        category: 'Mousepad', 
        image: '../img/mousepad.jpg', 
        description: 'Ofrece un área de juego amplia con iluminación RGB personalizable.',
        manufacturer: 'Razer Inc.',
        distributor: 'Razer Chile',
        origin: 'Singapur',
        warranty: '2 años'
    },
    
    // Poleras Personalizadas
    { 
        id: 'PP001', 
        name: 'Polera Gamer Personalizada Level-Up', 
        price: 14990, 
        category: 'Poleras Personalizadas', 
        image: '../img/poleragamerpersonalizada.jpg', 
        description: 'Una camiseta cómoda y estilizada, con la posibilidad de personalizarla con tu gamer tag.',
        manufacturer: 'Level-Up Gamer',
        distributor: 'Level-Up Gamer',
        origin: 'Chile',
        warranty: '6 meses'
    },
    
    // Polerones Gamers Personalizados
    { 
        id: 'PG001', 
        name: 'Polerón Gamer Personalizado', 
        price: 24990, 
        category: 'Polerones Gamers Personalizados', 
        image: '../img/polerongamer.jpg', 
        description: 'Polerón cómodo y cálido con diseño gamer personalizable.',
        manufacturer: 'Level-Up Gamer',
        distributor: 'Level-Up Gamer',
        origin: 'Chile',
        warranty: '6 meses'
    }
];

let filteredProducts = [...products];

// Cargar productos al iniciar la página
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si hay filtro por URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFilter = urlParams.get('category');
    
    if (categoryFilter) {
        // Aplicar filtro de categoría
        document.getElementById('categoryFilter').value = categoryFilter;
        filteredProducts = products.filter(product => product.category === categoryFilter);
    }
    
    displayProducts();
});

// Mostrar productos
function displayProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.innerHTML += productCard;
    });
}

// Crear tarjeta de producto
function createProductCard(product) {
    return `
        <div class="col-lg-3 col-md-6 mb-4">
            <div class="card product-card h-100">
                <img src="${product.image}" class="card-img-top" alt="${product.name}" style="height: 200px; object-fit: cover;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    
                    <!-- Información de Origen -->
                    <div class="product-origin mb-3" style="background: #1a1a1a; padding: 10px; border-radius: 8px; border-left: 3px solid var(--accent-blue);">
                        <div class="row text-center">
                            <div class="col-6">
                                <small class="text-white d-block" style="font-family: 'Orbitron', sans-serif; font-size: 0.75rem; opacity: 0.8;">Fabricante</small>
                                <small class="text-white" style="font-family: 'Orbitron', sans-serif; font-size: 0.8rem; font-weight: 500;">${product.manufacturer}</small>
                            </div>
                            <div class="col-6">
                                <small class="text-white d-block" style="font-family: 'Orbitron', sans-serif; font-size: 0.75rem; opacity: 0.8;">Origen</small>
                                <small class="text-primary" style="font-family: 'Orbitron', sans-serif; font-size: 0.8rem; font-weight: 500;">${product.origin}</small>
                            </div>
                        </div>
                        <div class="row text-center mt-2">
                            <div class="col-6">
                                <small class="text-white d-block" style="font-family: 'Orbitron', sans-serif; font-size: 0.75rem; opacity: 0.8;">Distribuidor</small>
                                <small class="text-success" style="font-family: 'Orbitron', sans-serif; font-size: 0.8rem; font-weight: 500;">${product.distributor}</small>
                            </div>
                            <div class="col-6">
                                <small class="text-white d-block" style="font-family: 'Orbitron', sans-serif; font-size: 0.75rem; opacity: 0.8;">Garantía</small>
                                <small class="text-warning" style="font-family: 'Orbitron', sans-serif; font-size: 0.8rem; font-weight: 500;">${product.warranty}</small>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mt-auto">
                        <div class="product-price mb-3">$${product.price.toLocaleString()}</div>
                        <button class="btn btn-gamer w-100" onclick="addToCart('${product.id}', '${product.name}', ${product.price}, '${product.image}', '${product.category}')">
                            <i class="bi bi-cart-plus me-2"></i>Agregar al Carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Filtrar productos por categoría
function filterProducts() {
    const category = document.getElementById('categoryFilter').value;
    
    if (category === '') {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(product => product.category === category);
    }
    
    displayProducts();
}

// Buscar productos
function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    
    displayProducts();
}
