


var session = require('express-session');


//------------------------------------------------------------------------------
//------------------------------------------------------------------------------


//session init

app.use(session({
  secret: data.secret_session,
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

    req.session.name = req.body.username;
    req.session.email = req.body.email;
    req.session.confirm_email = req.body.confirm_email=='' ? false : true;
    req.session.lang = req.body.lang;
    req.session.id_users = req.body.id_users;

    response = true;

  }else{

    response = false;

  }

  res.send(JSON.stringify(response));
  res.end();

});


//------------------------------------------------------------------------------
//------------------------------------------------------------------------------


app.post('/log_in', function (req, res) {

  console.log('post -> log_in');
  var_dump(req.body);

  let response = [false, null];

  if(req.body && req.body.pass && req.body.email){

    //----------------------------------------------------------
    //----------------------------------------------------------

    getDB('users', null, function(data, hash){

      for(let i_log=0;i_log<l(data);i_log++){

        if( (data[i_log].email==req.body.email) && (data[i_log].pass==req.body.pass) ){

          response = [true, data[i_log]];

          console.log('log_in success -> '+req.body.email);
          console.log('log_in success -> id: '+data[i_log].id_users);

        }

      }

      //----------------------------------------------------------
      //----------------------------------------------------------

      if(!response[0]){

        console.log('log_in failed ->'+req.body.email);

      }

      res.send(JSON.stringify(response));
      res.end();

      //----------------------------------------------------------
      //----------------------------------------------------------

    });

    //----------------------------------------------------------
    //----------------------------------------------------------

  }else{

    res.send(JSON.stringify(response));
    res.end();

  }

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

          USERDATA[index_dup].state = 'duplicated';

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

  if(req.body.email && req.body.pass){

    update_CHANGE_PASS(req.body.pass, req.session.id_users);

    console.log('update pass -> '+req.body.email);

    res.send('true');
    res.end();

  }else{

    res.send('false');
    res.end();

  }

});















//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
