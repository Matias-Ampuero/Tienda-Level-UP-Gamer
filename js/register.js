// Level-Up Gamer - Validación de Registro

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
});

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

function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const form = document.getElementById('registerForm');
    form.insertBefore(alertDiv, form.firstChild);
    
    // Remover después de 5 segundos
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.parentNode.removeChild(alertDiv);
        }
    }, 5000);
}
