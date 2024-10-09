const fs = require('fs');
const path = require('path');

exports.handler = async () => {
    const filePath = path.join(process.cwd(), 'codes.json'); // Usar process.cwd() para obtener la ruta del directorio de trabajo

    try {
        const fileData = fs.readFileSync(filePath, 'utf8');
        let codes = JSON.parse(fileData);

        if (codes.length === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'No hay más códigos disponibles' }),
            };
        }

        const code = codes.shift(); 

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
