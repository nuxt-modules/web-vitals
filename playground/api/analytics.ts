const bodyParser = require('body-parser')
const app = require('express')()

app.use(bodyParser.json())
app.all('/analytics', (req, res) => {
  console.log(req.body)
  res.json({ body: 'ok' })
})

module.exports = app
