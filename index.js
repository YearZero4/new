const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000; // Puerto asignado por Railway

app.use(cors());
app.use(express.json());

const messages = [];

// Rutas
app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API de Mensajes!');
});

app.get('/messages', (req, res) => {
    res.json(messages);
});

app.post('/messages', (req, res) => {
    const { author, content } = req.body;
    if (!author || !content) {
        return res.status(400).json({ error: 'Autor y contenido son requeridos.' });
    }
    const newMessage = { id: messages.length + 1, author, content };
    messages.push(newMessage);
    res.status(201).json(newMessage);
});

app.put('/messages/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { author, content } = req.body;
    const message = messages.find(msg => msg.id === id);

    if (!message) return res.status(404).json({ error: 'Mensaje no encontrado.' });

    if (author) message.author = author;
    if (content) message.content = content;

    res.json(message);
});

app.delete('/messages/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = messages.findIndex(msg => msg.id === id);

    if (index === -1) return res.status(404).json({ error: 'Mensaje no encontrado.' });

    messages.splice(index, 1);
    res.status(204).send();
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
