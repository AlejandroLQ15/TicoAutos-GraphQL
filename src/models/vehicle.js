const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema(
  {
    marca: { type: String, required: true },
    modelo: { type: String, required: true },
    anio: { type: Number, required: true },
    precio: { type: Number, required: true },
    estado: {
      type: String,
      enum: ['disponible', 'reservado', 'vendido'],
      default: 'disponible',
    },
    fotos: { type: [String], default: [] },
    kilometraje: { type: Number, default: null },
    tipoCombustible: { type: String, default: null },
    tipoTransmision: { type: String, default: null },
    provincia: { type: String, default: null },
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    collection: 'vehicles',
    timestamps: false,
    versionKey: false,
  }
);

module.exports = mongoose.models.Vehicle || mongoose.model('Vehicle', vehicleSchema);