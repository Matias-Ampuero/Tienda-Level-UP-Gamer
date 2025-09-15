// Level-Up Gamer - Formulario de Contacto

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener datos del formulario
        const nombreCompleto = document.getElementById('nombreCompleto').value;
        const correo = document.getElementById('correo').value;
        const asunto = document.getElementById('asunto').value;
        const contenido = document.getElementById('contenido').value;
        const aceptoTerminos = document.getElementById('aceptoTerminos').checked;
        
        // Validaciones
        if (!validarFormulario(nombreCompleto, correo, asunto, contenido, aceptoTerminos)) {
            return;
        }
        
        // Simular envío del formulario
        enviarMensaje(nombreCompleto, correo, asunto, contenido);
    });
    
    // Validación en tiempo real
    document.getElementById('correo').addEventListener('blur', function() {
        validarEmail(this);
    });
    
    document.getElementById('contenido').addEventListener('input', function() {
        validarContenido(this);
    });
});

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

function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    field.classList.remove('is-invalid');
    
    const existingError = document.getElementById(`error-${fieldId}`);
    if (existingError) {
        existingError.remove();
    }
}

function enviarMensaje(nombre, correo, asunto, contenido) {
    // Mostrar loading
    const submitBtn = document.querySelector('#contactForm button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Enviando...';
    submitBtn.disabled = true;
    
    // Simular envío (2 segundos)
    setTimeout(() => {
        // Mostrar mensaje de éxito
        showAlert('¡Mensaje enviado exitosamente! Te responderemos pronto.', 'success');
        
        // Limpiar formulario
        document.getElementById('contactForm').reset();
        
        // Restaurar botón
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Simular redirección a página de agradecimiento
        setTimeout(() => {
            showAlert('Gracias por contactarnos. Te redirigiremos a la página principal.', 'info');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }, 1500);
        
    }, 2000);
}

function showAlert(message, type) {
    // Crear alerta
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 350px; max-width: 500px;';
    alertDiv.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="bi bi-${getAlertIcon(type)} me-2"></i>
            <div class="flex-grow-1">${message}</div>
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Remover después de 5 segundos
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.parentNode.removeChild(alertDiv);
        }
    }, 5000);
}

function getAlertIcon(type) {
    const icons = {
        'success': 'check-circle-fill',
        'danger': 'exclamation-triangle-fill',
        'warning': 'exclamation-triangle-fill',
        'info': 'info-circle-fill'
    };
    return icons[type] || 'info-circle-fill';
}
