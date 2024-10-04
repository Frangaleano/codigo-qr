const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Asegúrate de que el archivo esté en la ubicación correcta
const codesRouter = require('./functions/codes'); // Ajusta la ruta según la ubicación de tu archivo
app.use('/api', codesRouter);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
