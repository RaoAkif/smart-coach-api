import swaggerJSDoc, { Options, SwaggerDefinition } from 'swagger-jsdoc';

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
  apis: ['./src/routes/*.ts'], // Replace with the actual path to your route files
};

const swaggerSpec: SwaggerDefinition = swaggerJSDoc(options) as SwaggerDefinition;

export default swaggerSpec;
