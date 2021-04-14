//Aqui van los controllers disponibles para el modelo User,  usa la capa Services. Hasta este punto en el proceso de peticion los middlewares ya han sido ejecutados
let _userService = null;
class UserController {
    constructor({ UserService }) {//por inyeccion de dependencia recibimos UserService de la capa servicios
        _userService = UserService;
    }
    async Get(req, res) {//los objetos req, res los pasara express al momento de hacer la peticion
        const { userId } = req.params; //params: myappi.com/user/2343 son los parametros de una ruta ej. 2343
        const user = await _userService.Get(userId);
        return res.send(user);
    }
    async GetAll(req, res) {
        const { pageSize, pageNum } = req.query; //obtenemos los valores ya  tipo number, recordar q hasta aqui  los middlewares se han ejecutado y por lo tanto el que hace el parseo tambien 
        const users = await _userService.GetAll(pageSize, pageNum); //se lo mandamos al metodo getAll del base.repository
        return res.send(users);//res: response y con send dovolvemos los usuario, son metodos de express
    }
    //usaremos un sign Up en vez de este metodo para crear un usuario
    async Create(req, res) {
        //gracias a q configuramos un middleware podemos obtener el body del objeto req, 
        //q s un json de la propiedad body q la cual enviamos en el request de tipo post en el objeto req
        const { body } = req;
    }
    async Update(req, res) {
        //gracias a q configuramos un middleware podemos obtener el body del objeto req, 
        //q s un json de la propiedad body q la cual enviamos en el request de tipo post en el objeto req
        const { body } = req;
        const { userId } = req.params;
        const updateUser = await _userService.Update(userId, body);
        return res.send(updateUser);//res: response y con send dovolvemos los usuario, son metodos de express
    }
    async Delete(req, res) {
        const { userId } = req.params;
        const deleteUser = await _userService.Delete(userId);
        return res.send(deleteUser);
    }
}
module.exports = UserController;