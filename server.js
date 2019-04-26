'use strict';

const express          = require('express');
const bodyParser       = require('body-parser');
const helmet           = require('helmet');
const apiRoutes        = require('./routes/api.js');
const runner           = require('./test-runner.js');
//const unitRunner       = require('./tests/unit-tests.js');
//const functionalRunner = require('./tests/functional-tests.js');


var app = express();
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 1 - Prevent client from sniffing the MIME
app.use(helmet.noSniff());

//2 - Prevent XSS attacks
app.use(helmet.xssFilter());


app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

//3, 4...
apiRoutes(app);  
    
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Error 404: Page Not Found. Maybe you entered a wrong URL?');
});

//Start our server and tests!
app.listen(process.env.PORT || 3000, function () {
  console.log("Listening on port " + process.env.PORT);
  if(process.env.NODE_ENV==='test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch(e) {
        var error = e;
          console.log('Tests are not valid:');
          console.log(error);
      }
    }, 1500);
  }
});

module.exports = app; //for testing
