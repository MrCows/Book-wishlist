const jwt = require('jsonwebtoken');

// Set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // Function for authenticating GraphQL requests
  authMiddleware: function ({ req }) {
    // Allows token to be sent via req.body, req.query, or req.headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    // send to next endpoint
    return req;
  },

  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};