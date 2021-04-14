//exportamos una funcion de express, ya q este se encargara de pasar el valor de los parametros
module.exports = (err, req, res, next) => {
    const httpStatus = err.status || 500; //si el error trae un status lo elegimos de lo contrario pasamos el clasico server error 500
    return res.status(httpStatus).send({
        status: httpStatus,
        message: err.message || "Internal server error" //si el parametro err trae un mensaje lo elegimos de lo contrario pasamos nuestro mensaje
    });
};