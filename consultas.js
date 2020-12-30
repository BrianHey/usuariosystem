// funcion, consulta sql . agregar usuario 1 para en la tabla usuarios

const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "postgres",
  port: 5432,
  database: "softlife",
});

const agregarUsuario = async (datos) => {
  const consultaIngreso = {
    text: "INSERT INTO usuarios (email, password) VALUES ($1, $2) RETURNING *;",
    values: datos,
  };
  try {
    const resultado = await pool.query(consultaIngreso);
    console.log(resultado.rows);
    return resultado.rows;
  } catch (error) {
    console.log(error.code);
  }
};

const consultarUsuario = async(datos) =>{
    const consultaUsuario = {
        text: "SELECT * FROM usuarios WHERE email = $1 AND password = $2",
        values: datos
    }
    try {
        const resultado = await pool.query(consultaUsuario)
        console.log(resultado.rows)
        return resultado.rowCount
    } catch (error) {
        console.log(error.code)
        return error
    }
}

module.exports = { agregarUsuario, consultarUsuario };
