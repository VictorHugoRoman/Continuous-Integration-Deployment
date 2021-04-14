//Aqui van las rutas que estaran disponible para la autenticacion usa la capa Controllers

const { Router } = require("express"); //Usamos el Router de express

//#region 
//function(){} es como el constructor en una clase, ya q las clases en javascritp son funciones
//Es como si crearamos una clase anonima con un constructor de por medio
//#endregion
//le pasamos al constuctor nuestro AuthController q configuramos con awilix por lo tanto awilix s l encargado de pasarle el valor
module.exports = function ({ AuthController }) {
    const router = Router();

    //#region 
    //post() corresponde a una peticion http de tipo post
    //Param 1: ruta URI. Param 2: controlador o metodo del controlador q resolverá express s la ruta pasada en el param 1
    //#endregion
    router.post("/signup", AuthController.SignUp);//AuthController.SignUp es la funcion q express ejecutara por ello la pasamos de esa manera y no AuthController.SignUp() porque asi se ejecutaria la funcion
    //#region 
    //Normalmente cuando express ejecuta el post o cualquier otra funcion del Router le pasa su scope a la funcion
    //pero como a nuestro controller AuthController le hicimos un bind en nuestro container.js el scope o contexto seguirá 
    //perteneciendo al controller en este caso AuthController y asi podremos acceder a sus servicios o metodos.
    //#endregion

    router.post("/signin", AuthController.SignIn);

    return router;
}