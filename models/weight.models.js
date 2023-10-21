const db = require("../database")
const table = "tb_weight"

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
    const result = await db.query(
      `SELECT * FROM ${table} WHERE weight_id=${id}`
    )
    return result
  } catch (error) {
    return error
  }
}

const getActive = async () => {
  try {
    const result = await db.query(`SELECT * FROM ${table} WHERE is_active=1`)
    return result[0]
  } catch (error) {
    return error
  }
}

const create = async (data) => {
  try {
    const { weight, created_at, updated_at } = data
    const result = await db.query(
      `INSERT INTO ${table} (weight, created_at, updated_at) VALUES ('${weight}', '${created_at}', '${updated_at}');`
    )
    let message = "Error in creating weight"
    if (result.affectedRows) {
      message = "Weight created successfully"
    }
    return { message }
  } catch (error) {
    return error
  }
}

const update = async (data, id) => {
  try {
    const { weight, updated_at } = data
    const result = await db.query(
      `UPDATE ${table} SET weight='${weight}', updated_at='${updated_at}' WHERE weight_id='${id}'`
    )
    let message = "Error in updating weight"
    if (result.affectedRows) {
      message = "Weight updated successfully"
    }
    return { message }
  } catch (error) {
    return error
  }
}

const activate = async (data, id) => {
  try {
    const { updated_at } = data
    await db.query(
      `UPDATE ${table} SET is_active=0, updated_at='${updated_at}' WHERE is_active=1`
    )
    const result = await db.query(
      `UPDATE ${table} SET is_active=1, updated_at='${updated_at}' WHERE weight_id='${id}'`
    )
    let message = "Error in updating active weight"
    if (result.affectedRows) {
      message = "Weight active updated successfully"
    }
    return { message }
  } catch (error) {
    return error
  }
}

const deleteWeight = async (id) => {
  try {
    const result = await db.query(
      `DELETE FROM ${table} WHERE weight_id='${id}'`
    )
    let message = "Error in deleting weight"
    if (result.affectedRows) {
      message = "Weight deleted successfully"
    }
    return { message }
  } catch (error) {
    return error
  }
}

module.exports = {
  get,
  getById,
  getActive,
  activate,
  create,
  update,
  deleteWeight,
}
