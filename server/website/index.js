
const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/sem1', (req, res) => {
    console.log(req.params)
    var html_path = path.join(__dirname, 'index.html')
    console.log(html_path)
    res.sendFile(html_path)
})

app.listen(port, () => {
  console.log(`aaaaaaa app listening on port ${port}`)
})



