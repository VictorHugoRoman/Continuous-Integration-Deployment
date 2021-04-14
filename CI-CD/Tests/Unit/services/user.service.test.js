//##### Tests para los metodos de los servicios User ###

const { UserService } = require("../../../src/services");
const { UserRepositoryMock } = require("../../mocks"); //repositorio q deberia contener todas las funciones del user repository y del base repository, pero en este se crean de tipo jest.fn
const { UserModelMock: { user, users } } = require("../../mocks");//informacion mock de usuarios

describe("User Service Tests", () => {
  //beforeEach() is run before each test in a describe
  beforeEach(() => {
    jest.clearAllMocks(); //esto es un hook porque aplicamos una logica o alteramos el funcionamiento de la funcion de alguna forma
  });

  it("Should find a user by id", async () => {
    const UserRepository = UserRepositoryMock;
    //llamamos al metodo Get de nuestro user repositorio mock y le decimos con mockReturnValue(user) q l valor a retornar d b ser del mismo tipo q le mandamos por parametro
    //Es importante configurar primero el repository  con el metodo a usar en este caso GetUserByUserName antes de hacer el test al metodo al q queremos hacer la prueba, y es lo mismo para los demás.
    UserRepository.Get.mockReturnValue(user);
    const _userService = new UserService({ UserRepository });//Instanciamos nuestro user.service pasandole al constructor el UserRepository q s de tipo mock(jest.fn)
    const expected = await _userService.Get(user._id);//Hacemos test de nuestro metodo Get de User Service
    expect(expected).toMatchObject(user);
  });

  it("Should find a user by username", async () => {
    const UserRepository = UserRepositoryMock;
    //llamamos al metodo Get de nuestro user repositorio mock y le decimos con mockReturnValue(user) q l valor a retornar d b ser del mismo tipo q le mandamos por parametro
    //Es importante configurar primero el repository  con el metodo a usar en este caso GetUserByUserName antes de hacer el test al metodo al q queremos hacer la prueba, y es lo mismo para los demás.
    UserRepository.GetUserByUserName.mockReturnValue(user);
    const _userService = new UserService({ UserRepository });
    const expected = await _userService.GetUserByUserName(user.username);//Hacemos test de nuestro metodo GetUserByUserName de User Service
    expect(expected).toMatchObject(user);
  });

  it("Should return a user collection", async () => {
    const UserRepository = UserRepositoryMock;
    UserRepository.GetAll.mockReturnValue(users);
    const _userService = new UserService({ UserRepository });
    const expected = await _userService.GetAll();//Hacemos test de nuestro metodo GetAll de User Service
    expect(expected).toMatchObject(users);
  });

  it("Should update a user by id", async () => {
    const UserRepository = UserRepositoryMock;
    UserRepository.Update.mockReturnValue(user);
    const _userService = new UserService({ UserRepository });
    const expected = await _userService.repository.Update(user._id, user);//Hacemos test de nuestro metodo Update de User Service
    expect(expected).toMatchObject(user);
  });

  it("Should delete a user by id", async () => {
    const UserRepository = UserRepositoryMock;
    UserRepository.Delete.mockReturnValue(true);
    const _userService = new UserService({ UserRepository });
    const expected = await _userService.repository.Delete(user._id);//Hacemos test de nuestro metodo Delete de User Service
    expect(expected).toEqual(true);
  });
});
