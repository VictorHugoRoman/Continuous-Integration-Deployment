const { model } = require("mongoose");

class HomeService {
    index() {
        return {
            message: "Hello Mundo!"
        };
    }
}

module.exports = HomeService; //hacemos uso de awilix para exportar la clase como objeto, tradicionalmente se exporta "new HomeService()"