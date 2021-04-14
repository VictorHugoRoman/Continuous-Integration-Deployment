//Aqui van las rutas que estaran disponible para el modelo Comment,  usa la capa Controllers

const { Router } = require("express"); //Usamos el Router de express
const {AuthMiddleware} = require('../Middlewares')

//#region 
//function(){} es como el constructor en una clase, ya q las clases en javascritp son funciones
//Es como si crearamos una clase anonima con un constructor de por medio
//#endregion
//le pasamos al constuctor nuestro CommentController q configuramos con awilix por lo tanto awilix s l encargado de pasarle el valor
module.exports = function ({ CommentController }) {
    const router = Router();

    //#region 
    //get() corresponde a una peticion http de tipo get
    //Param 1: ruta URI q recibe un parametros. Param 2: controlador o metodo del controlador q resolverá la ruta pasada en el param 1
    //#endregion
    router.get("/:commentId/unique", CommentController.Get);//CommentController.get es la funcion q express ejecutara por ello la pasamos de esa manera y no CommentController.get() porque asi se ejecutaria la funcion
    //#region 
    //Normalmente cuando express ejecuta el get o cualquier otra funcion del Router le pasa su scope a la funcion
    //pero como a nuestro controller home le hicimos un bind en nuestro container.js el scope o contexto seguirá 
    //perteneciendo al controller en este caso CommentController y asi podremos acceder a sus servicios o metodos.
    //#endregion
    router.get("/:ideaId", CommentController.GetIdeaComments);    
    router.post("/:ideaId", AuthMiddleware, CommentController.CreateComment);
    router.patch("/:commentId", AuthMiddleware, CommentController.Update);
    router.delete("/:commentId", AuthMiddleware, CommentController.Delete);    
    return router;
}