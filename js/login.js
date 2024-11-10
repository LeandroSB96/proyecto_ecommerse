document.querySelector('#loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    let isValid = true;

    // Limpiar mensajes anteriores
    document.querySelectorAll('.error').forEach(error => {
        error.textContent = '';
    });

    // Validar correo electrónico
    const email = document.querySelector('#emailLogin').value.trim();
    const emailError = document.querySelector('#emailError');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (!emailPattern.test(email)) {
        emailError.textContent = 'Por favor, ingresa un correo electrónico válido.';
        isValid = false;
    }

    // Validar contraseña
    const password = document.querySelector('#passwordLogin').value;
    const passwordError = document.querySelector('#passwordError');
    if (password.length < 6) {
        passwordError.textContent = 'La contraseña debe tener al menos 6 caracteres.';
        isValid = false;
    }

    // Si todo es válido, enviar los datos al servidor
    if (isValid) {
        const data = {
            email: email,
            password: password
        };

        // Envío de datos al servidor
        fetch('/ruta/a/tu/api/de/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json();
        })
        .then(data => {
            // Mensaje de éxito debajo del último campo
            const successMessage = document.createElement('span');
            successMessage.className = 'success';
            successMessage.textContent = 'Inicio de sesión exitoso. ¡Bienvenido!';
            document.querySelector('.formulario').appendChild(successMessage);
        })
        .catch((error) => {
            // Mensaje de error
            const errorMessage = document.createElement('span');
            errorMessage.className = 'error';
            errorMessage.textContent = 'Error: ' + error.message;
            document.querySelector('.formulario').appendChild(errorMessage);
        });
    }
});
