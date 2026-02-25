const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path")

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "KGL REST API Documentation",
      version: "1.0.0",
      description: "This is the documentation for the KGL REST API for the frontend app"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ],
    components: {
        securitySchemes: {
        bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
    }
  },
     components: {
      schemas: {
        users: {
          type: "object",
          required: ["username"],
          properties: {
            username: { type: "string" },
            
            role: {
              type: "string",
              enum: ["Manager", "Sales agent", "Director"]
            }
          }
        }
      }
    }
  
}
  },
  apis: [path.join(__dirname, "./routers/*.js")]  //  This reads documentation from routes
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;