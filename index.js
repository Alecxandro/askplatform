const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Questions = require("./database/Questions");

//database configuration
connection
  .authenticate()
  .then(() => {
    console.log("database connection established");
  })
  .catch((msgerr) => {
    console.log(msgerr);
  });
//
app.set("view engine", "ejs");
app.use(express.static("public"));
//
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
app.get("/", (req, res) => {
  Questions.findAll({raw: true}).then((questions)=>{
//    console.log(questions);
res.render("index",{
    questions: questions,
});
  })
  
});

app.get("/ask", (req, res) => {
  res.render("ask");
});

app.post("/savequestion", (req, res) => {
  const questionTitle = req.body.questionTitle;
  const questionDescription = req.body.questionDescription;

  if (questionTitle && questionDescription) {
    Questions.create({
      title: questionTitle,
      description: questionDescription,
    }).then(()=>{
        console.log('data saved successfully in the database');
        res.redirect('/');
    }).catch((err)=>{
        console.log(err);
    })
  }
  
});

app.listen(8080, () => {
  console.log("listening on port 8080...");
});
