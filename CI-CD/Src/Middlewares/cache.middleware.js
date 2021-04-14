const mcache = require('memory-cache');
const { CACHE_KEY } = require('../Config');

//exportamos una funcion que recibira un parametro para la duracion de la cache y dentro de esta hacemos un truquillo creando una arrow function
//pasandole los argumentos req, res, next de express 
module.exports = function (duration) {
    //como es un middleware q ocupa la peticion y respuesta y el paso de middlewares llamamos req, res, next de express
    return (req, res, next) => { //express se encarga de pasarle valor a estos parametros
        //originUrl propieddad de express del objeto request nos da la url original q fue solicitada
        //url propiedad de express del objeto request
        //creamos un identificador unico con nuestro key cache y la url solicitada
        const key = CACHE_KEY + req.originUrl || req.url; //si no existe una originUrl le pasamos la url 
        //get nos arroja si hay algo cachado con ese key nos lo va a retornar
        const cachedBody = mcache.get(key);
        //si existe una cache con el "key" retornamos la informacion cacheada
        if (cachedBody) {
            return res.send(JSON.parse(cachedBody));
        }
        else { //si no existe la cache, la cacheamos
            //creamos una arrow function q ejecutara el metodo original send q le asignamos a la nueva propiedad sendResponse y guardará la info recibida
            //en el parametro body 
            res.sendResponse = res.send; //no ejecutamos el send, simplemente le pasamos el send a la nueva propiedad sendResponse todo esto s de express
            //sobreescribimos el metodo send del response con la sig funcion
            res.send = body => { //funcion  flecha q  recibirá un body
                mcache.put(key, body, duration * 1000); //guardamos el body(info) en la cache
                res.sendResponse(body); //ejecutamos el send original del objeto res(response) asignado anteriormente
            };
        }  
        next();
    };
};