const typeDefs = `#graphql
  type VehicleOwner {
    id: ID!
    username: String
    nombre: String
  }

  type Vehicle {
    id: ID!
    marca: String!
    modelo: String!
    anio: Int!
    precio: Float!
    estado: String!
    fotos: [String!]!
    kilometraje: Int
    tipoCombustible: String
    tipoTransmision: String
    provincia: String
    owner: VehicleOwner
  }

  type Query {
    vehicles(
      page: Int = 1
      limit: Int = 20
      marca: String
      modelo: String
      minPrecio: Float
      maxPrecio: Float
      minAnio: Int
      maxAnio: Int
    ): [Vehicle!]!

    vehicle(id: ID!): Vehicle
  }
`;

module.exports = { typeDefs };