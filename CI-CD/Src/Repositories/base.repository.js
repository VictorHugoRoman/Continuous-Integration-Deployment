//este archivo sera una base o plantila para un CRUD cuya responsabilidad sera heredada para otros repositorios
//no colocamos esta clase en el index.js de esta carpeta para q no pueda ser visto en las otras capas
class BaseRepository {
    constructor(model) {
        this.model = model;//model sera un modelo de los q creamos pero tendra el contexto de mongoose en tiempo de ejecucuion
    }
    async Get(id) {
        return await this.model.findById(id); //findById metodo de mongoose 
    }
    //pageSize=5, argumento mongoose nos sirve para ver el numero de elementos en una coleccion
    //pageNum=1, argumento mongoose nos sirve para que pagina ver    
    async GetAll(pageSize = 5, pageNum = 1) {
        //skip(), nos dice cuantos elementos db saltar para comenzar a buscar
        //limit(), limita la cantidad de elementos q d b retornar
        const skips = pageSize * (pageNum - 1); //obtenemos la cantidad de paginas a saltar
        return await this.model.find().skip(skips).limit(pageSize);
    }
    async Create(entity) {
        return await this.model.create(entity);
    }
    async Update(id, entity) {
        return await this.model.findByIdAndUpdate(id, entity, { new: true });//con new = true le decimos a mongo q nos retorne la entidad q a sido actualizada con los cambios
    }
    async Delete(id) {
        await this.model.findByIdAndDelete(id);
        return true;
    }
}

module.exports = BaseRepository;