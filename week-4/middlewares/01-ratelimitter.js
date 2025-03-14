// You have to create a middleware for rate limiting a users request based on their username passed in the header

const express = require('express');
const app = express();

// Your task is to create a global middleware (app.use) which will
// rate limit the requests from a user to only 5 request per second
// If a user sends more than 5 requests in a single second, the server
// should block them with a 404.
// User will be sending in their user id in the header as 'user-id'
// You have been given a numberOfRequestsForUser object to start off with which
// clears every one second

let numberOfRequestsForUser = {};

// Store the interval ID so we can clear it in tests
let resetInterval;

// Middleware to rate limit based on user-id
app.use((req, res, next) => {
  const userId = req.header('user-id');

  if (!userId) {
    return res.status(400).json({ error: 'user-id is required' });
  }

  const currentTime = Math.floor(Date.now() / 1000); // Current second timestamp

  // Initialize user data if not already present
  if (!numberOfRequestsForUser[userId]) {
    numberOfRequestsForUser[userId] = { count: 0, lastRequestTime: currentTime };
  }

  const userData = numberOfRequestsForUser[userId];

  if (currentTime === userData.lastRequestTime) {
    userData.count += 1;
  } else {
    userData.count = 1;
    userData.lastRequestTime = currentTime;
  }

  // Limit to 5 requests per second
  if (userData.count > 5) {
    return res.status(404).json({ error: 'Too many requests' });
  }

  // Continue to next middleware/route handler
  next();
});

setInterval(() => {
    numberOfRequestsForUser = {};
}, 1000)

app.get('/user', function(req, res) {
  res.status(200).json({ name: 'john' });
});

app.post('/user', function(req, res) {
  res.status(200).json({ msg: 'created dummy user' });
});

module.exports = app;