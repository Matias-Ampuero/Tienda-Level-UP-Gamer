// Level-Up Gamer - Sistema de Validaciones Avanzadas

// Clase para manejar validaciones de formularios
class FormValidator {
    constructor() {
        this.errors = {};
        this.init();
    }

    init() {
        // Configurar validaciones en tiempo real
        this.setupRealTimeValidation();
    }

    // Configurar validaciones en tiempo real
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

        // Validación de contraseña en tiempo real
        const passwordInputs = document.querySelectorAll('input[type="password"]');
        passwordInputs.forEach(input => {
            input.addEventListener('input', () => this.validatePassword(input));
            input.addEventListener('blur', () => this.validatePassword(input));
        });

        // Validación de teléfono en tiempo real
        const phoneInputs = document.querySelectorAll('input[type="tel"]');
        phoneInputs.forEach(input => {
            input.addEventListener('input', () => this.formatPhone(input));
            input.addEventListener('blur', () => this.validatePhone(input));
        });

        // Validación de nombre en tiempo real
        const nameInputs = document.querySelectorAll('input[name="nombre"], #nombre');
        nameInputs.forEach(input => {
            input.addEventListener('blur', () => this.validateName(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    }

    // Validar formulario completo
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

    // Validar campo individual
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

    // Validar email
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

    // Validar contraseña
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

    // Validar teléfono
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

    // Formatear teléfono mientras se escribe
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

    // Validar nombre
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

    // Validar fecha
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

    // Validaciones específicas del formulario de registro
    validateRegistrationForm(form) {
        let isValid = true;

        // Validar coincidencia de contraseñas
        const password = form.querySelector('#password').value;
        const confirmPassword = form.querySelector('#confirmPassword').value;
        
        if (password !== confirmPassword) {
            this.showError(form.querySelector('#confirmPassword'), 'Las contraseñas no coinciden');
            isValid = false;
        }

        // Validar términos y condiciones
        const termsCheckbox = form.querySelector('#terminos');
        if (termsCheckbox && !termsCheckbox.checked) {
            this.showError(termsCheckbox, 'Debes aceptar los términos y condiciones');
            isValid = false;
        }

        return isValid;
    }

    // Validaciones específicas del formulario de login
    validateLoginForm(form) {
        let isValid = true;

        const email = form.querySelector('#email').value;
        const password = form.querySelector('#password').value;

        if (!email || !password) {
            this.showError(form.querySelector('#email'), 'Email y contraseña son obligatorios');
            isValid = false;
        }

        return isValid;
    }

    // Validaciones específicas del formulario de contacto
    validateContactForm(form) {
        let isValid = true;

        const message = form.querySelector('#mensaje').value;
        if (message && message.length < 10) {
            this.showError(form.querySelector('#mensaje'), 'El mensaje debe tener al menos 10 caracteres');
            isValid = false;
        }

        return isValid;
    }

    // Mostrar error
    showError(field, message) {
        this.clearError(field);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message text-danger mt-1';
        errorDiv.innerHTML = `<i class="bi bi-exclamation-triangle me-1"></i>${message}`;
        
        field.classList.add('is-invalid');
        field.parentNode.appendChild(errorDiv);
        
        this.errors[field.name || field.id] = message;
    }

    // Mostrar advertencia
    showWarning(field, message) {
        this.clearError(field);
        
        const warningDiv = document.createElement('div');
        warningDiv.className = 'warning-message text-warning mt-1';
        warningDiv.innerHTML = `<i class="bi bi-exclamation-circle me-1"></i>${message}`;
        
        field.parentNode.appendChild(warningDiv);
    }

    // Mostrar éxito
    showSuccess(field, message) {
        this.clearError(field);
        
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message text-success mt-1';
        successDiv.innerHTML = `<i class="bi bi-check-circle me-1"></i>${message}`;
        
        field.parentNode.appendChild(successDiv);
    }

    // Limpiar error
    clearError(field) {
        field.classList.remove('is-invalid');
        
        const errorMsg = field.parentNode.querySelector('.error-message');
        if (errorMsg) errorMsg.remove();
        
        const warningMsg = field.parentNode.querySelector('.warning-message');
        if (warningMsg) warningMsg.remove();
        
        const successMsg = field.parentNode.querySelector('.success-message');
        if (successMsg) successMsg.remove();
    }

    // Obtener errores
    getErrors() {
        return this.errors;
    }

    // Limpiar todos los errores
    clearAllErrors() {
        this.errors = {};
        const errorMessages = document.querySelectorAll('.error-message, .warning-message, .success-message');
        errorMessages.forEach(msg => msg.remove());
        
        const invalidFields = document.querySelectorAll('.is-invalid');
        invalidFields.forEach(field => field.classList.remove('is-invalid'));
    }
}

// Instanciar validador global
const formValidator = new FormValidator();

// Funciones globales para usar en los formularios
function validarFormulario(formId) {
    return formValidator.validateForm(formId);
}

function limpiarErrores() {
    formValidator.clearAllErrors();
}

// Auto-validación al enviar formularios
document.addEventListener('DOMContentLoaded', function() {
    // Formulario de registro
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validarFormulario('registerForm')) {
                // Simular registro exitoso
                mostrarMensaje('¡Registro exitoso! Bienvenido a Level-Up Gamer', 'success');
                registerForm.reset();
            } else {
                mostrarMensaje('Por favor, corrige los errores en el formulario', 'error');
            }
        });
    }

    // Formulario de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validarFormulario('loginForm')) {
                // Simular login exitoso
                mostrarMensaje('¡Login exitoso! Bienvenido de vuelta', 'success');
                loginForm.reset();
            } else {
                mostrarMensaje('Credenciales incorrectas', 'error');
            }
        });
    }

    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validarFormulario('contactForm')) {
                // Simular envío exitoso
                mostrarMensaje('¡Mensaje enviado! Te contactaremos pronto', 'success');
                contactForm.reset();
            } else {
                mostrarMensaje('Por favor, completa todos los campos requeridos', 'error');
            }
        });
    }
});

// Función para mostrar mensajes
function mostrarMensaje(mensaje, tipo) {
    // Crear modal de mensaje
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <i class="bi bi-${tipo === 'success' ? 'check-circle text-success' : 'exclamation-triangle text-danger'} me-2"></i>
                        ${tipo === 'success' ? 'Éxito' : 'Error'}
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <p>${mensaje}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Aceptar</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
    
    // Limpiar modal después de cerrar
    modal.addEventListener('hidden.bs.modal', function() {
        document.body.removeChild(modal);
    });
}
