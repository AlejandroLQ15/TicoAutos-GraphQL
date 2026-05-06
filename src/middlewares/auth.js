//Constante para manejar la autenticación de solicitudes GraphQL utilizando JWT
const jwt = require('jsonwebtoken');
const { GraphQLError } = require('graphql');

function getJwtSecret() {
  return (process.env.JWT_SECRET || process.env.SECRET_KEY || 'ticoautos_secret_key_2026').trim();
}

//Autentica la solicitud GraphQL verificando el token JWT en el encabezado de autorización
function authenticateGraphQLRequest(req) {
  const authHeader = req?.headers?.authorization || req?.headers?.Authorization;

  if (!authHeader || !String(authHeader).startsWith('Bearer ')) {
    throw new GraphQLError('Access denied. No token provided.', {
      extensions: { code: 'UNAUTHENTICATED' },
    });
  }

  const token = String(authHeader).split(' ')[1];

  //Verifica el token JWT y devuelve la información del usuario decodificada
  try {
    const decoded = jwt.verify(token, getJwtSecret());
    return { id: decoded.id, username: decoded.username || null };
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new GraphQLError('Tu sesión expiró. Iniciá sesión de nuevo.', {
        extensions: { code: 'TOKEN_EXPIRED' },
      });
    }

    throw new GraphQLError('Sesión inválida. Iniciá sesión de nuevo.', {
      extensions: { code: 'UNAUTHENTICATED' },
    });
  }
}

module.exports = { authenticateGraphQLRequest };