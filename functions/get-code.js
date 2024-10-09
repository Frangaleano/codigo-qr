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

exports.handler = async () => {
    try {
        // Obtener un código de la base de datos
        const code = await Code.findOneAndDelete(); // Elimina y retorna el primer código

        if (!code) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'No hay más códigos disponibles' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ code: code.code }), // Devuelve solo el código
        };
    } catch (error) {
        console.error('Error al obtener el código:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error al obtener el código' }),
        };
    }
};
