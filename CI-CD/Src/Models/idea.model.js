const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IdeaSchema = new Schema({
    idea: { type: String, required: true },
    description: { type: String },
    upvotes: [{ type: Boolean }],
    downvotes: [{ type: Boolean }],
    author: { //relacion con nuestro modelo user
        type: Schema.Types.ObjectId,
        ref: "user",//relacion con nuestro modelo user.model
        required: true,
        autopopulate: true //cada vez q busquemos una idea nos arroje la info de su autor, necesario paquete mongoose-autopopulate
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "comment",//relacion con nuestro modelo comments.model
            required: false,
            autopopulate: true
        }
    ]
});
//configurando el autopopulate de mongoose con el paquete q instalamos
IdeaSchema.plugin(require('mongoose-autopopulate'));

//importamos el modelo, lo llamaremos con el nombre de "idea"
module.exports = mongoose.model('idea', IdeaSchema);