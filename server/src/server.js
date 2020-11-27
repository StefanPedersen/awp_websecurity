/**** Node.js libraries *****/
const path = require('path');

/**** External libraries ****/
const express = require('express'); 
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const checkJwt = require("express-jwt"); // Validates access tokens automatically


/**** Configuration ****/
const app = express();
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/questions'; 

async function createServer() {
  // Connect db
  await mongoose.connect(MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});

  // Create data
  const questionDB = require('./questionDB')(mongoose);
 
  
  // Require routes
  const routes = require("./routes")(questionDB); // Inject mongoose into routes module

  // Add middleware
  app.use(bodyParser.json()); 
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(morgan('combined')); 
  app.use(cors());
  app.use(express.static(path.resolve('..', 'client', 'build'))); 
  
  // Open paths that do not need login.
  // You can use various formats to define the open paths.
  const openPaths = [
    // Open "/api/users/authenticate" for POST requests
    { url: "/api/users/authenticate", methods: ["POST"] },
    { url: "/api/users", methods: ["POST"] },
    { url: "/api/users", methods: ["GET"] },
   
  
    // Open everything that doesn't begin with "/api"
    /^(?!\/api).*/gim,
  
    // Open all GET requests on the form "/api/questions/*" using a regular expression
    { url: /\/api\/questions\.*/gim, methods: ["GET"]},
     {url: /\/api\/answers\.*/gim, methods: ["GET"] }
  ];

  // The secret value. Defaults to "the cake is a lie".
  const secret = process.env.SECRET || "the cake is a lie";

  // Validate the user token using checkJwt middleware.
  app.use(checkJwt({ secret, algorithms: ['HS512'] }).unless({ path: openPaths }));

  // This middleware checks the result of checkJwt above
  app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") { // If the user didn't authorize correctly
      res.status(401).json({ error: err.message }); // Return 401 with error message.
    } else {
      next(); // If no errors, forward request to next middleware or route handler
    }
  });
  
  // Add routes
  //const userRouter = require("./usersRouter")(secret);
  const userRouter = require("./usersRouter")(questionDB);

  app.use("/api/questions", routes.questionRouter);
  app.use("/api/answers", routes.answerRouter);
  app.use("/api/users", userRouter);

  // "Redirect" all non-API GET requests to React's entry point (index.html)
  app.get('*', (req, res) =>
    res.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
  );
  
  return app;
}

module.exports = createServer;
