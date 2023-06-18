const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Smart Coach API',
      version: '1.0.0',
      description: 'This API contains all the endpoints of Smart Coach CRUD.',
    },
    servers: [
      {
        // url: `http://localhost:${process.env.PORT || 5000}`,
        url: `https://smart-coach-api.vercel.app`,
      },
    ],
  },
  apis: ['./dist/routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = (app: any) => {
  const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, { customCssUrl: CSS_URL }));
};
