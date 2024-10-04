const fs = require('fs');
const path = require('path');

const codesFilePath = path.join(__dirname, '..', 'codes.json'); // Ajuste de la ruta

exports.handler = async (event) => {
    try {
        const body = JSON.parse(event.body); // Asegúrate de que event.body está presente
        const { code } = body; // Extrae el código del cuerpo de la solicitud

        // Lee el archivo de códigos
        const data = await fs.promises.readFile(codesFilePath, 'utf8');
        let codes = JSON.parse(data);

        // Eliminar el código que se ha enviado
        const updatedCodes = codes.filter(c => c !== code);

        // Escribir de nuevo en el archivo
        await fs.promises.writeFile(codesFilePath, JSON.stringify(updatedCodes));

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Código eliminado correctamente' }),
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error al eliminar el código' }),
        };
    }
};
