const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { typeDefs, resolvers } = require('./schemas');  // Make sure you have the correct schema setup
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');  // If you are using auth

const app = express();
const PORT = process.env.PORT || 3001;

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => authMiddleware({ req }),
});


// Start the Apollo Server and apply middleware to Express
async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
}

startServer();

// Middleware for parsing incoming requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

// Start the server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on http://localhost:${PORT}`);
    console.log(`🚀 GraphQL available at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
