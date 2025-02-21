import express from 'express';
import { Request, Response } from 'express';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
//import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import connectDB from './config/connection.js'; 
import { typeDefs, resolvers } from './schemas/index.js';
import { authenticateToken } from './services/auth.js';

// ✅ Manually Define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();

// ✅ Connect to MongoDB (Fixed)
await connectDB();

// ✅ Initialize Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

  //app.use(cors());
  app.use(bodyParser.json());
  app.use(express.urlencoded({ extended: false }));

  // ✅ Apply Apollo GraphQL Middleware with Authentication
  app.use('/graphql', expressMiddleware(server, {
    context: async ({ req }) => {
      authenticateToken(req); 
      return { user: req.user };
    },
  }));

  // ✅ Serve Static Assets in Production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (_: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  // ✅ Start Server
  app.listen(PORT, () => {
    console.log(`🌍 Server running on http://localhost:${PORT}`);
    console.log(`🚀 GraphQL ready at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();