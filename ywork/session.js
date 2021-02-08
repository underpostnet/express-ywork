


var session = require('express-session');


//------------------------------------------------------------------------------
//------------------------------------------------------------------------------


//session init

app.use(session({
  secret: 'express-session-cyberia',
  resave: true,
  saveUninitialized: true
}));

// session Authentication and Authorization Middleware

var auth = function(req, res, next) {

  if (req.session && req.session.name && req.session.email){

    // console.log('session user on');

  }else{

    // console.log('session user off');

  }

  return next();

};


//------------------------------------------------------------------------------
//------------------------------------------------------------------------------


app.post('/set_session', function (req, res) {

  console.log('post -> set_session');
  var_dump(req.body);

  let response;

  if(req.body){

    req.session.name = req.body.name;
    req.session.email = req.body.email;

    response = true;

  }else{

    response = false;

  }

  res.send(JSON.stringify(response));
  res.end();

});




//------------------------------------------------------------------------------
//------------------------------------------------------------------------------



app.post('/destroy_session', function (req, res) {

  console.log('post -> destroy_session');

  if(req.session){

    req.session.destroy();

    res.send(JSON.stringify(true));

    console.log('session destroy success');

  }else{

    res.send(JSON.stringify(false));

    console.log('session destroy failed');

  }

  res.end();

});













//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
