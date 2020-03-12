const express = require('express');
const posts = require('./postDb');

const router = express.Router();

router.get('/', (req, res) => {
  posts.get()
  .then(post => 
    res.status(200).json(post))
  .catch(err => {
    res.status(500).json({message: err})
  })
});

router.get('/:id', (req, res) => {
  posts.getById(req.params.id)
  .then(users => {
    res.status(200).json(users)
  })
  .catch(err => {
    res.status(500).json({message: err})
  })
});

router.delete('/:id', (req, res) => {
  posts.remove(req.params.id)
  .then(users => {
    res.status(200).json(users)
  })
  .catch(err => {
    res.status(500).json({message: err})
  })
});

router.put('/:id', (req, res) => {
  posts.update(req.params.id, req.body)
  .then(users => {
    res.status(200).json(users)
  })
  .catch(err => {
    res.status(500).json({message: err})
  })
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
