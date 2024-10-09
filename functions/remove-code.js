const mongoose = require('mongoose');

// Conectar a la base de datos
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Verificar si el modelo ya ha sido definido
let Code;
try {
    Code = mongoose.model('Code');
} catch (error) {
    Code = mongoose.model('Code', new mongoose.Schema({
        code: { type: String, required: true }
    }));
}

exports.handler = async (event) => {
    const { code } = JSON.parse(event.body); // Obtener el código del cuerpo de la petición

    try {
        const result = await Code.findOneAndDelete({ code: code }); // Eliminar el código

        if (!result) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Código no encontrado' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Código eliminado correctamente' }),
        };
    } catch (error) {
        console.error('Error al eliminar el código:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error al eliminar el código' }),
        };
    }
};
