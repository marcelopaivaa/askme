const express = require('express')
const app = express()
const connection = require('./database/connection')
const Question = require("./database/Question")
const Answer = require("./database/Answer")

// View Engine
app.set('view engine', 'ejs')

// Static Files
//app.use(express.static('public'))
app.use(express.static(__dirname + '/public'));
  

// Parser and Json
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// Routes
app.get("/", (req, res) => {
    Question.findAll({raw: true, order:[['id', 'desc']]}).then(questions => {
        res.render("index", {
            questions: questions
        })        
    })
})

app.get("/new-ask", (req, res) => {
    res.render("new-ask")
})

app.post("/save-question", (req, res) => {
    let title = req.body.title
    let description = req.body.description
    let category = req.body.category

    Question.create({
        title: title,
        description: description,
        category: category
    }).then(() => {
        res.redirect("/?alert=question-saved")
    })
})

app.post("/question-list", (req, res) => {
    let category = req.body.category

    Question.findAll({raw: true, order:[['id', 'desc']],
        where: {category: category}
    }).then(question => {
        if(question[0] != undefined){
            res.render('question-list', {
                question: question
            })
        }else{
            res.redirect("/?alert=category-undefined")
        }
    })
})

app.get("/question/:id", (req, res) => {
    let id = req.params.id                                                         

    Question.findOne({where: {id: id}}).then(question => {
        if(question != undefined){
            Answer.findAll({order:[['id', 'desc']],
                where: {questionId: question.id}
            }).then(answer => {
                res.render("question", {
                    question: question,
                    answer: answer
                })
            })

        }else{
            res.redirect("/", /*testar função para carregar aviso*/)
        }
    })
})

app.post("/answer", (req, res) => {
    let body = req.body.body
    let questionId = req.body.questionId

    Answer.create({
        body: body,
        questionId: questionId
    }).then(() => {
        res.redirect("/question/" + questionId + "?alert=answer-added")
    })
})

app.listen(8080, () => {console.log("Porta 8080 aberta")})