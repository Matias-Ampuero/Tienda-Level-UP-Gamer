// Level-Up Gamer - Gestión de Usuarios

// Datos de usuarios de ejemplo (127 usuarios total)
const users = [
    // Usuarios activos (100)
    { id: 1, nombre: 'Juan Pérez', correo: 'juan.perez@email.com', telefono: '+56912345678', region: 'Metropolitana', comuna: 'Santiago', estado: 'activo', fechaRegistro: '2024-01-15', fechaNacimiento: '1990-05-20' },
    { id: 2, nombre: 'María González', correo: 'maria.gonzalez@email.com', telefono: '+56923456789', region: 'Valparaíso', comuna: 'Valparaíso', estado: 'activo', fechaRegistro: '2024-01-20', fechaNacimiento: '1988-12-10' },
    { id: 3, nombre: 'Carlos Rodríguez', correo: 'carlos.rodriguez@email.com', telefono: '+56934567890', region: 'Biobío', comuna: 'Concepción', estado: 'activo', fechaRegistro: '2024-02-01', fechaNacimiento: '1995-03-15' },
    { id: 4, nombre: 'Ana Silva', correo: 'ana.silva@email.com', telefono: '+56945678901', region: 'Metropolitana', comuna: 'Santiago', estado: 'activo', fechaRegistro: '2024-02-05', fechaNacimiento: '1992-07-22' },
    { id: 5, nombre: 'Luis Martínez', correo: 'luis.martinez@email.com', telefono: '+56956789012', region: 'Ñuble', comuna: 'Chillán', estado: 'activo', fechaRegistro: '2024-02-10', fechaNacimiento: '1987-11-08' },
    { id: 6, nombre: 'Carmen López', correo: 'carmen.lopez@email.com', telefono: '+56967890123', region: 'Metropolitana', comuna: 'Santiago', estado: 'activo', fechaRegistro: '2024-02-15', fechaNacimiento: '1993-09-14' },
    { id: 7, nombre: 'Diego Herrera', correo: 'diego.herrera@email.com', telefono: '+56978901234', region: 'Valparaíso', comuna: 'Valparaíso', estado: 'activo', fechaRegistro: '2024-02-20', fechaNacimiento: '1991-01-30' },
    { id: 8, nombre: 'Patricia Morales', correo: 'patricia.morales@email.com', telefono: '+56989012345', region: 'Biobío', comuna: 'Concepción', estado: 'activo', fechaRegistro: '2024-03-01', fechaNacimiento: '1989-06-18' },
    { id: 9, nombre: 'Roberto Vargas', correo: 'roberto.vargas@email.com', telefono: '+56990123456', region: 'Metropolitana', comuna: 'Santiago', estado: 'activo', fechaRegistro: '2024-03-05', fechaNacimiento: '1994-04-25' },
    { id: 10, nombre: 'Sofia Castro', correo: 'sofia.castro@email.com', telefono: '+56901234567', region: 'Ñuble', comuna: 'Chillán', estado: 'activo', fechaRegistro: '2024-03-10', fechaNacimiento: '1996-08-12' },
    { id: 11, nombre: 'Miguel Torres', correo: 'miguel.torres@email.com', telefono: '+56912345670', region: 'Metropolitana', comuna: 'Santiago', estado: 'activo', fechaRegistro: '2024-03-15', fechaNacimiento: '1986-02-28' },
    { id: 12, nombre: 'Isabel Jiménez', correo: 'isabel.jimenez@email.com', telefono: '+56923456701', region: 'Valparaíso', comuna: 'Valparaíso', estado: 'activo', fechaRegistro: '2024-03-20', fechaNacimiento: '1997-10-05' },
    { id: 13, nombre: 'Fernando Ruiz', correo: 'fernando.ruiz@email.com', telefono: '+56934567012', region: 'Biobío', comuna: 'Concepción', estado: 'activo', fechaRegistro: '2024-04-01', fechaNacimiento: '1990-12-17' },
    { id: 14, nombre: 'Valentina Díaz', correo: 'valentina.diaz@email.com', telefono: '+56945670123', region: 'Metropolitana', comuna: 'Santiago', estado: 'activo', fechaRegistro: '2024-04-05', fechaNacimiento: '1995-03-09' },
    { id: 15, nombre: 'Andrés Moreno', correo: 'andres.moreno@email.com', telefono: '+56956701234', region: 'Ñuble', comuna: 'Chillán', estado: 'activo', fechaRegistro: '2024-04-10', fechaNacimiento: '1988-07-23' },
    { id: 16, nombre: 'Gabriela Flores', correo: 'gabriela.flores@email.com', telefono: '+56967012345', region: 'Metropolitana', comuna: 'Santiago', estado: 'activo', fechaRegistro: '2024-04-15', fechaNacimiento: '1993-11-16' },
    { id: 17, nombre: 'Sebastián Aguilar', correo: 'sebastian.aguilar@email.com', telefono: '+56970123456', region: 'Valparaíso', comuna: 'Valparaíso', estado: 'activo', fechaRegistro: '2024-04-20', fechaNacimiento: '1991-05-04' },
    { id: 18, nombre: 'Natalia Vega', correo: 'natalia.vega@email.com', telefono: '+56981234567', region: 'Biobío', comuna: 'Concepción', estado: 'activo', fechaRegistro: '2024-05-01', fechaNacimiento: '1996-09-27' },
    { id: 19, nombre: 'Francisco Peña', correo: 'francisco.pena@email.com', telefono: '+56992345678', region: 'Metropolitana', comuna: 'Santiago', estado: 'activo', fechaRegistro: '2024-05-05', fechaNacimiento: '1987-01-13' },
    { id: 20, nombre: 'Camila Rojas', correo: 'camila.rojas@email.com', telefono: '+56903456789', region: 'Ñuble', comuna: 'Chillán', estado: 'activo', fechaRegistro: '2024-05-10', fechaNacimiento: '1994-06-21' },
    
    // Usuarios inactivos (20)
    { id: 21, nombre: 'Pedro Sánchez', correo: 'pedro.sanchez@email.com', telefono: '+56914567890', region: 'Metropolitana', comuna: 'Santiago', estado: 'inactivo', fechaRegistro: '2023-12-01', fechaNacimiento: '1985-04-08' },
    { id: 22, nombre: 'Laura Mendoza', correo: 'laura.mendoza@email.com', telefono: '+56925678901', region: 'Valparaíso', comuna: 'Valparaíso', estado: 'inactivo', fechaRegistro: '2023-12-15', fechaNacimiento: '1992-08-19' },
    { id: 23, nombre: 'Jorge Castillo', correo: 'jorge.castillo@email.com', telefono: '+56936789012', region: 'Biobío', comuna: 'Concepción', estado: 'inactivo', fechaRegistro: '2024-01-01', fechaNacimiento: '1989-12-03' },
    { id: 24, nombre: 'Elena Ramírez', correo: 'elena.ramirez@email.com', telefono: '+56947890123', region: 'Metropolitana', comuna: 'Santiago', estado: 'inactivo', fechaRegistro: '2024-01-10', fechaNacimiento: '1997-02-14' },
    { id: 25, nombre: 'Héctor Guzmán', correo: 'hector.guzman@email.com', telefono: '+56958901234', region: 'Ñuble', comuna: 'Chillán', estado: 'inactivo', fechaRegistro: '2024-01-20', fechaNacimiento: '1986-10-26' },
    { id: 26, nombre: 'Rosa Espinoza', correo: 'rosa.espinoza@email.com', telefono: '+56969012345', region: 'Metropolitana', comuna: 'Santiago', estado: 'inactivo', fechaRegistro: '2024-02-01', fechaNacimiento: '1993-07-11' },
    { id: 27, nombre: 'Manuel Contreras', correo: 'manuel.contreras@email.com', telefono: '+56970123456', region: 'Valparaíso', comuna: 'Valparaíso', estado: 'inactivo', fechaRegistro: '2024-02-10', fechaNacimiento: '1990-03-29' },
    { id: 28, nombre: 'Teresa Paredes', correo: 'teresa.paredes@email.com', telefono: '+56981234567', region: 'Biobío', comuna: 'Concepción', estado: 'inactivo', fechaRegistro: '2024-02-20', fechaNacimiento: '1995-11-07' },
    { id: 29, nombre: 'Raúl Medina', correo: 'raul.medina@email.com', telefono: '+56992345678', region: 'Metropolitana', comuna: 'Santiago', estado: 'inactivo', fechaRegistro: '2024-03-01', fechaNacimiento: '1988-05-18' },
    { id: 30, nombre: 'Monica Salinas', correo: 'monica.salinas@email.com', telefono: '+56903456789', region: 'Ñuble', comuna: 'Chillán', estado: 'inactivo', fechaRegistro: '2024-03-10', fechaNacimiento: '1994-09-02' },
    { id: 31, nombre: 'Alberto Cáceres', correo: 'alberto.caceres@email.com', telefono: '+56914567890', region: 'Metropolitana', comuna: 'Santiago', estado: 'inactivo', fechaRegistro: '2024-03-20', fechaNacimiento: '1987-12-15' },
    { id: 32, nombre: 'Claudia Bustos', correo: 'claudia.bustos@email.com', telefono: '+56925678901', region: 'Valparaíso', comuna: 'Valparaíso', estado: 'inactivo', fechaRegistro: '2024-04-01', fechaNacimiento: '1991-06-28' },
    { id: 33, nombre: 'Ricardo Núñez', correo: 'ricardo.nunez@email.com', telefono: '+56936789012', region: 'Biobío', comuna: 'Concepción', estado: 'inactivo', fechaRegistro: '2024-04-10', fechaNacimiento: '1996-01-09' },
    { id: 34, nombre: 'Verónica Campos', correo: 'veronica.campos@email.com', telefono: '+56947890123', region: 'Metropolitana', comuna: 'Santiago', estado: 'inactivo', fechaRegistro: '2024-04-20', fechaNacimiento: '1989-08-22' },
    { id: 35, nombre: 'Oscar Valdés', correo: 'oscar.valdes@email.com', telefono: '+56958901234', region: 'Ñuble', comuna: 'Chillán', estado: 'inactivo', fechaRegistro: '2024-05-01', fechaNacimiento: '1992-04-16' },
    { id: 36, nombre: 'Pilar Muñoz', correo: 'pilar.munoz@email.com', telefono: '+56969012345', region: 'Metropolitana', comuna: 'Santiago', estado: 'inactivo', fechaRegistro: '2024-05-10', fechaNacimiento: '1997-10-31' },
    { id: 37, nombre: 'Gonzalo Tapia', correo: 'gonzalo.tapia@email.com', telefono: '+56970123456', region: 'Valparaíso', comuna: 'Valparaíso', estado: 'inactivo', fechaRegistro: '2024-05-20', fechaNacimiento: '1985-07-12' },
    { id: 38, nombre: 'Marcela Soto', correo: 'marcela.soto@email.com', telefono: '+56981234567', region: 'Biobío', comuna: 'Concepción', estado: 'inactivo', fechaRegistro: '2024-06-01', fechaNacimiento: '1993-03-25' },
    { id: 39, nombre: 'Cristian Reyes', correo: 'cristian.reyes@email.com', telefono: '+56992345678', region: 'Metropolitana', comuna: 'Santiago', estado: 'inactivo', fechaRegistro: '2024-06-10', fechaNacimiento: '1990-11-18' },
    { id: 40, nombre: 'Alejandra Fuentes', correo: 'alejandra.fuentes@email.com', telefono: '+56903456789', region: 'Ñuble', comuna: 'Chillán', estado: 'inactivo', fechaRegistro: '2024-06-20', fechaNacimiento: '1995-05-06' },
    
    // Usuarios pendientes (7)
    { id: 41, nombre: 'Daniela Vargas', correo: 'daniela.vargas@email.com', telefono: '+56914567890', region: 'Metropolitana', comuna: 'Santiago', estado: 'pendiente', fechaRegistro: '2024-07-01', fechaNacimiento: '1998-09-13' },
    { id: 42, nombre: 'Felipe Torres', correo: 'felipe.torres@email.com', telefono: '+56925678901', region: 'Valparaíso', comuna: 'Valparaíso', estado: 'pendiente', fechaRegistro: '2024-07-05', fechaNacimiento: '1991-12-24' },
    { id: 43, nombre: 'Constanza López', correo: 'constanza.lopez@email.com', telefono: '+56936789012', region: 'Biobío', comuna: 'Concepción', estado: 'pendiente', fechaRegistro: '2024-07-10', fechaNacimiento: '1996-06-17' },
    { id: 44, nombre: 'Ignacio Silva', correo: 'ignacio.silva@email.com', telefono: '+56947890123', region: 'Metropolitana', comuna: 'Santiago', estado: 'pendiente', fechaRegistro: '2024-07-15', fechaNacimiento: '1987-02-01' },
    { id: 45, nombre: 'Antonella Herrera', correo: 'antonella.herrera@email.com', telefono: '+56958901234', region: 'Ñuble', comuna: 'Chillán', estado: 'pendiente', fechaRegistro: '2024-07-20', fechaNacimiento: '1994-08-14' },
    { id: 46, nombre: 'Matías González', correo: 'matias.gonzalez@email.com', telefono: '+56969012345', region: 'Metropolitana', comuna: 'Santiago', estado: 'pendiente', fechaRegistro: '2024-07-25', fechaNacimiento: '1999-01-27' },
    { id: 47, nombre: 'Javiera Morales', correo: 'javiera.morales@email.com', telefono: '+56970123456', region: 'Valparaíso', comuna: 'Valparaíso', estado: 'pendiente', fechaRegistro: '2024-07-30', fechaNacimiento: '1992-04-10' }
];

// Generar usuarios adicionales para llegar a 127
for (let i = 48; i <= 127; i++) {
    const nombres = ['Alex', 'Bárbara', 'Cristóbal', 'Diana', 'Eduardo', 'Francisca', 'Gustavo', 'Hortensia', 'Iván', 'Jocelyn', 'Kevin', 'Lorena', 'Mauricio', 'Natalia', 'Óscar', 'Paola', 'Quentin', 'Rocío', 'Sergio', 'Tamara', 'Ulises', 'Viviana', 'Walter', 'Ximena', 'Yolanda', 'Zoe'];
    const apellidos = ['Aguilar', 'Bustamante', 'Carrasco', 'Delgado', 'Espinoza', 'Figueroa', 'González', 'Herrera', 'Ibáñez', 'Jara', 'Klein', 'Lara', 'Molina', 'Navarro', 'Orellana', 'Pizarro', 'Quiroz', 'Rojas', 'Sepúlveda', 'Tapia', 'Urrutia', 'Vega', 'Wagner', 'Yáñez', 'Zúñiga'];
    const regiones = ['Metropolitana', 'Valparaíso', 'Biobío', 'Ñuble'];
    const comunas = ['Santiago', 'Valparaíso', 'Concepción', 'Chillán'];
    const estados = ['activo', 'inactivo', 'pendiente'];
    
    const nombre = nombres[Math.floor(Math.random() * nombres.length)];
    const apellido = apellidos[Math.floor(Math.random() * apellidos.length)];
    const region = regiones[Math.floor(Math.random() * regiones.length)];
    const comuna = comunas[Math.floor(Math.random() * comunas.length)];
    const estado = estados[Math.floor(Math.random() * estados.length)];
    
    // Generar fechas aleatorias
    const año = 2024;
    const mes = Math.floor(Math.random() * 12) + 1;
    const dia = Math.floor(Math.random() * 28) + 1;
    const fechaRegistro = `${año}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
    
    const añoNacimiento = 1980 + Math.floor(Math.random() * 25);
    const mesNacimiento = Math.floor(Math.random() * 12) + 1;
    const diaNacimiento = Math.floor(Math.random() * 28) + 1;
    const fechaNacimiento = `${añoNacimiento}-${mesNacimiento.toString().padStart(2, '0')}-${diaNacimiento.toString().padStart(2, '0')}`;
    
    users.push({
        id: i,
        nombre: `${nombre} ${apellido}`,
        correo: `${nombre.toLowerCase()}.${apellido.toLowerCase()}@email.com`,
        telefono: `+569${Math.floor(Math.random() * 90000000) + 10000000}`,
        region: region,
        comuna: comuna,
        estado: estado,
        fechaRegistro: fechaRegistro,
        fechaNacimiento: fechaNacimiento
    });
}

let filteredUsers = [...users];
let currentPage = 1;
const usersPerPage = 10;

// Cargar usuarios al iniciar la página
document.addEventListener('DOMContentLoaded', function() {
    displayUsers();
    setupEventListeners();
    updatePagination();
});

// Configurar event listeners
function setupEventListeners() {
    // Búsqueda
    document.getElementById('searchUsers').addEventListener('input', function() {
        currentPage = 1;
        filterUsers();
    });
    
    // Filtros
    document.getElementById('filterStatus').addEventListener('change', function() {
        currentPage = 1;
        filterUsers();
    });
    
    document.getElementById('filterRegion').addEventListener('change', function() {
        currentPage = 1;
        filterUsers();
    });
}

// Filtrar usuarios
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

// Mostrar usuarios
function displayUsers() {
    const tbody = document.getElementById('usersTableBody');
    if (!tbody) return;
    
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    const usersToShow = filteredUsers.slice(startIndex, endIndex);
    
    tbody.innerHTML = '';
    
    usersToShow.forEach(user => {
        const row = createUserRow(user);
        tbody.innerHTML += row;
    });
}

// Crear fila de usuario
function createUserRow(user) {
    const estadoClass = user.estado === 'activo' ? 'text-success' : 
                       user.estado === 'inactivo' ? 'text-danger' : 'text-warning';
    
    return `
        <tr>
            <td>${user.id}</td>
            <td>${user.nombre}</td>
            <td>${user.correo}</td>
            <td>${user.telefono}</td>
            <td>${user.region}</td>
            <td><span class="${estadoClass}">${user.estado.charAt(0).toUpperCase() + user.estado.slice(1)}</span></td>
            <td>${formatDate(user.fechaRegistro)}</td>
            <td>
                <div class="btn-group" role="group">
                    <button class="btn btn-outline-primary btn-sm" onclick="editUser(${user.id})" title="Editar">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-outline-${user.estado === 'activo' ? 'warning' : 'success'} btn-sm" onclick="toggleUserStatus(${user.id})" title="${user.estado === 'activo' ? 'Desactivar' : 'Activar'}">
                        <i class="bi bi-${user.estado === 'activo' ? 'pause' : 'play'}"></i>
                    </button>
                    <button class="btn btn-outline-danger btn-sm" onclick="deleteUser(${user.id})" title="Eliminar">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `;
}

// Formatear fecha
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CL');
}

// Actualizar paginación
function updatePagination() {
    const pagination = document.getElementById('pagination');
    if (!pagination) return;
    
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    
    let paginationHTML = '';
    
    // Botón anterior
    paginationHTML += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage - 1})">Anterior</a>
        </li>
    `;
    
    // Números de página
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
            paginationHTML += `
                <li class="page-item ${i === currentPage ? 'active' : ''}">
                    <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
                </li>
            `;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            paginationHTML += '<li class="page-item disabled"><span class="page-link">...</span></li>';
        }
    }
    
    // Botón siguiente
    paginationHTML += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Siguiente</a>
        </li>
    `;
    
    pagination.innerHTML = paginationHTML;
}

// Cambiar página
function changePage(page) {
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        displayUsers();
        updatePagination();
    }
}

// Crear nuevo usuario
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

// Editar usuario
function editUser(userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        // Aquí podrías abrir un modal de edición
        alert(`Editando usuario: ${user.nombre}`);
    }
}

// Cambiar estado del usuario
function toggleUserStatus(userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        user.estado = user.estado === 'activo' ? 'inactivo' : 'activo';
        displayUsers();
        updateDashboardStats();
    }
}

// Eliminar usuario
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

// Actualizar estadísticas del dashboard
function updateDashboardStats() {
    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.estado === 'activo').length;
    
    // Actualizar en el dashboard si está disponible
    const totalUsersElement = document.getElementById('totalUsers');
    if (totalUsersElement) {
        totalUsersElement.textContent = totalUsers;
    }
    
    // Llamar a la función del dashboard si está disponible
    if (typeof window.updateUserCount === 'function') {
        window.updateUserCount(totalUsers);
    }
}

// Hacer el array de usuarios global
window.users = users;

// Exportar funciones para uso global
window.crearUsuario = crearUsuario;
window.editUser = editUser;
window.toggleUserStatus = toggleUserStatus;
window.deleteUser = deleteUser;
window.changePage = changePage;
