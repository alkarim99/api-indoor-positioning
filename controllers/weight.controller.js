const model = require("../models/weight.models")
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

const getActive = async (req, res) => {
  try {
    const result = await model.getActive()
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
    const { weight } = req.body
    if (!weight) {
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
    const { weight } = req.body
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
      weight: weight ?? checkData[0].weight,
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

const activate = async (req, res) => {
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
    const { updated_at } = update_date()
    const payload = {
      updated_at,
    }
    const { message } = await model.activate(payload, id)
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

const deleteWeight = async (req, res) => {
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
    const { message } = await model.deleteWeight(id)
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
  getActive,
  activate,
  create,
  update,
  deleteWeight,
}
