const { Schema, model } = require('mongoose');

const imagenSchema = new Schema({
    titulo: {type: String},
    descripcion: {type: String},
    filename: {type: String},
    path: {type: String},
    originalname: {type: String},
    mimetype: {type: String},
    tamanio: { type: Number},
    fecha: {type: Date, default: Date.now()}
});

module.exports = model('Imagen', imagenSchema);