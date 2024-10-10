const mongoose = require('mongoose');

const uri = 'mongodb+srv://frangvleano:jazmin170115.@cluster0.8kfl4.mongodb.net/codes?retryWrites=true&w=majority&appName=Cluster0';

const codes = [
    "AJV237",
    "OQY556",
    "CVN120",
    "RUW304",
    "TPZ475",
    "LZK681",
    "FBR519",
    "GEU861",
    "ZWX438",
    "JID932",
    "WPS263",
    "EQS593",
    "UBM826",
    "NQA012",
    "PHR603",
    "YZK374",
    "MIJ759",
    "DUK032",
    "SOV117",
    "XGR949",
    "CZV580",
    "TAQ201",
    "JDW689",
    "KHW204",
    "SRB742",
    "FGP319",
    "EZI230",
    "WJA644",
    "BXU157",
    "MFH692",
    "VCB488",
    "RDP307",
    "YUH583",
    "GLF024",
    "QLO168",
    "JRV742",
    "WZH812",
    "MUL013",
    "VTB204",
    "PCE763",
    "USG430",
    "ZWB123",
    "FYD506",
    "LMA934",
    "CPT478",
    "RQJ209",
    "HRV671",
    "GYW982",
    "WQO725"
];

// Agrega tus códigos aquí

// Conectar a la base de datos
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));

// Definir el esquema y modelo
const codeSchema = new mongoose.Schema({
    code: { type: String, required: true },
});

const Code = mongoose.model('Code', codeSchema, 'codes');

const importCodes = async () => {
    try {
        const codeDocuments = codes.map(code => ({ code })); // Crear un objeto para cada código
        await Code.insertMany(codeDocuments); // Insertar los códigos en la colección
        console.log('Códigos importados correctamente');
    } catch (error) {
        console.error('Error al importar códigos:', error);
    } finally {
        mongoose.connection.close(); // Cerrar la conexión
    }
};

importCodes();
