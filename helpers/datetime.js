const create_date = () => {
  const today = new Date()
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
  const created_at = date + " " + time
  const updated_at = created_at

  return { created_at, updated_at }
}

const update_date = () => {
  const today = new Date()
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
  const updated_at = date + " " + time

  return { updated_at }
}

module.exports = {
  create_date,
  update_date,
}
