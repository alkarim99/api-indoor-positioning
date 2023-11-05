const emailValidation = require("../email.validation")
const bcrypt = require("bcrypt")
const saltRounds = 10
const model = require("../models/users.models")
const db = require("../database")
const jwt = require("jsonwebtoken")
const { create_date, update_date } = require("../helpers/datetime")

function getToken(req) {
  const token = req?.headers?.authorization?.slice(
    7,
    req?.headers?.authorization?.length
  )

  return token
}

const get = async (req, res) => {
  try {
    jwt.verify(
      getToken(req),
      process.env.JWT_PRIVATE_KEY,
      async (err, { id, role }) => {
        if (role == "admin") {
          const { result } = await model.get()
          res.send({
            status: true,
            message: "Get data success",
            result,
          })
        } else {
          const { result } = await model.getById(id)
          if (!query?.length) {
            res.json({
              status: false,
              message: `ID ${id} not found!`,
            })
          }
          res.json({
            status: true,
            message: "Get success",
            result,
          })
        }
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

const getById = async (req, res) => {
  try {
    jwt.verify(
      getToken(req),
      process.env.JWT_PRIVATE_KEY,
      async (err, { role }) => {
        if (role == "admin") {
          const {
            params: { id },
          } = req
          if (isNaN(id)) {
            res.status(400).json({
              status: false,
              message: "ID must be integer",
            })
            return
          }
          const query = await model.getById(id)
          if (!query?.length) {
            res.json({
              status: false,
              message: `ID ${id} not found!`,
            })
          }
          res.json({
            status: true,
            message: "Get success",
            query,
          })
        } else {
          res.status(400).json({
            status: false,
            message: "Not authorized user!",
          })
          return
        }
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

const create = async (req, res) => {
  try {
    const { fullname, email, password } = req.body
    if (!(fullname && email && password)) {
      res.status(400).json({
        status: false,
        message: "Bad input, please complete all of fields",
      })
      return
    }
    const { valid, reason, validators } = await emailValidation.isEmailValid(
      email
    )
    if (!valid) {
      res.status(400).json({
        status: false,
        message: "Email is invalid!",
        reason: validators[reason].reason,
      })
      return
    }
    const isEmailUnique = await emailValidation.isEmailUnique(email)
    if (isEmailUnique) {
      res.status(400).json({
        status: false,
        message: "Email already in use!",
      })
      return
    }
    if (fullname.length < 3) {
      res.status(400).json({
        status: false,
        message: "Fullname is invalid! Must be greater than or equal to 3",
      })
      return
    }
    if (password.length < 6) {
      res.status(400).json({
        status: false,
        message: "Password is invalid! Must be greater than or equal to 6",
      })
      return
    }
    let role = "user"
    if (req.body.role) {
      if (role != "admin" && role != "user") {
        res.status(400).json({
          status: false,
          message: "Role is invalid! Must be 'admin' or 'user'",
        })
        return
      }
      role = req.body.role
    }
    const { created_at, updated_at } = create_date()
    const payload = {
      email,
      full_name: fullname,
      password,
      role,
      created_at,
      updated_at,
    }
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        // Store hash in your password DB.
        const { message } = await model.create({ ...payload, password: hash })
        res.send({
          status: true,
          message,
        })
      })
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
    jwt.verify(
      getToken(req),
      process.env.JWT_PRIVATE_KEY,
      async (err, { id, role }) => {
        const {
          body: { email, fullname, password },
        } = req
        const roleUser = req.body.role
        let checkData
        if (role == "admin") {
          const idUser = req.body.id
          if (isNaN(idUser)) {
            res.status(400).json({
              status: false,
              message: "ID must be integer",
            })
            return
          }
          checkData = await model.getById(idUser)
        } else {
          checkData = await model.getById(id)
        }
        const { updated_at } = update_date()
        const payload = {
          email: email ?? checkData[0].email,
          full_name: fullname ?? checkData[0].full_name,
          password: password ?? checkData[0].password,
          role: roleUser ?? checkData[0].role,
          updated_at,
        }
        const { valid, reason, validators } =
          await emailValidation.isEmailValid(payload.email)
        if (!valid) {
          res.status(400).json({
            status: false,
            message: "Email is invalid!",
            reason: validators[reason].reason,
          })
          return
        }
        const isEmailUnique = await emailValidation.isEmailUnique(
          payload.email,
          checkData[0].id
        )
        if (isEmailUnique) {
          res.status(400).json({
            status: false,
            message: "Email already in use!",
          })
          return
        }
        if (payload.full_name.length < 3) {
          res.status(400).json({
            status: false,
            message: "Fullname is invalid! Must be greater than or equal to 3",
          })
          return
        }
        if (payload.password.length < 6) {
          res.status(400).json({
            status: false,
            message: "Password is invalid! Must be greater than or equal to 6",
          })
          return
        }
        if (payload.role != "admin" && payload.role != "user") {
          res.status(400).json({
            status: false,
            message: "Role is invalid! Must be 'admin' or 'user'",
          })
          return
        }
        if (password) {
          bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
              payload.password = hash
              const { message } = await model.update(payload, checkData[0].id)
              res.send({
                status: true,
                message,
              })
            })
          })
        } else {
          const { message } = await model.update(payload, checkData[0].id)
          res.send({
            status: true,
            message,
          })
        }
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

const deleteUser = async (req, res) => {
  try {
    jwt.verify(
      getToken(req),
      process.env.JWT_PRIVATE_KEY,
      async (err, { id }) => {
        const checkData = await model.getById(id)
        if (!checkData?.length) {
          res.status(404).json({
            status: false,
            message: `ID ${id} not found`,
          })
          return
        }
        const { message } = await model.deleteUser(id)
        res.send({
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
  create,
  update,
  deleteUser,
}
