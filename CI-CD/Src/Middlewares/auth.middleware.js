//Este middleware se configura en las rutas q queramos proteger

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../Config');//llamaos el secrete key para poder desencriptar el token

//next le da continuacion al proximo middlware d la cadena de middlwares de express
module.exports = function (req, res, next) {
    const token = req.headers["authorization"]; //buscamos el token en el request con bracket notation
    if (!token) {
        const error = new Error();
        error.message = "Token must be sent";
        error.status = 400;
        throw error;
    }
    //function (error, decodeToken) es un callaback q le pasa valor a los argumentos error y decodeToken
    jwt.verify(token, JWT_SECRET, function (error, decodeToken) {
        if (error) {
            error.message = "Invalid Token";
            error.status = 401;
            throw error;
        }
        //Le pasamos el token decodificado q s un usario y se lo pasamos al request de express creando la propiedad user con dot natation, con eso ya sabremos q usuario esta autenticado
        //aqui pudieramos validar roles o permisos para validar si el usuario pueda acceder a ciertos recursos
        req.user = decodeToken.user;
        next(); //pasamos a la siguiente cadena de middlewares de express
    });
}