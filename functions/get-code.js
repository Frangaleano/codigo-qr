const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  const codesFilePath = path.join(__dirname, 'codes.json');

  try {
    // Leer el archivo de códigos
    const data = fs.readFileSync(codesFilePath, 'utf8');
    const codes = JSON.parse(data);

    if (codes.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'No hay más códigos disponibles' }),
      };
    }

    // Devuelve el último código sin eliminarlo
    const code = codes[codes.length - 1];
    return {
      statusCode: 200,
      body: JSON.stringify({ code }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error al leer el archivo de códigos' }),
    };
  }
};
