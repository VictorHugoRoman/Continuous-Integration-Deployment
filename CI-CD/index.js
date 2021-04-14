//Archivo root principal para el arranque de la api

//Obtenemos todas las dependencias, lo q esta en el archivo container
const container = require('./Src/Startup/container');
//obtenermos la BD  a traves del container q configuramos en container.js
const server = container.resolve("app");  //app hace referencia al register q hicimos en el container.js, contiene la clase Server del index de la capa StartUp
//obtenermos la BD  a traves del container q configuramos en container.js
const { MONGO_URI } = container.resolve("config");

const mongoose = require('mongoose');
mongoose.set("useCreateIndex", true);
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
    .then(() => server.Start())//si promesa coneccion mongo se cumplió
    .catch(console.log); //si promesa coneccion mongo falla, le dejamos la responsabilidad al catch de ejecutar el console.log