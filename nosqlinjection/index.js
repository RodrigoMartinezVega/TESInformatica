const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('Vista'));

mongoose.connect('mongodb+srv://student:dPgF0sb0ADBUZHCI@clusterunam.6pxlppf.mongodb.net/vulnerableApp?retryWrites=true&w=majority&appName=ClusterUNAM', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Conectado a MongoDB Atlas"))
.catch(err => console.error(" Error al conectar:", err));

// Modelo
const User = require('./modelousuario/Usuario');

// Página de login
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Vista', 'index.html'));
});

// Ruta vulnerable al login (inyección NoSQL)
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username, password });
        if (user) {
            res.send(" Bienvenido, acceso concedido");
        } else {
            res.send(" Credenciales incorrectas");
        }
    } catch (err) {
        res.status(500).send(" Error del servidor");
    }
});

// Ruta para crear un usuario real
app.get('/crear', async (req, res) => {
    await User.create({ username: 'admin', password: 'admin123' });
    res.send(" Usuario creado: admin / admin123");
});

app.listen(port, () => {
    console.log(`Servidor activo en http://localhost:${port}`);
});
