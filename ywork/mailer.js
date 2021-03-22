

const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(obj, fn) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: data.mailer.host,
    port: data.mailer.port,
    secure: data.mailer.secure, // true for 465, false for other ports
    auth: {
      user: data.mailer.user, // generated ethereal user
      pass: data.mailer.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    // from: '"Fred Foo 👻" <foo@example.com>', // sender address
    // to: "bar@example.com, baz@example.com", // list of receivers
    // subject: "Hello ✔", // Subject line
    // text: "Hello world?", // plain text body
    // html: "<b>Hello world?</b>", // html body
    from: data.mailer.user,
    to: obj.to,
    subject: obj.subject,
    text: obj.text,
    html: obj.html
  });

  console.log("Message sent: %s", info.messageId);
  fn();
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}




eval(fs.readFileSync('C:/dd/global_data/json/cyberia/mailer/confirm_email.js', 'utf8'));
// renderConfirmEmail(lang, email, name, hash)

app.post('/confirm_email', function (req, res) {

  console.log('post -> confirm_email');
  var_dump(req.body);
  let response = false;

  //------------------------------------------
  //------------------------------------------

  if(tl(req.body.email) && req.body.name && req.body.lang && req.session){

      //---------------------------------
      //---------------------------------

      let hash = getHash().split('-')[0];

      let lang = req.body.lang=='es' ? 1 : 0;

      let subject = [
        'Confirm Email',
        'Confirmar Email']
      [lang];

      let html_email = renderConfirmEmail(lang, tl(req.body.email), req.body.name, hash);

      req.session.email_hash = hash;

      //---------------------------------
      //---------------------------------

      sendEmail({

        to: tl(req.body.email),
        subject: subject,
        text: subject,
        html: html_email

      }, function(){

        console.log(('success mailer: <'+tl(req.body.email)+'> '));

        req.session.email = tl(req.body.email);

        response = true;
        res.send(JSON.stringify(response));
        res.end();

      }).catch(function(err) {

        console.log('error mailer: <'+tl(req.body.email)+'> ', err);

        res.send(JSON.stringify(response));
        res.end();

      });

      //res.send('true'); res.end();

  }

  //------------------------------------------
  //------------------------------------------

});

app.get('/validate/email/:hash', function (req, res) {

  console.log('get -> confirm_email');
  var_dump(req.params);
  var_dump(req.session);

  req.session.email_hash_confirm = '-> false';

  if(req.session && req.params.hash){

    if(req.params.hash==req.session.email_hash){

      req.session.email_hash_confirm = '-> true';

      req.session.confirm_email = true;

      update_CONFIRM_EMAIL(req.session.email, req.session.id_users);
      update_CHANGE_EMAIL(req.session.email, req.session.id_users);

    }

  }

  console.log('response confirm_email ->');
  console.log(req.session.email_hash_confirm);

  res.writeHead(301,
    {Location: 'https://www.cyberiaonline.com/'}
  );
  res.end();

});


//------------------------------------------
//------------------------------------------

app.post('/search_email', function (req, res) {

  console.log('post -> search_email');
  var_dump(req.body);

  let cont_email = 0;

  getDB('users', null, function(data, hash){

    for(let i_log=0;i_log<l(data);i_log++){

      if(data[i_log].email==tl(req.body.email)){

        cont_email++;

      }

    }

    if(cont_email<1){

      res.send('false');
      res.end();

    }else{

      res.send('true');
      res.end();

    }

  });

});

//------------------------------------------
//------------------------------------------

eval(fs.readFileSync('C:/dd/global_data/json/cyberia/mailer/pass_email.js', 'utf8'));
// renderPassEmail(lang, email, hash)

app.post('/check_email_forgot', function (req, res) {

  console.log('post -> check_email_forgot');
  var_dump(req.body);

  let session_validate = true;
  if(req.session.email){
    if(tl(req.body.email)!=req.session.email){
      session_validate = false;
    }
  }

  if(req.body && tl(req.body.email) && req.body.lang && session_validate){

    //---------------------------------
    //---------------------------------

    let hash = getHash().split('-')[0];

    let lang = req.body.lang=='es' ? 1 : 0;

    let subject = [
      'Reset Password',
      'Restablecer Contraseña']
    [lang];

    let html_email = renderPassEmailReset(lang, hash);

    //---------------------------------
    //---------------------------------

    sendEmail({

      to: tl(req.body.email),
      subject: subject,
      text: subject,
      html: html_email

    }, function(){

      console.log(('success mailer: <'+tl(req.body.email)+'> '));

      req.session.pass_hash = hash;
      req.session.pass_email_reset = tl(req.body.email);

      res.send('true');
      res.end();

    }).catch(function(err) {

      console.log('error mailer: <'+tl(req.body.email)+'> ', err);

      res.send('false');
      res.end();

    });

    //---------------------------------
    //---------------------------------

  }else{

    res.send('false');
    res.end();

  }

});

//------------------------------------------
//------------------------------------------

app.get('/validate/pass/:hash', function (req, res) {

  console.log('get -> reset_email_confirm');
  var_dump(req.params);
  var_dump(req.session);

  let search_id_user = false;

  if(req.session.pass_hash && req.params.hash){

    if(req.session.pass_hash == req.params.hash){

      req.session.pass_hash = '-> true';

      if(!req.session.id_users){

        search_id_user = true;

        getDB('users', null, function(data, hash){

          for(let i_log=0;i_log<l(data);i_log++){

            if(data[i_log].email==tl(req.session.pass_email_reset)){

              req.session.id_users = data[i_log].id_users;
              console.log('set id_users -> ', req.session.id_users);

            }

          }

          res.writeHead(301,
            {Location: 'https://www.cyberiaonline.com/'}
          );
          res.end();

        });

      }

    }else{

      req.session.pass_hash = '-> false';

    }

  }

  if(!search_id_user){
    res.writeHead(301,
      {Location: 'https://www.cyberiaonline.com/'}
    );
    res.end();
  }

});

//------------------------------------------
//------------------------------------------


app.post('/check_email', function (req, res) {

  console.log('post -> check_email');
  var_dump(req.body);

  let cont_email = 0;

  if(req.body && tl(req.body.email)){

    //----------------------------------------------------------
    //----------------------------------------------------------

    getDB('users', null, function(data, hash){

      for(let i_log=0;i_log<l(data);i_log++){

        if( (data[i_log].email==tl(req.body.email)) && (data[i_log].username!=req.body.username) ){

          cont_email++;

        }

      }

      if(cont_email<1){

        res.send('true');
        res.end();

      }else{

        res.send('false');
        res.end();

      }

    });

  }else{

    res.send('false');
    res.end();

  }

});















//------------------------------------------
//------------------------------------------











//------------------------------------------
//------------------------------------------
