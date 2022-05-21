const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      auth: '/api/auth',
      categorias: '/api/categorias',
      productos: '/api/productos',
      usuarios: "/api/usuarios"
    }

    //Conexion a base de datos

    this.conectarDB();

    //Middlewares
    this.middlewares();

    //Rutas de mi aplicacion
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //lectura y parseo del body

    this.app.use(express.json());

    //directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
  
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.usuarios, require("../routes/usuarios"));
    this.app.use(this.paths.productos, require("../routes/productos"))
    this.app.use(this.paths.categorias, require("../routes/categorias"))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("servidor corriendo en el puerto ", process.env.PORT);
    });
  }
}

module.exports = Server;
