const express = require("express"),
      server = express(),
      PORT = 3000,
      bodyParser = require('body-parser'),
      rateLimit = require('express-rate-limit'),
      api = require('./api'),
      dbScheme = require('./loaders/dbScheme'),
      userAuth = require('./loaders/userAuth');


startServer();

async function startServer(){

    server.use(bodyParser.json({limit:'25mb'}))
    server.use(bodyParser.urlencoded({extended:true}))
    server.use(rateLimit({
        windowMs:5 * 60 * 1000,
        max:356
    }))

    await dbScheme(server);
    await server.use(userAuth)
    await server.use(api);


    server.listen(PORT,()=>{
    console.log(`Server listening to ${PORT}`)
    })
}