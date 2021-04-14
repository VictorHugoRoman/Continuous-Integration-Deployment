//###Este es un repositorio de todas las funciones usadas en el repository base y del User, pero aqui son de tipo jest.fn (functions)#####
//exportamos un objeto de todas las funciones q tiene el repositorio de user
//incluye el base repository
//recordar q jest se instala de forma global como dependencia de desarrollo, no s necesario hacer el requiere
//Como en el repositorio son puras funciones usamos jest.fn() de jest para hacer mocks de las funciones del repositorio
module.exports = {
  Get: jest.fn(),
  GetAll: jest.fn(),
  Create: jest.fn(),
  Update: jest.fn(),
  Delete: jest.fn(),
  GetUserByUserName: jest.fn()
};
