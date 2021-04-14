//Archivo q funciona como el contenedor de inyeccion de dependencias en este caso usamos awilix

//#region Funcion de las variables 
//createContainer: funcion que crea un contenedor y lo retorna
//asValue: metodo para inyectar un objeto como un valor
//asClass: metodo para inyectar un objeto como un clase
//asFunction: metodo para inyectar un objeto como una funcion
//#endregion
const { createContainer, asClass, asValue, asFunction } = require("awilix");

//services
const { HomeService, UserService, IdeaService, CommentService, AuthService } = require("../Services");//por default node toma el index.js

//Variables para el inicio del servidor
//config
const config = require("../Config");
const app = require('.'); //es lo mismo q require('./index');, es el index.js de esta capa StartUp

//controller
const { HomeController, UserController, IdeaController, CommentController, AuthController } = require("../Controllers");//por default node toma el index.js

//routes
const { HomeRoutes, UserRoutes, IdeaRoutes, CommentRoutes, AuthRoutes } = require("../Routes/index.routes");
const Routes = require('../Routes');//no destructuramos porque simplemente exportamos una funcion, s l index.js de la carpeta Routes

//models
const { User, Idea, Comment } = require('../Models');//Desestructuración en Javascript.

//repositories
const { UserRepository, IdeaRepository, CommentRepository } = require('../Repositories');

//Este container lo consume el index.js(root) principal de la apliacion
const container = createContainer();


//register({}): le mandamos un objeto con los key app, router, config para la inyeccion del objeto como una clase en modo singleton para tener la misma instancia
container.register({//register para la configuracion principal de la aplicacion
    app: asClass(app).singleton(),
    router: asFunction(Routes).singleton(),
    config: asValue(config) //pasamos com un objeto
})      //register({}): le mandamos un objeto con el key HomeService, etc y la inyeccion del objeto como una clase en modo singleton para tener la misma instancia
    .register({//register para config todos los servicios
        HomeService: asClass(HomeService).singleton(), //inyectamos el objeto HomService como una clase al contenedor
        UserService: asClass(UserService).singleton(),
        IdeaService: asClass(IdeaService).singleton(),
        CommentService: asClass(CommentService).singleton(),
        AuthService: asClass(AuthService).singleton()
    })
    .register({//register para config todos los controllers
        HomeController: asClass(HomeController.bind(HomeController)).singleton(),
        /*HomeController.bind(HomeController), con bind le decimos a express q no cambie el scope(contexto) al de él
            cuando mande llamar a HomeController, es decir, se mantendra el contexto del controller Home.*/
        UserController: asClass(UserController.bind(UserController)).singleton(),
        IdeaController: asClass(IdeaController.bind(IdeaController)).singleton(),
        CommentController: asClass(CommentController.bind(CommentController)).singleton(),
        AuthController: asClass(AuthController.bind(AuthController)).singleton()
    })
    .register({//register para config todas las rutas
        HomeRoutes: asFunction(HomeRoutes).singleton(), //registramos como funcion ya q eso declaramos en el module.export de home.routes.js
        UserRoutes: asFunction(UserRoutes).singleton(),
        IdeaRoutes: asFunction(IdeaRoutes).singleton(),
        CommentRoutes: asFunction(CommentRoutes).singleton(),
        AuthRoutes: asFunction(AuthRoutes).singleton()
    }).register({
        User: asValue(User), //usamos asValue para pasarle un valor como tal en este caso de tipo model.User y asi con los demas
        Idea: asValue(Idea),
        Comment: asValue(Comment)
    }).register({
        UserRepository: asClass(UserRepository).singleton(),
        IdeaRepository: asClass(IdeaRepository).singleton(),
        CommentRepository: asClass(CommentRepository).singleton()
    })
    ;
//Se puede meter todo en un metodo register para efectos de segmentacion se me hace mas comodo

module.exports = container;