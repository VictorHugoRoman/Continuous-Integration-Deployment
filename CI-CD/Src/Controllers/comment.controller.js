//Aqui van los controllers disponibles para el modelo Comment,  usa la capa Services

let _commentService = null;
class CommentController {
    constructor({ CommentService }) {//por inyeccion de dependencia recibimos CommentService de la capa servicios
        _commentService = CommentService;
    }
    async Get(req, res) {//los objetos req, res los pasara express al momento de hacer la peticion
        const { commentId } = req.params; //params: myappi.com/user/2343 son los parametros de una ruta ej. 2343
        const comment = await _commentService.Get(commentId);
        return res.send(comment);
    }
    async GetAll(req, res) {
        const comments = await _commentService.GetAll();
        return res.send(comments);//res: response y con send dovolvemos los usuario, son metodos de express
    }
    //usaremos un sign Up en vez de este metodo para crear un usuario
    async Create(req, res) {
        //gracias a q configuramos un middleware podemos obtener el body del objeto req, 
        //q s un json de la propiedad body q la cual enviamos en el request de tipo post en el objeto req
        const { body } = req;
    }
    async Update(req, res) {
        //gracias a q configuramos un middleware podemos obtener el body del objeto req, 
        //q s un json de la propiedad body q la cual enviamos en el request de tipo post en el objeto req
        const { body } = req;
        const { commentId } = req.params;
        const updateComment = await _commentService.Update(commentId, body);
        return res.send(updateComment);//res: response y con send dovolvemos los usuario, son metodos de express
    }
    async Delete(req, res) {
        const { commentId } = req.params;
        const deleteComment = await _commentService.Delete(commentId);
        return res.send(deleteComment);
    }
    //Obtener comentarios por idea
    async GetIdeaComments(req, res) {
        const { ideaId } = req.params;
        const comments = await _commentService.GetIdeaComments(ideaId);
        return res.send(comments);
    }
    async CreateComment(req, res) {
        //gracias a q configuramos un middleware podemos obtener el body del objeto req, 
        //q s un json de la propiedad body q la cual enviamos en el request de tipo post en el objeto req
        const { body } = req;
        const { ideaId } = req.params;
        const { id: userId } = req.user;//aqui el id q s la propiedad del user la pasa el valor a userId
        const createdComment = await _commentService.CreateComment(body, ideaId, userId);
        return res.status(201).send(createdComment);
    }
}
module.exports = CommentController;