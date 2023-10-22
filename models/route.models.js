const db = require("../database")
const table = "tb_route"

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
    const result = await db.query(`SELECT * FROM ${table} WHERE route_id=${id}`)
    return result
  } catch (error) {
    return error
  }
}

const getRoute = async (data) => {
  try {
    const { from, to, lantai } = data
    const result = await db.query(
      `SELECT * FROM ${table} WHERE start=${from} and end=${to} and lantai=${lantai}`
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
    let message = "Error in creating route"
    if (result.affectedRows) {
      message = "Route created successfully"
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
      `UPDATE ${table} SET start='${start}', end='${end}', route='${route}', lantai='${lantai}', updated_at='${updated_at}' WHERE route_id='${id}'`
    )
    let message = "Error in updating route"
    if (result.affectedRows) {
      message = "Route updated successfully"
    }
    return { message }
  } catch (error) {
    return error
  }
}

const deleteRoute = async (id) => {
  try {
    const result = await db.query(`DELETE FROM ${table} WHERE route_id='${id}'`)
    let message = "Error in deleting route"
    if (result.affectedRows) {
      message = "Route deleted successfully"
    }
    return { message }
  } catch (error) {
    return error
  }
}

module.exports = {
  get,
  getById,
  getRoute,
  create,
  update,
  deleteRoute,
}
