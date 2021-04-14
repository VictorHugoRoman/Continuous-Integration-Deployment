//Aqui van los serivicos disponibles para autenticarnos, usa la capa Repositories
//Metodos para autenticarnos.
const { generateToken } = require('../Helpers/jwt.helper');//llamamos directamente al helper q creamos.
let _userService = null;   //variable para importar nuestro repositorio de usuario

class AuthService {
    //UserService c recibe por inyeccion de dependencias q ya lo tenemos configurado en awilix, d b ser el user.service.js
    constructor({ UserService }) {
        _userService = UserService;
    }

    async SignUp(user) {
        const { username } = user;
        const userExist = await _userService.GetUserByUserName(username);
        if (userExist) {
            const error = new Error();
            error.status = 400;
            error.message = "user already exists";
        }
        return await _userService.Create(user);
    }
    async SignIn(user) {
        const { username, password } = user;
        const userExist = await _userService.GetUserByUserName(username);
        if (!userExist) {
            const error = new Error();
            error.status = 404;
            error.message = "user does not exists";
            throw error;
        }
        const validPassword = userExist.ComparePasswords(password); //como userExist es modelo de mongoose y a este modelo le implementamos el metodo ComparePasswords lo podemos usar aqui
        if (!validPassword) {
            const error = new Error();
            error.status = 400; //podemos checar los status code en internet, este 400 es un bad reuqest
            error.message = "Invalida Passwords";
            throw error;
        }
        //objeto para encriptar en nuestro token
        const userToEncode = {
            username: userExist.username,
            id: userExist._id //_id ya q mongo asi lo maneja
        };
        //generar el token con nuestro helper
        const token = generateToken(userToEncode);
        //Retornamos un objeto con el token y el objeto usuario
        return { token, user: userExist };
    }
}
module.exports = AuthService;