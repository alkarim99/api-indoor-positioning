const db = require("../database")
const table = "tb_user"

const get = async () => {
  try {
    const result = await db.query(`SELECT * FROM ${table}`)
    return { result }
  } catch (error) {
    return error
  }
}

const getById = async (id) => {
  try {
    const result = await db.query(`SELECT * FROM ${table} WHERE user_id=${id}`)
    return result
  } catch (error) {
    return error
  }
}

const getByEmail = async (email) => {
  try {
    const result = await db.query(
      `SELECT * FROM ${table} WHERE LOWER(email) = LOWER('${email}')`
    )
    return result
  } catch (error) {
    return error
  }
}

const create = async (data) => {
  try {
    const { full_name, email, password, role, created_at, updated_at } = data
    const result = await db.query(
      `INSERT INTO ${table} (full_name, email, password, role, created_at, updated_at) VALUES ('${full_name}', '${email}', '${password}', '${role}', '${created_at}', '${updated_at}');`
    )
    let message = "Error in creating user"
    if (result.affectedRows) {
      message = "User created successfully"
    }
    return { message }
  } catch (error) {
    return error
  }
}

const update = async (data, id) => {
  try {
    const { fullname, email, password, role, updated_at } = data
    const result = await db.query(
      `UPDATE ${table} SET full_name='${fullname}', email='${email}', password='${password}', role='${role}', updated_at='${updated_at}' WHERE user_id='${id}'`
    )
    let message = "Error in updating user"
    if (result.affectedRows) {
      message = "User updated successfully"
    }
    return { message }
  } catch (error) {
    return error
  }
}

const deleteUser = async (id) => {
  try {
    const result = await db.query(`DELETE FROM ${table} WHERE user_id='${id}'`)
    let message = "Error in deleting user"
    if (result.affectedRows) {
      message = "User deleted successfully"
    }
    return { message }
  } catch (error) {
    return error
  }
}

module.exports = {
  get,
  getById,
  getByEmail,
  create,
  update,
  deleteUser,
}
