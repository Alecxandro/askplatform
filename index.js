const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;

//models

const connection = require("./database/database");
const Questions = require("./database/Questions");
const Answers = require("./database/Answers");

//database configuration/connection

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
  Questions.findAll({ raw: true, order: [["id", "DESC"]] }).then(
    (questions) => {
      //    console.log(questions);
      res.render("index", {
        questions: questions,
      });
    }
  );
});

app.get("/ask", (req, res) => {
  res.render("ask");
});

app.get("/question/:id", (req, res) => {
  const id = req.params.id;

  //
  Questions.findOne({
    where: { id: id },
  }).then((question) => {
    if (question != undefined) {
      Answers.findAll({
        where: { questionId: question.id },
      }).then((answr) => {
        res.render("question", {
          question: question,
          answrs: answr,
        });
      });
    } else {
      res.redirect("/");
    }
  });
  //
});

app.post("/sendanswer", (req, res) => {
  const answerDescription = req.body.answerDescription;
  const questionId = req.body.questionId;

  if (answerDescription) {
    Answers.create({
      description: answerDescription,
      questionId: questionId,
    })
      .then(() => {
        res.redirect(`/question/${questionId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

app.post("/savequestion", (req, res) => {
  const questionTitle = req.body.questionTitle;
  const questionDescription = req.body.questionDescription;

  if (questionTitle && questionDescription) {
    Questions.create({
      title: questionTitle,
      description: questionDescription,
    })
      .then(() => {
        console.log("data saved successfully in the database");
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
