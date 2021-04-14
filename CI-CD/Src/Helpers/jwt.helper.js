//Agregamos una propiedad al objeto exports de node y esta contendra la funcion, 
//pero esta funcion necesitará la ayuda de nuestro paquete JsonWebToken.

const { sign } = require("jsonwebtoken"); //extraemos el metodo sign, q sirve para firmar los tokens.
const { JWT_SECRET } = require('../Config'); //extraemos el secret key de nuestro token

//Ahora creamos y exportamos la funcion de este helper(jwt.helper.js).
//Vamos a crearle una propiedad al objeto exports del module de node, ya que, en javascript es permitido crear propiedades en los objetos
//con dot notation o bracket notation, en este caso dot notation.
module.exports.generateToken = function (user) {
    //user lo pasamos en forma de objeto, es lo q va a encriptar
    //JWT_SECRET, es la palabra secreta(secret key) de nuestro token
    //{expiresIn}, es el tiempo de expiracion de nuestro token. en este caso 4h (horas)
    return sign({ user }, JWT_SECRET, { expiresIn: "4h" });
    //sign lo q hace es retornar un token con jwt_secret dependiendo lo grande q sea el usuario, es decir si el user tiene un nombre el token sera muy pequeño.
};

//Recordar q nuestro backend es un RestFul y uno de los principios de esta es q trabaja sin estados (stateless)
//por ello a travez de tokens nuestro backend puede identificar quien es quien está haciendo dicho request y sobre todo
//sbaer si tiene permiso para acceder a un recurso o no.