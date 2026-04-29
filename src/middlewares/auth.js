const jwt = require('jsonwebtoken');
const { GraphQLError } = require('graphql');

function getJwtSecret() {
  return (process.env.JWT_SECRET || process.env.SECRET_KEY || 'ticoautos_secret_key_2026').trim();
}

function authenticateGraphQLRequest(req) {
  const authHeader = req?.headers?.authorization || req?.headers?.Authorization;

  if (!authHeader || !String(authHeader).startsWith('Bearer ')) {
    throw new GraphQLError('Access denied. No token provided.', {
      extensions: { code: 'UNAUTHENTICATED' },
    });
  }

  const token = String(authHeader).split(' ')[1];

  try {
    const decoded = jwt.verify(token, getJwtSecret());
    return { id: decoded.id, username: decoded.username || null };
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new GraphQLError('Token expired.', {
        extensions: { code: 'UNAUTHENTICATED' },
      });
    }

    throw new GraphQLError('Invalid token.', {
      extensions: { code: 'UNAUTHENTICATED' },
    });
  }
}

module.exports = { authenticateGraphQLRequest };
