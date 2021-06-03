
/*

session(options)

https://expressjs.com/en/resources/middleware/session.html

Create a session middleware with the given options.

Note Session data is not saved in the cookie itself,
just the session ID. Session data is stored server-side.

*/

var session = require('express-session');


//------------------------------------------------------------------------------
//------------------------------------------------------------------------------


//session init

app.use(session({
  secret: data.secret_session,
  resave: true,
  saveUninitialized: true,
  cookie : {
        maxAge: 1000* 60 * 60 *24 * 365
    }
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

function logIn(email, pass, req, res){
  let response = false;
  get_USER(email, pass, function(dbResp){
    if(dbResp.success){

      if(validateToken(req.session.token)){

      log('info', 'Login Success ->');
      response = true;
      let user = dbResp.content;

      //--------------------------------------------------------------------------
      if(k.decr(user.email)==data.bot_server.email){
        log('info', 'set serverToken -> '+req.session.token);
        serverToken = req.session.token;
      }else{
        log('info', 'set logUsersToken -> '+req.session.token);
        logUsersToken.push(req.session.token);
      }

      //--------------------------------------------------------------------------
      req.session.name = k.decr(user.username);
      req.session.email = tl(k.decr(user.email));
      req.session.confirm_email = user.confirm_email==null ? false : true;
      req.session.lang = user.lang;
      req.session.id_users = user.id_users;

      //--------------------------------------------------------------------------
      if(user.koyn==null){
        console.log('init koyn null');
        req.session.koyn = 0;
      }else {
        req.session.koyn = user.koyn;
      }
      //--------------------------------------------------------------------------
      if(user.life==null){
        console.log('init life null');
        req.session.life = 100;
      }else {
        req.session.life = user.life;
      }
      //--------------------------------------------------------------------------
      if(user.max_life==null){
        console.log('init max_life null');
        req.session.max_life = 100;
      }else {
        req.session.max_life = user.max_life;
      }

      res.write(JSONstr(response));
      res.end();

    }else{

      log('error', 'corrupt token login -> '+req.session.token);
      res.write(JSONstr(response));
      res.end();

    }

    }else{
      res.write(JSONstr(response));
      res.end();
    }
  });
};


app.post('/log_in', function (req, res) {
  log('info', 'POST -> log_in');
  var_dump(req.body);
  let response = false;
  if(req.body && req.body.pass && req.body.email){
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    let email = tl(req.body.email);
    let pass = req.body.pass;
    logIn(email, pass, req, res);
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
  }else{
    res.write(JSONstr(response));
    res.end();
  }
});


//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

app.get('/server', function(req, res){
  logIn(data.bot_server.email, data.bot_server.pass, req, res);
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

  if(req.body){

    let index_dup = 0;
    for(val of USERDATA){

      //-----------------------------------------------------------

      if(val!=null){

        if(

          (val.users.var[0].name==req.body.name)
          &&
          (val.users.var[0].hash!=req.body.hash)

          ){

          USERDATA[index_dup].state = 'close';
          USERDATA[index_dup].validator = ['Duplicate Session', 'Session Duplicada'];

          CLIENTS[index_dup].send(JSON.stringify(USERDATA[index_dup]));

          console.log('session duplicate -> '+req.session.email);

        }

      }

      //-----------------------------------------------------------

      index_dup++;

      //-----------------------------------------------------------

    }

  }

  res.send(JSON.stringify({}));
  res.end();

});






//------------------------------------------------------------------------------
//------------------------------------------------------------------------------





app.post('/change_pass', function (req, res) {

  console.log('post -> change_pass');
  var_dump(req.body);
  var_dump(req.session);

  let response = false;

  if(req.session.pass_hash){

    if(tl(req.body.email) && req.body.pass && (req.session.pass_hash=='-> change_pass')){

      update_CHANGE_PASS(req.body.pass, req.session.id_users);

      console.log('update pass -> '+tl(req.body.email));

      req.session.pass_hash = '';
      req.session.pass_email_reset = '';

      response = true;

    }

  }

  res.send(response);
  res.end();

});















//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
