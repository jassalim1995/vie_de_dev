const express = require('express');
const mongoose = require ('mongoose');
const mainRoute = require ('./routes/main');

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app= express() ;
app.use(express.json());

require ('dotenv').config();

const mongoString = process.env.DATABASE_URL 
mongoose.connect(mongoString);
const database =  mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "Node js Express API with Swagger",
        version: "0.1.0",
        description:
          "This is a simple CRUD API application made with Express and documented with Swagger",
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
    },
    apis: ["./routes/*.js"],
  };
  
  const specs = swaggerJsdoc(options);
  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
  );

// delaring routes 
app.use('/api', mainRoute);
//app.use('/Post', postRoute);
//app.use('/Comment', commentRoute);
//app.use('/User', userRoute);

app.listen(3000, ()=>{
    console.log(`serveur  started at  ${3000}`)
});
