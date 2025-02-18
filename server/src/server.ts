import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import connectDB from './config/connection.js'; 
import { typeDefs, resolvers } from './schemas/index.js';
import { authenticateToken } from './services/auth.js';

// ✅ Define __dirname properly
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Load environment variables
dotenv.config();

// ✅ Ensure we use Render's dynamic port
const PORT = process.env.PORT || 3001;
const app = express();

const startApolloServer = async () => {
  // ✅ Connect to MongoDB inside this function
  await connectDB();

  // ✅ Initialize Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();

  // ✅ Apply Middleware
  app.use(cors({
    origin: process.env.FRONTEND_URL || "https://module-18-challenge.onrender.com",
    methods: "GET,POST,OPTIONS",
    credentials: true
  }));

  app.use(bodyParser.json());
  app.use(express.urlencoded({ extended: false }));

  // ✅ Apply GraphQL Middleware
  app.use('/graphql', expressMiddleware(server, {
    context: async ({ req }) => {
      authenticateToken(req);
      return { user: req.user };
    },
  }));

  // ✅ Serve Frontend in Production
  if (process.env.NODE_ENV === 'production') {
    console.log("🚀 Serving frontend in production...");
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  } else {
    console.log("🚧 Development mode: React frontend not served by backend.");
  }

  // ✅ Start Server and Ensure the Correct Port
  app.listen(PORT, () => {
    console.log(`🌍 Server running on port ${PORT}`);
    console.log(`🚀 GraphQL ready at http://localhost:${PORT}/graphql`);
  });
};

// ✅ Start the Server
startApolloServer();
