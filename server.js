const express = require('express');
const userRouter = require('./users/userRouter');
const postsRouter = require('./posts/postRouter');
const server = express();
server.use(logger);
server.use(express.json());

server.use('/api/users', userRouter);
server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  const method = req.method;
	const path = req.originalUrl;
	console.log(`${method} to ${path}`);
	next();
}



module.exports = server;
