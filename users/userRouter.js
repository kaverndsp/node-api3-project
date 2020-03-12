const express = require('express');
const users = require('./userDb');
const posts = require('../posts/postDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  users.insert(req.body)
  .then(user => {
    res.status(201).json(user);
  })
  .catch(err => {
    res.status(500).json({
      message: "error"
    })
  })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  posts.insert(req.body)
  .then(Post => {
    res.status(201).json(Post)
  })
  .catch(err => {
    res.status(500).json({message: "Error"})
  })
});

router.get('/', (req, res) => {
  users.get()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(err => {
    res.status(500).json({message: "error"})
  })
});

router.get('/:id', validateUserId, (req, res) => {
  users.getById()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(err => {
    res.status(500).json({message: err})
  })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  users.getUserPosts(req.params.id)
  .then(posts => {
    res.json(posts)
  })
  .catch(err => {
    res.status(500).json({message: err})
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  users.remove(req.params.id)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
      res.status(500).json({message: err})
    });
});

router.put('/:id', validateUserId, (req, res) => {
  users.update(req.params.id, req.body)
  .then(user => {
      res.status(200).json(user)
  })
  .catch(err => {
    res.status(500).json({message: err})
  })
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;
  users.getById(id)
  .then(user => {
		if (!user) {
			res.status(400).json({ message: 'No user found' });
		} else {
			next();
		}
	});
}

function validateUser(req, res, next) {
  if(!req.body.name) {
    res.status(400).json({
      message: "missing user data"
    })
 }
  next();
}

function validatePost(req, res, next) {
  if(!req.body) {
    res.status(400).json({ message: "missing post data" })
  } else if(req.body.name === "") {
    res.status(400).json({ message: "missing required text field" })
  }else{
    next();
  }
}

module.exports = router;
