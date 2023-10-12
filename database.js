const mysql = require("mysql2/promise")
const config = require("./config")

const query = async (sql, params) => {
  const connection = await mysql.createConnection(config.db)
  const [rows] = await connection.execute(sql)
  return rows
}

module.exports = {
  query,
}
