// db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'tu_usuario', // Reemplaza con tu usuario de MySQL
    password: 'tu_contraseña', // Reemplaza con tu contraseña de MySQL
    database: 'tienda_ropa' // Nombre de la base de datos
});

db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
    } else {
        console.log('Conectado a la base de datos MySQL');
    }
});

module.exports = db;
