var express = require('express');
var router = express.Router();
// to load all models in sequelize, require the index.js file in the models folder
// const models = require('../models/index')
// models.Question 👈 gets Question model object

// grab Question and Answer model objects from
// models/index module
// destructuring
const {Question, Answer} = require('../models/index')

// PATH /questions/new METHOD: get
router.get('/new', function(req, res, next) {
  res.render('questions/new', {question: Question.build()})
});

// Answers#create
// PATH /questions/:questionId/answers METHOD: post
router.post('/:questionId/answers', function (req, res, next) {
  const {questionId} = req.params;
  const {content} = req.body;
  Answer
    .create({content, QuestionId: questionId})
    .then(() => res.redirect(`/questions/${questionId}`))
    .catch(err => next(err))
})

// PATH /questions METHOD: post
router.post('/', function(req, res, next) {
  // res.send(req.body)
  // WE destructire our form fields for our Question from the req.body
  // title & content map to the name(i.e. html attribute name) of
  // the respective fields in our new Question form
  const {title, content} = req.body;
  Question
    .create({title, content})
    // all sequelize modles have a .create method that takes an object
    // that represent the attributes of the model instance to be created
    // redirect to the showpage of that question
    .then(question => res.redirect(`/questions/${question.id}`))
    // next is a function passed to this callback that will
    // make the next middleware handle the request
    .catch(err => next(err))
});


router.get('/', function(req, res, next) {
  // models.Question.findAll 👈 without destructuring
  // the .findAll method (available on models)
  // returns a promise that resolves to a collection of all instances of the model
  // it can take an object as argument to configure the results
  // here we use order to sort all questions by its createdAt column in descending order
  // then its updatedAt column in descending order
  Question
    .findAll({order: [['createdAt', 'DESC'], ['updatedAt', 'DESC']]})
    .then(
      questions => {
        res.render('questions/index', {questions})
      }
    )
});


// Questions#destroy
// Questions#destroy
// PATH /questions/:id METHOD: delete
router.delete('/:id', function (req, res, next) {
  const {id} = req.params;

  Question
    .findById(id)
    .then(question => question.destroy())
    .then(() => res.redirect(`/questions`))
    .catch(err => next(err));
})

// Questions#edit
// PATH /questions/:id/edit METHOD: get
router.get('/:id/edit', function (req, res, next) {
  const {id} = req.params;
  Question
    .findById(id)
    .then(question => res.render('questions/edit', {question}))
    .catch(err => next(err))
})

// Question#update
// PATH /questions/:id Method: patch
router.patch('/:id', function (req, res, next) {
  const {id} = req.params;
  const {title, content} = req.body;

  Question
    .findById(id)
    .then(question => question.update({title, content}))
    .then(() => res.redirect(`/questions/${id}`))
    .catch(err => next(err))
})

// Questions#show
// PATH /questions/:id METHOD: Get
router.get('/:id', function(req,res,next) {
  const {id} = req.params;
  // .findById is a asynchronous method that queries the database which
  // means that it returns a promise. To the get the resolved value of the promise,
  // we use its .then method and pass it a callback
  Question
    .findById(id)
    // promises can only resolve one value
    // to resolve multiple values we wrap them in an array
    // however if any of the values in our array is a promise, we need to resolve them
    // use Promise.all to do so. It will resolve an array with the resolved values
    // of elements of the array
    // every element in array gets considered as a promise
    .then(question => Promise.all([question, question.getAnswers({order: [['updatedAt', 'DESC']]})]))
    .then(
      ([question, answers]) => res.render('questions/show', {question, answers})
    )
    .catch (
      // The next function is a parameter passed to the callback function this is part of.
      // Calling it will tell express to move on to the next middleware
      // which are error handlers (in this case)
      // 👇 in this situation we let the error handlers display the error message
      err => next(err)
    )
});




module.exports = router;
