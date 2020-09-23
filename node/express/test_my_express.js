const express = require("./my_express")
const app = express()
app.listen(8000)

app.get('/index', (req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ name: 'xu' }))
})