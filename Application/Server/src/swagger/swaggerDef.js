import { config } from '../config/index.js';

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'What to cook - API Documentation',
    version: '1.0.0',
    license: {
      name: 'MIT',
      url: 'https://github.com/hagopj13/node-express-boilerplate/blob/master/LICENSE',
    },
  },
  servers: [
    {
      url: config.baseUrl,
    },
  ],
};

export default swaggerDef;
