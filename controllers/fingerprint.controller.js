const model = require("../models/fingerprint.models")
const { create_date, update_date } = require("../helpers/datetime")
const jwt = require("jsonwebtoken")

function getToken(req) {
  const token = req?.headers?.authorization?.slice(
    7,
    req?.headers?.authorization?.length
  )

  return token
}

const get = async (req, res) => {
  try {
    const { result } = await model.get()
    res.json({
      status: true,
      message: "Get success",
      result,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: false,
      message: "Error in server",
    })
  }
}

const getById = async (req, res) => {
  try {
    const id = req.params.id
    if (isNaN(id)) {
      res.status(400).json({
        status: false,
        message: "ID must be integer",
      })
      return
    }
    const result = await model.getById(id)
    if (!result?.length) {
      res.status(404).json({
        status: false,
        message: `ID ${id} not found!`,
      })
    }
    res.json({
      status: true,
      result,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: false,
      message: "Error in server",
    })
  }
}

const getByLantai = async (req, res) => {
  try {
    const lantai = req.params.lantai
    if (isNaN(lantai)) {
      res.status(400).json({
        status: false,
        message: "Lantai must be integer",
      })
      return
    }
    const result = await model.getByLantai(lantai)
    if (!result?.length) {
      res.status(404).json({
        status: false,
        message: `Lantai ${lantai} not found!`,
      })
    }
    res.json({
      status: true,
      result,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: false,
      message: "Error in server",
    })
  }
}

const create = async (req, res) => {
  try {
    jwt.verify(
      getToken(req),
      process.env.JWT_PRIVATE_KEY,
      async (err, user) => {
        const { name, lantai, coord_x, coord_y, rss } = req.body
        if (!(name && lantai && coord_x && coord_y && rss)) {
          res.status(400).json({
            status: false,
            message: "Bad input, please complete all of fields",
          })
          return
        }
        const { created_at, updated_at } = create_date()
        const data = { ...req.body, created_at, updated_at }
        const { message } = await model.create(data)
        res.json({
          status: true,
          message,
        })
      }
    )
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: false,
      message: "Error in server",
    })
  }
}

const update = async (req, res) => {
  try {
    jwt.verify(
      getToken(req),
      process.env.JWT_PRIVATE_KEY,
      async (err, user) => {
        const id = req.params.id
        const { name, lantai, coord_x, coord_y, rss } = req.body
        if (isNaN(id)) {
          res.status(400).json({
            status: false,
            message: "ID must be integer",
          })
          return
        }
        const checkData = await model.getById(id)
        if (!checkData?.length) {
          res.status(404).json({
            status: false,
            message: `ID ${id} not found!`,
          })
        }
        const { updated_at } = update_date()
        const payload = {
          name: name ?? checkData[0].name,
          lantai: lantai ?? checkData[0].lantai,
          coord_x: coord_x ?? checkData[0].coord_x,
          coord_y: coord_y ?? checkData[0].coord_y,
          rss: rss ?? checkData[0].rss,
          updated_at,
        }
        const { message } = await model.update(payload, id)
        res.json({
          status: true,
          message,
        })
      }
    )
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: false,
      message: "Error in server",
    })
  }
}

const deleteFingerprint = async (req, res) => {
  try {
    jwt.verify(
      getToken(req),
      process.env.JWT_PRIVATE_KEY,
      async (err, user) => {
        const id = req.params.id
        if (isNaN(id)) {
          res.status(400).json({
            status: false,
            message: "ID must be integer",
          })
          return
        }
        const checkData = await model.getById(id)
        if (!checkData?.length) {
          res.status(404).json({
            status: false,
            message: `ID ${id} not found!`,
          })
        }
        const { message } = await model.deleteFingerprint(id)
        res.json({
          status: true,
          message,
        })
      }
    )
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: false,
      message: "Error in server",
    })
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
