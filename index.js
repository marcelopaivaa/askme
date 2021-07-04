const express = require('express')
const app = express()

app.get("/", (req, res) => {
    res.send("Welcomwe to my web site !")
})

app.listen(8080, () => {console.log("Porta 8080 aberta")})