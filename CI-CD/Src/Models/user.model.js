//1.- Llamamos al objeto mongoose 
const mongoose = require('mongoose');
const { Schema } = mongoose;
//2.-llamar al paquete bcrypt q instalamos, para las criptacciones
const { compareSync, hashSync, genSaltSync } = require('bcryptjs');
//3.-Creamos el modelo user con la clase Schema de mongoose
const UserSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }
});

//4.-Agregamos el metodo ToJSON, Quitamos la propiedad password al momento d q el usuario lea el documento o modelo en cuestion
UserSchema.methods.toJSON = function () {
    let user = this.toObject();
    delete user.password;
    return user;
}

//5.-Agregamos el metodo ComparePasswords, para comparar las contraseñas
UserSchema.methods.ComparePasswords = function (password) {
    return compareSync(password, this.password);
}

//6.- Aplicamos unos hooks de mongoose antes de exportar el modelo, funciona como middlewares
//6.1.- funcion pre, con este metodo hacemos q antes de q c guarde este documento o modelo se ejecute la funcion q le pasamos
UserSchema.pre('save', async function (next) {
    const user = this;//podemos hacer referencia al modelo q c esta por guardarse gracias a la funcion callback configurada q le pasamos.
    if (!user.isModified)
        return next();//metodo next de mongoose, finaliza esta funcion y pasa a las sig. implementaciones, es como un continue
    const salt = genSaltSync(10);//fragmento aleatorio que se usará para generar el hash asociado a la password
    const hashedPassword = hashSync(user.password, salt); //generamos el has del password
    user.password = hashedPassword;// hashedPassword;
    next();//metodo next de mongoose, finaliza esta funcion y pasa a las sig. implementaciones, es como un continue
});
//importamos el modelo, lo llamaremos con el nombre de "user"
module.exports = mongoose.model("user", UserSchema);
