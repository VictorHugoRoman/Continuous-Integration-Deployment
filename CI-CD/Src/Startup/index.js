//****Es el archivo principal para l inicio de la aplicacion****

const express = require('express');

//variables privadas, solo para este scoupe
let _express = null;
let _config = null;

class Server {
    //mediante awilix(inyeccion de dependencias) obtenemos los valores de config y router q hemos configurado., 
    //y con el constructor obtendremos los valores cada vez q c cree esta clase
    constructor({ config, router }) {
        _config = config;
        _express = express().use(router);
    }

    //Metodo para iniciar nuestro server
    Start() {
        return new Promise(resolve => {
            _express.listen(_config.PORT, () => {
                console.log(_config.APPLICATION_NAME + "API running on port: " + _config.PORT);
                resolve(); //para q termine la promesa
            });
        });
    }
}

module.exports = Server;