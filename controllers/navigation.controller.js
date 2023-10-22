const model = require("../models/navigation.models")
const { create_date, update_date } = require("../helpers/datetime")

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

const getNavigation = async (req, res) => {
  try {
    const { start, end, lantai } = req.body
    if (!(start && end && lantai)) {
      res.status(400).json({
        status: false,
        message: "Bad input, please complete all of fields",
      })
      return
    }
    const result = await model.getNavigation(req.body)
    if (!result?.length) {
      res.status(404).json({
        status: false,
        message: `Data not found!`,
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
    const { start, end, route, lantai } = req.body
    if (!(start && end && lantai && route)) {
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
      // data,
      message,
    })
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
    const id = req.params.id
    const { start, end, route, lantai } = req.body
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
      start: start ?? checkData[0].start,
      end: end ?? checkData[0].end,
      lantai: lantai ?? checkData[0].lantai,
      route: route ?? checkData[0].route,
      updated_at,
    }
    const { message } = await model.update(payload, id)
    res.json({
      status: true,
      message,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: false,
      message: "Error in server",
    })
  }
}

const deleteNavigation = async (req, res) => {
  try {
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
    const { message } = await model.deleteNavigation(id)
    res.json({
      status: true,
      message,
    })
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
  getNavigation,
  create,
  update,
  deleteNavigation,
}
