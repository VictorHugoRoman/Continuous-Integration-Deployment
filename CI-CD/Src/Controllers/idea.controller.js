//Aqui van los controllers disponibles para el modelo Idea,  usa la capa Services

let _ideaService = null;
class IdeaController {
    constructor({ IdeaService }) {//por inyeccion de dependencia recibimos IdeaService de la capa servicios
        _ideaService = IdeaService;
    }
    async Get(req, res) {//los objetos req, res los pasara express al momento de hacer la peticion
        const { ideaId } = req.params; //params: myappi.com/Idea/2343 son los parametros de una ruta ej. 2343
        const idea = await _ideaService.Get(ideaId);
        return res.send(idea);
    }
    async GetAll(req, res) {
        const { pageSize, pageNum } = req.query; //obtenemos los valores ya  tipo number, recordar q hasta aqui  los middlewares se han ejecutado y por lo tanto el que hace el parseo tambien 
        const ideas = await _ideaService.GetAll(pageSize, pageNum); //se lo mandamos al metodo getAll del base.repository
        return res.send(ideas);//res: response y con send dovolvemos los usuario, son metodos de express
    }
    async Create(req, res) {
        //gracias a q configuramos un middleware podemos obtener el body del objeto req, 
        //q s un json de la propiedad body q la cual enviamos en el request de tipo post en el objeto req
        const { body } = req;
        const createdIdea = await _ideaService.Create(body);
        return res.status(201).send(createdIdea); //recordar que req y res son objetos de express
    }
    async Update(req, res) {
        //gracias a q configuramos un middleware podemos obtener el body del objeto req, 
        //q s un json de la propiedad body q la cual enviamos en el request de tipo post en el objeto req
        const { body } = req;
        const { ideaId } = req.params;
        const updateIdea = await _ideaService.Update(ideaId, body);
        return res.send(updateIdea);//res: response y con send dovolvemos los usuario, son metodos de express
    }
    async Delete(req, res) {
        const { ideaId } = req.params;
        const deleteIdea = await _ideaService.Delete(ideaId);
        return res.send(deleteIdea);
    }
    async GetUserIdeas(req, res) {
        const { userId } = req.params;
        const ideas = await _ideaService.GetUserIdeas(userId);
        return res.send(ideas);
    }
    async UpVoteIdea(req, res) {
        const { ideaId } = req.params;
        const idea = await _ideaService.UpVoteIdea(ideaId);
        return res.send(idea);
    }
    async DownVoteIdea(req, res) {
        const { ideaId } = req.params;
        const idea = await _ideaService.DownVoteIdea(ideaId);
        return res.send(idea);
    }
}
module.exports = IdeaController;