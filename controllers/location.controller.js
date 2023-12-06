const modelFingerprint = require("../models/fingerprint.models")
const modelWeight = require("../models/weight.models")

const find = async (req, res) => {
  try {
    const { rss, lantai_id } = req.body

    if (!(rss && lantai_id)) {
      res.status(400).json({
        status: false,
        message: "Bad input, please complete all of fields",
      })
      return
    }

    const fingerprint = await modelFingerprint.getByLantai(lantai_id)
    const { weight } = await modelWeight.getActive()
    const dataWeight = weight.split(",")

    const kNNResult = {}
    fingerprint.map((data, key) => {
      const name = data.name
      dataRss = data.rss.split(",")
      inputRss = rss.split(",")
      let total = 0
      inputRss.map((rss, index) => {
        let count = Math.abs(rss - dataRss[index])
        total = total + Math.pow(count, 2)
      })
      // total = Math.sqrt(total)
      kNNResult[name] = total
    })
    const kNNSorted = Object.entries(kNNResult)
      .sort(([, a], [, b]) => a - b)
      .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
    const kNNLocation =
      Object.keys(kNNSorted)[Object.keys(kNNSorted).length - 1]
    const kNNdistance = kNNResult[kNNLocation]

    const wkNNResult = {}
    fingerprint.map((data, key) => {
      const name = data.name
      dataRss = data.rss.split(",")
      inputRss = rss.split(",")
      let total = 0
      inputRss.map((rss, index) => {
        let count = dataWeight[index] * Math.abs(rss - dataRss[index])
        total = total + Math.pow(count, 2)
      })
      // total = Math.sqrt(total)
      wkNNResult[name] = total
    })
    const wkNNSorted = Object.entries(wkNNResult)
      .sort(([, a], [, b]) => a - b)
      .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
    const wkNNLocation =
      Object.keys(wkNNSorted)[Object.keys(wkNNSorted).length - 1]
    const wkNNdistance = wkNNResult[wkNNLocation]

    const qWkNNResult = {}
    fingerprint.map((data, key) => {
      const name = data.name
      dataRss = data.rss.split(",")
      let total = 0
      inputRss.map((rss, index) => {
        let count =
          dataWeight[index] *
          Math.abs((10 ^ 0.1) * rss - (10 ^ 0.1) * dataRss[index])
        total = total + Math.pow(count, 2)
      })
      // total = Math.sqrt(total)
      qWkNNResult[name] = total
    })
    const qWkNNSorted = Object.entries(qWkNNResult)
      .sort(([, a], [, b]) => a - b)
      .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
    const qWkNNLocation =
      Object.keys(qWkNNSorted)[Object.keys(qWkNNSorted).length - 1]
    const qWkNNdistance = qWkNNResult[qWkNNLocation]

    res.json({
      status: true,
      result: {
        kNN: { kNNLocation, kNNdistance },
        wkNN: { wkNNLocation, wkNNdistance },
        qWkNN: { qWkNNLocation, qWkNNdistance },
      },
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
  find,
}
