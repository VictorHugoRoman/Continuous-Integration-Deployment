//exportamos un funcion de express, ya q este se encargara de pasar el valor de los parametros
module.exports = (req, res, next) => res.status(404).send({
    status: 404,
    message: "Resource not found"
});