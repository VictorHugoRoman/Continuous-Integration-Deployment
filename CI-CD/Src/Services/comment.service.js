//Aqui van los serivicos disponibles para el modelo Comment, usa la capa Repositories

const BaseService = require('./base.service');
let _commentRepository = null, _ideaRepository = null;

class CommentService extends BaseService {
    constructor({ CommentRepository, IdeaRepository }) {
        super(CommentRepository);//le pasamos el CommentRepository al constructor padre de la clase q estamos creando 
        _commentRepository = CommentRepository;
        _ideaRepository = IdeaRepository;
    }
    //Obtiene comentarios por idea
    async GetIdeaComments(ideaId) {
        if (!ideaId) {
            const error = new Error(); //Podemos crear un clase BadRequest que herede de la clase Error en Helpers para no repetir este mmismo codigo de error
            error.status = 400;
            error.message = "author must be sent";
            throw error;//este error lo cachara el middleware error.middleware.js
        }
        const idea = await _ideaRepository.Get(ideaId);//_ideaRepository es mongo entonces usamos el metodo get de mongo
        if (!idea) { //validacion si no se encontró
            const error = new Error();
            error.status = 404;
            error.message = "idea does not exist";
            throw error;
        }
        const { comments } = idea;//destructuramos los commentarios de la idea(modelo), commments es una propiedad
        return comments;
    }
    //Crea comentarios por idea
    async CreateComment(comment, ideaId, userId) {
        if (!ideaId) {
            const error = new Error(); //Podemos crear un clase BadRequest que herede de la clase Error en Helpers para no repetir este mmismo codigo de error
            error.status = 400;
            error.message = "author must be sent";
            throw error;//este error lo cachara el middleware error.middleware.js
        }
        const idea = await _ideaRepository.Get(ideaId);//_ideaRepository es mongo entonces usamos el metodo get de mongo
        if (!idea) { //validacion si no se encontró
            const error = new Error();
            error.status = 404;
            error.message = "idea does not exist";
            throw error;
        }
        //""...comment" operador rest, liga las propiedaas al objeto q estamos creando, en este caso creamos uno al momento de mandarlo como parametro
        const createdComment = await _commentRepository.Create({...comment, author: userId});//_commentRepository extiende de mongo entonces usamos el metodo crear el modelo de tipo comments
        idea.comments.push(createdComment);
        return await _ideaRepository.Update(ideaId, { comments: idea.comments });//_ideaRepository extiende de mongo entonces usamos el metodos update para acutalizar el comments en la idea
    }
}
module.exports = CommentService;