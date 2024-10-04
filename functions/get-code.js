const fs = require('fs');
const path = require('path');

const codesFilePath = path.join(__dirname, '..', 'codes.json'); // Ajuste de la ruta

exports.handler = async () => {
    try {
        const data = await fs.promises.readFile(codesFilePath, 'utf8');
        const codes = JSON.parse(data);

        if (!codes || codes.length === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'No hay más códigos disponibles' }),
            };
        }

        // Solo devolvemos el último código
        const code = codes[codes.length - 1];
        return {
            statusCode: 200,
            body: JSON.stringify({ code }),
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error al obtener el código' }),
        };
    }
};
