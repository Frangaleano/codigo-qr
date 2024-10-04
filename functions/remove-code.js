const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
    const filePath = path.join(__dirname, 'codes.json');

    try {
        const body = JSON.parse(event.body); // Asegúrate de que event.body está presente
        const { code } = body;  // Extrae el código del cuerpo de la solicitud

        const fileData = fs.readFileSync(filePath, 'utf8');
        let codes = JSON.parse(fileData);

        const codeIndex = codes.indexOf(code);  // Buscar el código en el array

        if (codeIndex === -1) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'El código no fue encontrado o ya fue usado' }),
            };
        }

        codes.splice(codeIndex, 1);  // Eliminar el código del array

        // Guardar el nuevo array de códigos en el archivo
        fs.writeFileSync(filePath, JSON.stringify(codes, null, 2), 'utf8');

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Código eliminado correctamente' }),
        };
    } catch (error) {
        console.error('Error al leer o escribir el archivo:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error al eliminar el código' }),
        };
    }
};
