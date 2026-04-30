//Archivo principal para iniciar el servidor GraphQL y conectar a MongoDB
require('dotenv').config();

const mongoose = require('mongoose');
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

require('./models/user');
require('./models/vehicle');

const { typeDefs } = require('./graphql/typeDefs');
const { resolvers } = require('./graphql/resolvers');
const { authenticateGraphQLRequest } = require('./middlewares/auth');

const PORT = parseInt(process.env.PORT || '4000', 10);
const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ticoautos';

//Bootstrap para iniciar el servidor GraphQL y conectar a MongoDB, manejando errores de conexión y autenticación de solicitudes GraphQL utilizando JWT.
async function bootstrap() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('GraphQL conectado a MongoDB');

    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    const { url } = await startStandaloneServer(server, {
      listen: { port: PORT },
      context: async ({ req }) => {
        const user = authenticateGraphQLRequest(req);
        return { user };
      },
    });

    console.log(`GraphQL server listo en ${url}`);
  } catch (error) {
    console.error('Error levantando servicio GraphQL:', error.message);
    process.exit(1);
  }
}

bootstrap();