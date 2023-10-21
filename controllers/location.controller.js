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
        let count = rss - Math.abs(dataRss[index])
        total = total + Math.pow(count, 2)
      })
      total = Math.sqrt(total)
      kNNResult[name] = total
    })
    const kNNSorted = Object.keys(kNNResult).sort()
    const kNNLocation = kNNSorted[kNNSorted.length - 1]
    const kNNdistance = kNNResult[kNNSorted[kNNSorted.length - 1]]

    const wkNNResult = {}
    fingerprint.map((data, key) => {
      const name = data.name
      dataRss = data.rss.split(",")
      inputRss = rss.split(",")
      let total = 0
      inputRss.map((rss, index) => {
        let count = dataWeight[index] * (rss - Math.abs(dataRss[index]))
        total = total + Math.pow(count, 2)
      })
      total = Math.sqrt(total)
      wkNNResult[name] = total
    })
    const wkNNSorted = Object.keys(wkNNResult).sort()
    const wkNNLocation = wkNNSorted[wkNNSorted.length - 1]
    const wkNNdistance = wkNNResult[wkNNSorted[kNNSorted.length - 1]]

    res.json({
      status: true,
      result: {
        kNN: { kNNLocation, kNNdistance },
        wkNN: { wkNNLocation, wkNNdistance },
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
