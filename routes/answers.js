const express = require('express');
const router = express.Router();
const {Answer} = require('../models/index');

// Answers#destroy
// PATH /answers/:id METHOD: delete
router.delete('/:id', function(req, res, next) {
  const {id} = req.params;

  Answer
    .findById(id)
    .then(answer => Promise.all([answer.getQuestion(), answer.destroy()]))
    .then(([question]) => res.redirect(`/questions/${question.id}`))
    .catch(err => next(err))
});

module.exports = router;
