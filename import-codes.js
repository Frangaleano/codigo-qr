const mongoose = require('mongoose');

const uri = 'mongodb+srv://frangvleano:jazmin170115.@cluster0.8kfl4.mongodb.net/codes?retryWrites=true&w=majority&appName=Cluster0';
const codes = [
    "SPR000", "WZL827", "EKD737", "XQE762", "FHE321", "TWW540", "LKZ065", "USG524",
    "CTA818", "HJO533", "ZXV904", "KCS707", "SVI640", "DQS221", "DGQ096", "IFZ135",
    "MFF144", "NOA508", "BVY573", "YVJ321", "DSG322", "SIK692", "XRG957", "XJB435",
    "GZL376", "QLV381", "AOB648", "YZD145", "JZH537", "SGM011", "ZPQ751", "HCQ707",
    "WLZ673", "UCG776", "FPX633", "TAH094", "TED654", "RKH028", "MOJ873", "WWL038",
    "VIM919", "BEO872", "NEX536", "BKN998", "EHH751", "TFJ205", "GDX381", "MDB034",
    "RXI327", "RVA302", "VAW305", "QDR303", "VJP129", "DVE781", "KKC146", "WMP756",
    "ROX343", "EWM409", "OPN671", "MEW803", "TXQ311", "JDW313", "KSW350", "CDR948",
    "NAK120", "KYE843", "WRA853", "ESI353", "JGR078", "FPC634", "BJD423", "AJF250",
    "ESL489", "ZWN666", "DYQ654", "SPS582", "UQI849", "ETZ954", "SHW745", "ILM026",
    "VZX681", "MLF273", "MTO944", "SQS974", "ZRJ955", "WZG063", "LXW243", "GAF664",
    "MYU009", "QBT712", "NYX477", "JHK852", "XMN208", "XIM116", "JBY618", "QJX331",
    "ZOV067", "FVR994", "KFU660", "MRT804", "OXW975", "JWF104", "RPY336", "FQO307",
    "FTE064", "QFE385", "MXF508", "OFA440", "YKF841", "NRK904", "WCD293", "MOL865",
    "MQB377", "MGI230", "ZNN256", "VMS775", "UWU577", "WRQ359", "CMZ991", "CIF153",
    "XFY956", "QXG077", "IBH342", "LWG356", "XRN410", "GVF133", "LNU361", "TWS667",
    "BBH557", "UPB410", "OWL428", "FLF233", "PCN674", "GOX934", "NGM652", "SAK860",
    "PKE773", "DTU338", "AQB574", "LQE605", "FEC139", "FPJ363", "SWM972", "SBD520",
    "XYI659", "APN581", "QOL596", "IBL418", "GDC231", "XGY032", "NJL881", "XUG606",
    "WCK330", "QOO067", "KVM708", "SVZ305", "CDN075", "DTU946", "SBS440", "ZVZ806",
    "SKO971", "GBL275", "PWQ455", "ICY018", "SMJ842", "MXS187", "GHJ050", "AMN537",
    "ZXH951", "TWV553", "AVF853", "SQP561", "FZM441", "QIE679", "HMS495", "VTB176",
    "PKT110", "EDS115", "PZR797", "FNA470", "OCB059", "FSN087", "JKN522", "QTW567",
    "TGY494", "FUR645", "XAY708", "GVC522", "KEN519", "MHA813", "BGA757", "BDK020",
    "NPU671", "TIH590", "GDS974", "LSP713", "LEC446", "ZPV462", "QYG775", "MRX931",
    "EFO525", "KQO631", "IOP212", "ZGY377", "KKR428", "OJH862", "EDU793", "DFP442",
    "TZB174", "IXX226", "CCK862", "NSR544", "LKY555", "FCH815", "CNJ092", "PYG056",
    "TLL955", "KDO108", "TJA015", "PQD499", "QTN709", "POF871", "SHP843", "QFS463",
    "MWM082", "WZG351", "HHV832", "CRI132", "IWY236", "ION393", "IJK869", "MEY034",
    "HBS100", "RAG800", "MYL789", "EJA328", "PEV345", "WMW482", "AQG195", "IVQ159",
    "VNE497", "LIO433", "RZI962", "KEE857", "GDW765", "HCD831", "HYB379", "LUY213",
    "DKC022", "ASZ744", "BHN881", "RGL504", "RGL393", "LYB451", "GCR565", "PGA129",
    "QLA931", "KHI196", "GHX310", "QXR834"
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
