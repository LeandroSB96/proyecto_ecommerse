/*!
* Start Bootstrap - Shop Homepage v5.0.6 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project 

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#loginForm');
    const registerForm = document.querySelector('#registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const emailInput = loginForm.querySelector('#emailLogin');
            const passwordInput = loginForm.querySelector('#passwordLogin');
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            if (!email || !password) {
                showError('emailError', 'Por favor, completa todos los campos.');
                return;
            }

            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })
            .then(response => response.json())
            .then(data => {
                // Aquí puedes manejar la respuesta del servidor
                console.log(data);
            })
            .catch(error => {
                console.error('Error al enviar datos:', error);
            });
            
            emailInput.value = '';
            passwordInput.value = '';
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const fullNameInput = registerForm.querySelector('#fullName');
            const emailInput = registerForm.querySelector('#emailRegister');
            const passwordInput = registerForm.querySelector('#passwordRegister');
            const fullName = fullNameInput.value.trim();
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            if (!fullName || !email || !password) {
                showError('fullNameError', 'Por favor, completa todos los campos.');
                return;
            }

           
            fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fullName, email, password }),
            })
            .then(response => response.json())
            .then(data => {
                // Aquí puedes manejar la respuesta del servidor
                console.log(data);
            })
            .catch(error => {
                console.error('Error al enviar datos:', error);
            });

            // Limpiar los campos después del envío
            fullNameInput.value = '';
            emailInput.value = '';
            passwordInput.value = '';
        });
    }

    function showError(id, message) {
        const errorElement = document.querySelector(`#${id}`);
        if (errorElement) {
            errorElement.textContent = message;
        }
    }
});

 
