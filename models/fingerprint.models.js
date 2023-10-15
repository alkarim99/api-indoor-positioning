const db = require("../database")
const helper = require("../helper")
const config = require("../config")

const get = async () => {
  try {
    const result = await db.query(`SELECT * FROM tb_fingerprint`)
    return { result }
  } catch (error) {
    return error
  }
}

const getById = async (id) => {
  try {
    const result = await db.query(
      `SELECT * FROM tb_fingerprint WHERE fingerprint_id=${id}`
    )
    return result
  } catch (error) {
    return error
  }
}

const getByLantai = async (id) => {
  try {
    const result = await db.query(
      `SELECT * FROM tb_fingerprint WHERE lantai like '%${id}%'`
    )
    return result
  } catch (error) {
    return error
  }
}

const create = async (fingerprint) => {
  try {
    const { name, lantai, coord_x, coord_y, rss, created_at, updated_at } =
      fingerprint
    const result = await db.query(
      `INSERT INTO tb_fingerprint (name, lantai, coord_x, coord_y, rss, created_at, updated_at) VALUES ('${name}', '${lantai}', '${coord_x}', '${coord_y}', '${rss}', '${created_at}', '${updated_at}');`
    )
    let message = "Error in creating fingerprint"
    if (result.affectedRows) {
      message = "Fingerprint created successfully"
    }
    return { message }
  } catch (error) {
    return error
  }
}

const update = async (fingerprint, id) => {
  try {
    const { name, lantai, coord_x, coord_y, rss, updated_at } = fingerprint
    const result = await db.query(
      `UPDATE tb_fingerprint SET name='${name}', lantai='${lantai}', coord_x='${coord_x}', coord_y='${coord_y}', rss='${rss}', updated_at='${updated_at}' WHERE fingerprint_id='${id}'`
    )
    let message = "Error in updating fingerprint"
    if (result.affectedRows) {
      message = "Fingerprint updated successfully"
    }
    return { message }
  } catch (error) {
    return error
  }
}

const deleteFingerprint = async (id) => {
  try {
    const result = await db.query(
      `DELETE FROM tb_fingerprint WHERE fingerprint_id='${id}'`
    )
    let message = "Error in deleting fingerprint"
    if (result.affectedRows) {
      message = "Fingerprint deleted successfully"
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
  create,
  update,
  deleteFingerprint,
}
