const fs = require('fs');
const path = require('path');

exports.handler = async () => {
    // Asegurarte de que el archivo codes.json esté en la misma carpeta que la función
    const filePath = path.join(__dirname, 'codes.json'); // Correcto para Netlify Functions

    try {
        const fileData = fs.readFileSync(filePath, 'utf8');
        let codes = JSON.parse(fileData); // Parsear el contenido del archivo JSON

        if (codes.length === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'No hay más códigos disponibles' }),
            };
        }

        const code = codes.shift();  // Obtener y eliminar el primer código del array

        // Guardar el nuevo array de códigos en el archivo
        fs.writeFileSync(filePath, JSON.stringify(codes, null, 2), 'utf8');

        return {
            statusCode: 200,
            body: JSON.stringify({ code: code }),
        };
    } catch (error) {
        console.error('Error al leer o escribir el archivo:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error al obtener el código' }),
        };
    }
};
