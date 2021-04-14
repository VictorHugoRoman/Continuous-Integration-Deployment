//Aqui van las rutas que estaran disponible para el modelo User, usa la capa Controllers

const { Router } = require("express"); //Usamos el Router de express
const { AuthMiddleware, ParseIntMiddleware, CacheMiddleware } = require('../Middlewares');
//#region 
//function(){} es como el constructor en una clase, ya q las clases en javascritp son funciones
//Es como si crearamos una clase anonima con un constructor de por medio
//#endregion

const {CACHE_TIME} = require('../Helpers');
//le pasamos al constuctor nuestro UserController q configuramos con awilix por lo tanto awilix s l encargado de pasarle el valor
module.exports = function ({ UserController }) {
    const router = Router();

    //#region 
    //get() corresponde a una peticion http de tipo get
    //Param 1: ruta URI q recibe un parametros. Param 2: controlador o metodo del controlador q resolverá la ruta pasada en el param 1
    //#endregion
    router.get("/:userId", UserController.Get);//UserController.get es la funcion q express ejecutara por ello la pasamos de esa manera y no UserController.get() porque asi se ejecutaria la funcion
    //#region 
    //Normalmente cuando express ejecuta el get o cualquier otra funcion del Router le pasa su scope a la funcion
    //pero como a nuestro controller home le hicimos un bind en nuestro container.js el scope o contexto seguirá 
    //perteneciendo al controller en este caso UserController y asi podremos acceder a sus servicios o metodos.
    //#endregion
    router.get("", [ParseIntMiddleware, CacheMiddleware(CACHE_TIME.ONE_HOUR)], UserController.GetAll); //si es un middleware podemos quitar los brackets.
    router.patch("/:userId", AuthMiddleware, UserController.Update);
    router.delete("/:userId", AuthMiddleware, UserController.Delete);
    return router;
}