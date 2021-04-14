//##### Tests para los metodos del repositorio User ###

const { UserRepository } = require("../../../src/repositories"); //nuestro user.repository
const mockingoose = require("mockingoose").default; //paquete q instalamos como dependencia de desarrollo, nos sirve para hacer mocking de mongoose
const { User } = require("../../../src/models"); //nuestro user.model
let { UserModelMock: { user, users } } = require("../../mocks"); //informacion mock de usuarios

//Empezando nuestros tests, esta es sintaxis de jest
//Vamos a crear una suite de teste en esta caso de repository user, viene siendo como un grupo q va a almacenar varios test para tenerlo de forma organizada
//describe(string, callback) es metodo de jest y como esta de forma 
describe("User Repository Tests", () => {
  //Esta funcion callback ejecuta c/u d los tests o hooks q queremos implementar
  //por ejemplo aqui antes de ejecutar nuestros tests se aplica el beforEach 
  //reseteamos nuestros mockings
  //beforeEach() is run before each test in a describe
  beforeEach(() => { //esto es un hook porque aplicamos una logica o alteramos el funcionamiento de la funcion de alguna forma
    mockingoose.resetAll();
    jest.clearAllMocks();
  });
  //it(string, callback) Test metodo Get
  it("Should find a user by id", async () => {
    const _user = { ...user }; //usamos el operador rest(...) para hacer una foto-copia del objeto user sin la referencia de memoria.
    delete _user.password;
    //Con mockingoose hacemos el mock a nuestra entidad o modelo User, l decimos q haga un toReturn el cual nos devolvera un user(Mocks) cuando 
    //se utilice el metodo findOne() q corresponde al metodo findById()
    mockingoose(User).toReturn(user, "findOne");

    //instanciamos un objeto de nuestro repositorio original
    const _userRepository = new UserRepository({ User });
    //ejecutamos el metodo get de nuestro user repository, es importante recalcar que en la linea 25 le decimos al modelo user q vamos a trabajar con mockingoose,
    //Entonces get retornará un objeto con datos extra a nuestro model User, en ocasiones s necesario parsear con el objeto Json de javascript
    const expected = await _userRepository.Get(_user._id);//hacemos testing al metodo get de nuestro repositorio

    //Hacemos la acercion o comporacion del objeto informacion esperada, es decir, acertamos o confirmamos la info q estamos esperando con lo q realmente queremos esperar
    //para q el test pase, para eso usamos el sig metodo expect de Jest y lo matcheamos o comparamos con el metodo toMatchObject() de jest.
    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_user); //comaparamos el objeto esperado u obtenido con nuestro modelo User
    //Investigar metodos de Jest para hacer tipos de comparaciones
  });
  //it(string, callback) Test metodo GetUserByUserName
  it("Should find a user by username", async () => {
    const _user = { ...user };
    delete _user.password;
    mockingoose(User).toReturn(user, "findOne");//findOne metodo q ejecuta mockingoose es propio del paquete mockingoose
    const _userRepository = new UserRepository({ User });
    const expected = await _userRepository.GetUserByUserName(_user.username);//hacemos testing al metodo GetUserByUserName de nuestro repositorio
    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_user);
  });
  //it(string, callback) Test metodo GetAll
  it("Should return a user collection", async () => {
    users = users.map(user => {
      delete user.password;
      return user;
    });
    mockingoose(User).toReturn(users, "find");//find metodo q ejecuta mockingoose es propio del paquete mockingoose
    const _userRepository = new UserRepository({ User });
    const expected = await _userRepository.GetAll();//hacemos testing al metodo GetAll de nuestro repositorio
    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(users);
  });
  //it(string, callback) Test metodo Update
  it("Should update an especific user by id", async () => {
    const _user = { ...user };
    delete _user.password;
    mockingoose(User).toReturn(_user, "findOneAndUpdate");//findOneAndUpdate metodo q ejecuta mockingoose es propio del paquete mockingoose
    const _userRepository = new UserRepository({ User });
    const expected = await _userRepository.Update(user._id, { name: "Marluan" });//hacemos testing al metodo Update de nuestro repositorio
    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_user);
  });
  //it(string, callback) Test metodo Delete
  it("Should delete an especific user by id", async () => {
    mockingoose(User).toReturn(user, "findOneAndDelete");//findOneAndDelete metodo q ejecuta mockingoose es propio del paquete mockingoose
    const _userRepository = new UserRepository({ User });
    const expected = await _userRepository.Delete(user._id);//hacemos testing al metodo Delete de nuestro repositorio
    expect(JSON.parse(JSON.stringify(expected))).toEqual(true);
  });
});
