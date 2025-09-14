// Level-Up Gamer - Login

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
    
    // Cargar email guardado si existe
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
        document.getElementById('email').value = savedEmail;
        document.getElementById('remember').checked = true;
    }
});

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
