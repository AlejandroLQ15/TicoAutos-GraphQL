const mongoose = require('mongoose');
const Vehicle = require('../models/vehicle');

const buildFilters = (args) => {
  const filter = {};

  if (args.marca && args.marca.trim()) {
    filter.marca = new RegExp(args.marca.trim(), 'i');
  }
  if (args.modelo && args.modelo.trim()) {
    filter.modelo = new RegExp(args.modelo.trim(), 'i');
  }

  if (args.minPrecio != null || args.maxPrecio != null) {
    filter.precio = {};
    if (args.minPrecio != null) filter.precio.$gte = args.minPrecio;
    if (args.maxPrecio != null) filter.precio.$lte = args.maxPrecio;
  }

  if (args.minAnio != null || args.maxAnio != null) {
    filter.anio = {};
    if (args.minAnio != null) filter.anio.$gte = args.minAnio;
    if (args.maxAnio != null) filter.anio.$lte = args.maxAnio;
  }

  return filter;
};

const resolvers = {
  Query: {
    vehicles: async (_, args) => {
      const page = Math.max(1, args.page || 1);
      const limit = Math.min(100, Math.max(1, args.limit || 20));
      const skip = (page - 1) * limit;
      const filter = buildFilters(args);

      return Vehicle.find(filter)
        .populate('owner_id', 'username nombre')
        .sort({ anio: -1, precio: -1 })
        .skip(skip)
        .limit(limit)
        .lean();
    },

    vehicle: async (_, { id }) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
      }

      return Vehicle.findById(id)
        .populate('owner_id', 'username nombre')
        .lean();
    },
  },

  Vehicle: {
    id: (vehicle) => String(vehicle._id),
    owner: (vehicle) => {
      const owner = vehicle.owner_id;
      if (!owner) return null;

      if (typeof owner === 'string') {
        return { id: owner, username: null, nombre: null };
      }

      return {
        id: String(owner._id || owner.id),
        username: owner.username || null,
        nombre: owner.nombre || null,
      };
    },
  },
};

module.exports = { resolvers };
