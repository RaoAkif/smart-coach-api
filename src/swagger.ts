import express, { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc, { Options, SwaggerDefinition } from 'swagger-jsdoc';

const app: Express = express();

/// Swagger documentation
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
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec: SwaggerDefinition = swaggerJSDoc(options) as SwaggerDefinition;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


export default swaggerSpec;
