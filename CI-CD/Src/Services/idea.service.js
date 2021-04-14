//Aqui van los serivicos disponibles para el modelo Idea, usa la capa Repositories

const BaseService = require('./base.service');
let _ideaRepository = null;

class IdeaService extends BaseService 
{
    constructor({ IdeaRepository }) {
        super(IdeaRepository);//le pasamos el IdeaRepository al constructo padre de la clase q estamos creando 
        _ideaRepository = IdeaRepository;
    }
    async GetUserIdeas(author) {
        if (!author) {
            const error = new Error();
            error.status = 400;
            error.message = "author must be sent";
            throw error;//este error lo cachara el middleware error.middleware.js
        }
        return await _ideaRepository.GetUserIdeas(author);
    }
    //###IMplementand metodos para los votos positivos y negativos de las ideas
    //metodo para votar positivamente
    async UpVoteIdea(ideaId) {
        if (!ideaId) {
            const error = new Error(); //Podemos crear un clase BadRequest que herede de la clase Error en Helpers para no repetir este mmismo codigo de error
            error.status = 400;
            error.message = "author must be sent";
            throw error;//este error lo cachara el middleware error.middleware.js
        }
        const idea = await _ideaRepository.Get(ideaId);
        if (!idea) { //validacion si no se encontró
            const error = new Error();
            error.status = 404;
            error.message = "idea does not exist";
            throw error;
        }
        idea.upvotes.push(true);//upvotes es de tipo array 
        return await _ideaRepository.Update(ideaId, { upvotes: idea.upvotes });//como _ideaRepository es mi modelo y este es de mongo usamos el metodo update de mongo
    }
    //metodo para votar negativamente
    async DownVoteIdea(ideaId) {
        if (!ideaId) {
            const error = new Error(); //Podemos crear un clase BadRequest que herede de la clase Error en Helpers para no repetir este mmismo codigo de error
            error.status = 400;
            error.message = "author must be sent";
            throw error;//este error lo cachara el middleware error.middleware.js
        }
        const idea = await _ideaRepository.Get(ideaId);
        if (!idea) { //validacion si no se encontró
            const error = new Error();
            error.status = 404;
            error.message = "idea does not exist";
            throw error;
        }
        idea.downvotes.push(true);//downvotes es de tipo array 
        return await _ideaRepository.Update(ideaId, { downvotes: idea.downvotes });//como _ideaRepository es mi modelo y este es de mongo usamos el metodo update de mongo
    }
}

module.exports = IdeaService;