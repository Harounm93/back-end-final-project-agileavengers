var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/');
var usersRouter = require('./routes/users/users');
var postsRouter = require('./routes/posts/posts');
var trophiesRouter = require('./routes/trophies/trophies');

const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');

// Authorization middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-ip1x4wr7.eu.auth0.com/.well-known/jwks.json`,
  }),

  // Validate the audience and the issuer.
  aud: 'https://dev-ip1x4wr7.eu.auth0.com/api/v2/',
  iss: `https://dev-ip1x4wr7.eu.auth0.com/`,
  algorithms: ['RS256'],
});

var app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(logger('dev'));
app.use(express.json({ limit: '200mb' })); // added limit code
app.use(express.urlencoded({ limit: '200mb', extended: true })); // added limit code and changed extended to true
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', checkJwt, indexRouter);
app.use('/posts', checkJwt, postsRouter);
app.use('/users', checkJwt, usersRouter);
app.use('/trophies', checkJwt, trophiesRouter);
module.exports = app;
