//Es el servicio del cual las demas clases heredarán para tener un CRUD disponible

class BaseService {
    constructor(repository) {//los repository creados anteriormente idea, user, comment
        this.repository = repository;
    }
    async Get(id) {
        if (!id) {
            const error = new Error();
            error.status = 400;
            error.message = "id must be sent";
            throw error; //este error lo cachara el middleware error.middleware.js
        }
        const currentEntity = await this.repository.Get(id);//buscamos  la entidad
        if (!currentEntity) {
            const error = new Error();
            error.status = 404;
            error.message = "entity does not found";
            throw error; //este error lo cachara el middleware error.middleware.js
        }
        return currentEntity;
    }
    async GetAll(pageSize, pageNum) {
        return await this.repository.GetAll(pageSize, pageNum);
    }
    async Create(entity) {
        return await this.repository.Create(entity);
    }
    async Update(id, entity) {
        if (!id) {
            const error = new Error();
            error.status = 400;
            error.message = "id must be sent";
            throw error; //este error lo cachara el middleware error.middleware.js
        }
        //como el metodo update del baseRepository si lo encuentra lo actualiza si no arroja un mensaje y no un error por lo tanto se lo dejamos al metodo q lance el error
        return await this.repository.Update(id, entity);
    }
    async Delete(id) {
        if (!id) {
            const error = new Error();
            error.status = 400;
            error.message = "id must be sent";
            throw error; //este error lo cachara el middleware error.middleware.js
        }
        return await this.repository.Delete(id);
    }
}
module.exports = BaseService;