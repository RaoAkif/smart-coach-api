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
        url: 'https://smart-coach-api.vercel.app', // Replace with your server URL
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Replace with your route files
};

const swaggerSpec: SwaggerDefinition = swaggerJSDoc(options) as SwaggerDefinition;

export default swaggerSpec;
