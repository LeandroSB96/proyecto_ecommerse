const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Middleware para analizar el cuerpo de las solicitudes
app.use(express.json());

// Conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '78923', 
    database: 'ecommerce'
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos');
});

// Ejemplo de una ruta para obtener usuarios
app.get('/usuarios', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
});
