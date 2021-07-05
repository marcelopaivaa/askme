const express = require('express')
const app = express()
const connection = require('./database/connection')

// View Engine
app.set('view engine', 'ejs')

// Static Files
app.use(express.static('public'))

// Parser and Json
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// Routes
app.get("/", (req, res) => {
    res.render("index")
})

app.get("/ask", (req, res) => {
    res.render("ask")
})

app.post("/save-question", (req, res) => {
    var title = req.body.title
    var description = req.body.description
})

app.listen(8080, () => {console.log("Porta 8080 aberta")})