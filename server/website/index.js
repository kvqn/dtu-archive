
const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000
const fetch = require('cross-fetch')

app.engine('hbs', exphbs.engine({ extname : '.hbs', defaultLayout: 'main' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/sem1', (req, res) => {
    // console.log(req.params)
    // var html_path = path.join(__dirname, 'index.html')
    // console.log(html_path)
    // res.sendFile(html_path)

    fetch('http://localhost:8000/sem1')
        .then((response) => {
            if (!response.ok) console.log("not ok");
            else console.log("ok");
            // console.log(response)
            return response.json(); })
        .then((data) => {
            console.log(data.students)
            res.render('result', {
                students: data.students
            })
        })
})

app.get('/sem1/:branch', (req, res) => {

    var branch = req.params.branch

    fetch('http://localhost:8000/sem1/?branch=' + branch)
        .then((response) => {
            if (!response.ok) console.log("not ok");
            else console.log("ok");
            // console.log(response)
            return response.json(); })
        .then((data) => {
            console.log(data.students)
            res.render('result', {
                students: data.students
            })
        })
})


app.listen(port, () => {
  console.log(`aaaaaaa app listening on port ${port}`)
})



