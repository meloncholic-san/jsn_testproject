import express from 'express';
import routes from './routes/routes.js';
import cors from 'cors'
import { getEnvVar } from './utils/getEnvVar.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import http from 'http';


export async function setupServer() {
  const app = express();
  const PORT = getEnvVar("PORT", 3000);
  const server = http.createServer(app);


  app.use(cors({
    origin: ['http://localhost:5173', 'https://jsn-testproject.vercel.app'],
    credentials: true
  }));


  app.use('/api', routes);

  app.use('', notFoundHandler);
  app.use(errorHandler);



  server.listen(PORT, () => {
    console.log(`✅ Server started on port ${PORT}`);
  });

  
  return { app, server };
}
