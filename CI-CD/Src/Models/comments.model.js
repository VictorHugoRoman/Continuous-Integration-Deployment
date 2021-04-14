const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
    comment: { type: String, required: true },
    description: { type: String },
    author: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
        autopopulate: true
    }
});
//configurando el autopopulate de mongoose con el paquete q instalamos
CommentSchema.plugin(require('mongoose-autopopulate'));

//importamos el modelo, lo llamaremos con el nombre de "comment"
module.exports = mongoose.model("comment", CommentSchema);