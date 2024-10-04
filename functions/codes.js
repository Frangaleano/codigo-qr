const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const codesFilePath = path.join(process.cwd(), 'codes.json'); // Usar process.cwd()

// Ruta para obtener un código
router.get('/get-code', (req, res) => {
    fs.readFile(codesFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error al leer el archivo de códigos');
        }

        const codes = JSON.parse(data);
        if (codes.length === 0) {
            return res.status(404).send('No hay más códigos disponibles');
        }

        // Solo devolvemos el último código sin eliminarlo todavía
        const code = codes[codes.length - 1]; // Obtiene el último código
        res.json({ code });
    });
});

// Ruta para eliminar el código al recargar la página
router.post('/remove-code', (req, res) => {
    const { code } = req.body;

    fs.readFile(codesFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error al leer el archivo de códigos');
        }

        let codes = JSON.parse(data);

        // Eliminar el código que se ha enviado
        const updatedCodes = codes.filter(c => c !== code);

        fs.writeFile(codesFilePath, JSON.stringify(updatedCodes), (err) => {
            if (err) {
                return res.status(500).send('Error al actualizar el archivo de códigos');
            }
            res.json({ message: 'Código eliminado correctamente' });
        });
    });
});

module.exports = router;
