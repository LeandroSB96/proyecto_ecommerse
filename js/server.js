const http = require('http');
const { parse } = require('querystring');
const validator = require('validator'); 

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        handlePostRequest(req, res);
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});

function handlePostRequest(req, res) {
    let body = '';
    
    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', () => {
        try {
            const formData = parse(body);

            const { email, password } = formData;

            if (!email || !password) {
                throw new Error('Campos incompletos');
            }

            if (!validator.isEmail(email)) {
                throw new Error('Formato de correo electrónico inválido');
            }

            if (password.length < 6) {
                throw new Error('La contraseña debe tener al menos 6 caracteres');
            }

            // Aquí procesarías la autenticación o el registro
            // Ejemplo básico:
            console.log(`Email: ${email}, Password: ${password}`);

            // Simulación de respuesta exitosa
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'Datos recibidos correctamente' }));
        } catch (error) {
            // Manejo de errores
            console.error('Error al procesar la solicitud:', error.message);
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: error.message }));
        }
    });
}
