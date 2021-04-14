//Aqui van los controllers disponibles para la autenticacion, usa la capa Services
let _authService = null;
class AuthController {
    //AuthService obtenemos el valor por iyenccion de dependencias
    constructor({ AuthService }) {
        _authService = AuthService;
    }
    //req, res objetos de express
    async SignUp(req, res) {
        const { body } = req; //destructuramos el body de la peticion, es el objeto q mandamos como parametro n ste caso de tipo usuario
        const createdUser = await _authService.SignUp(body);
        return res.status(201).send(createdUser);
    }
    //req, res objetos de express
    async SignIn(req, res) {
        const { body } = req; //destructuramos el body de la peticion, es el objeto q mandamos como parametro n ste caso de tipo usuario
        const creds = await _authService.SignIn(body);
        return res.send(creds); //por defualt el metodo send retorno el status 200
    }
}
module.exports = AuthController;