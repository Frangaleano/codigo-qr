const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  const { code } = JSON.parse(event.body);  // Obtener el código enviado en la solicitud
  const codesFilePath = path.join(__dirname, 'codes.json');

  try {
    // Leer el archivo de códigos
    const data = fs.readFileSync(codesFilePath, 'utf8');
    let codes = JSON.parse(data);

    // Filtrar el código eliminado
    const updatedCodes = codes.filter(c => c !== code);

    // Guardar el archivo actualizado
    fs.writeFileSync(codesFilePath, JSON.stringify(updatedCodes));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Código eliminado correctamente' }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error al actualizar el archivo de códigos' }),
    };
  }
};
