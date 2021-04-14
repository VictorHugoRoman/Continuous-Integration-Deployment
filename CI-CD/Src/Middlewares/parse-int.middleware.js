//Middleware para parsear los string de las quuerys de la api a numerico
//req, res, next  argumentos de express
module.exports = function (req, res, next) {
    //myapi.com?pageNumber=5 , el 5 nodeJs lo reconoce como string
    //expres convierte los valores de la query en objeto
    //{pageNumber = '5'}  este objeto retorno req.query
    const queryStrings = req.query;
    for(const key in queryStrings)
    {
        const length = queryStrings[key].length; //obtenemos el tamaño del valor de la propiedad
        const isValid = length >= 20 ? false : !isNaN(parseInt(queryStrings[key])); //validamos a 20 ya q nos topamos con valores de mongoose y estos valores son string con tamaño mayores de 20
        if (isValid) {
            queryStrings[key] = parseInt(queryStrings[key]); //le reasignamos el valor al mismo objeto ya como numerico
        }
    }
    req.query = queryStrings; //le asignamos al request el objeto parseado
    next();//en este caso llamamos a next ya q c encarga de darle acceso al prox middleware de la cola de express
}