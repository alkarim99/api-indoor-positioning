const db = require("../database")
const table = "tb_navigation"

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
      `SELECT * FROM ${table} WHERE navigation_id=${id}`
    )
    return result
  } catch (error) {
    return error
  }
}

const getByLantai = async (lantai) => {
  try {
    const result = await db.query(
      `SELECT * FROM ${table} WHERE lantai=${lantai}`
    )
    return result
  } catch (error) {
    return error
  }
}

const getNavigation = async (data) => {
  try {
    const { start, end, lantai } = data
    const result = await db.query(
      `SELECT * FROM ${table} a WHERE a.start='${start}' and a.end='${end}' and a.lantai=${lantai}`
    )
    return result
  } catch (error) {
    return error
  }
}

const create = async (data) => {
  try {
    const { start, end, route, lantai, created_at, updated_at } = data
    const result = await db.query(
      `INSERT INTO ${table} (start, end, route, lantai, created_at, updated_at) VALUES ('${start}', '${end}', '${route}', '${lantai}', '${created_at}', '${updated_at}');`
    )
    let message = "Error in creating navigation"
    if (result.affectedRows) {
      message = "Navigation created successfully"
    }
    return { message }
  } catch (error) {
    return error
  }
}

const update = async (data, id) => {
  try {
    const { start, end, route, lantai, updated_at } = data
    const result = await db.query(
      `UPDATE ${table} SET start='${start}', end='${end}', route='${route}', lantai='${lantai}', updated_at='${updated_at}' WHERE navigation_id='${id}'`
    )
    let message = "Error in updating navigation"
    if (result.affectedRows) {
      message = "Navigation updated successfully"
    }
    return { message }
  } catch (error) {
    return error
  }
}

const deleteNavigation = async (id) => {
  try {
    const result = await db.query(
      `DELETE FROM ${table} WHERE navigation_id='${id}'`
    )
    let message = "Error in deleting navigation"
    if (result.affectedRows) {
      message = "Navigation deleted successfully"
    }
    return { message }
  } catch (error) {
    return error
  }
}

module.exports = {
  get,
  getById,
  getByLantai,
  getNavigation,
  create,
  update,
  deleteNavigation,
}
