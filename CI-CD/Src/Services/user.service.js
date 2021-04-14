//Aqui van los serivicos disponibles para el modelo User, usa la capa Repositories

const BaseService = require('./base.service');
let _userRepository = null;

class UserService extends BaseService {
    constructor({ UserRepository }) {
        super(UserRepository);//le pasamos el UserRepository al constructo padre de la clase q estamos creando 
        _userRepository = UserRepository;
    }
    async GetUserByUserName(userName) {
        return await _userRepository.GetUserByUserName(userName);
    }
}
module.exports = UserService;