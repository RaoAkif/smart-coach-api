import express, { Express } from 'express';
import swaggerJSDoc, { Options, SwaggerDefinition } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app: Express = express();

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Smart Coach API',
      version: '1.0.0',
      description: 'Complete Smart API Documentation',
    },
    servers: [
      {
        // url: 'http://localhost:8000', // DEVELOPMENT
        url: 'https://smart-coach-api.vercel.app', // PRODUCTION
      },
    ],
  },
  apis: [
    './src/routes/auth.ts',
    './src/routes/coaches.ts',
    './src/routes/players.ts',
    './src/routes/teams.ts',
    './src/routes/events.ts',
  ],
  noSourcemaps: true, // Disable source map generation
};

const swaggerSpec: SwaggerDefinition = swaggerJSDoc(options) as SwaggerDefinition;

// Serve the Swagger documentation using swagger-ui-express
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default swaggerSpec;
