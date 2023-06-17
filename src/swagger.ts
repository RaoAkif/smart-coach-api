import swaggerJSDoc, { Options } from 'swagger-jsdoc';
import * as path from 'path';

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
  apis: [path.resolve(__dirname, './routes/*.js')], // Update the file path pattern
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
