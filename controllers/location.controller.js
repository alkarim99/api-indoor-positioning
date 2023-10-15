const model = require("../models/fingerprint.models")

const find = async (req, res) => {
  try {
    const { rss } = req.body
    if (!rss) {
      res.status(400).json({
        status: false,
        message: "Bad input, please complete all of fields",
      })
      return
    }

    const { result } = await model.get()
    const fingerprint = result

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

    res.json({
      status: true,
      result: { kNN: { kNNLocation, kNNdistance } },
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
