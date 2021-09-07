const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Questions = require("./database/Questions");
const { response } = require("express");

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

  Questions.findOne({
    where: { id: id },
  }).then((question) => {
    if (question != undefined) {
      res.render("question", {
        qTitle: question.title,
        qDescription: question.description,
      });
    } else {
      res.redirect("/");
    }
  });
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

app.listen(8080, () => {
  console.log("listening on port 8080...");
});
