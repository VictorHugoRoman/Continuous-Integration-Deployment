let _homeService = null;

//solo declaramos una clase, con awilix inyectarmos lo q n esta clase ocuparemos
class HomeController {
    //awilix le inyecta valor a HomeService en el momento n q nosotros ocupemos HomeController, ver Startup > container.js
    constructor({ HomeService }) {
        _homeService = HomeService; //asignamos la clase HomeService sin this._homeservice a la variable  para q exista solo en el modulo home.controller y no en la clase
    }

    //express se encarga de pasarle valor a req y res.
    Index(req, res) {
        return res.send(_homeService.index()); //index() pertenece a la clase HomeService de home.service.js
    }
}

module.exports = HomeController;