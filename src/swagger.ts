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
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Smart Coach",
        url: "https://smart-coach.netlify.app/",
        email: "info@smart-coach.com",
      },
    },
    servers: [
      {
        // url: 'http://localhost:8000', // DEVELOPMENT
        url: 'https://smart-coach-api.vercel.app', // PRODUCTION
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
  noSourcemaps: true, // Disable source map generation
};

// Serve the Swagger documentation using swagger-ui-express
const swaggerOptions = {
  customCssUrl: "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css",
};

const swaggerSpec: SwaggerDefinition = swaggerJSDoc(options) as SwaggerDefinition;

// Serve the Swagger documentation using swagger-ui-express
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerOptions));

export default swaggerSpec;
