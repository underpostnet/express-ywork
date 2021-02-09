


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

    console.log('session destroy success -> '+req.session.email);

    req.session.destroy();

    res.send(JSON.stringify(true));

  }else{

    console.log('session destroy failed -> '+req.session.email);

    res.send(JSON.stringify(false));

  }

  res.end();

});




//------------------------------------------------------------------------------
//------------------------------------------------------------------------------


app.post('/check_duplicate', function (req, res) {

  console.log('post -> check_duplicate');
  var_dump(req.body);

  let response = false;

  if(req.body){

    for(val of USERDATA){

      if(val!=null){

        if(val.users.var[0].email==req.body.email){

          response = true;

          console.log('session duplicate -> '+req.session.email);

        }

      }

    }

  }

  res.send(JSON.stringify(response));
  res.end();

});






//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
