

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

  if(req.body.email && req.body.name && req.body.lang && req.session){

      //---------------------------------
      //---------------------------------

      let hash = getHash().split('-')[0];

      let lang = req.body.lang=='es' ? 1 : 0;

      let subject = [
        'Confirm Email',
        'Confirmar Email']
      [lang];

      let html_email = renderConfirmEmail(lang, req.body.email, req.body.name, hash);

      req.session.email_hash = hash;

      //---------------------------------
      //---------------------------------

      sendEmail({

        to: req.body.email,
        subject: subject,
        text: subject,
        html: html_email

      }, function(){

        console.log(('success mailer: <'+req.body.email+'> '));

        response = true;
        res.send(JSON.stringify(response));
        res.end();

      }).catch(function(err) {

        console.log('error mailer: <'+req.body.email+'> ', err);

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

      update_CONFIRM_EMAIL(req.session.email, req.session.id_users)

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


app.post('/check_email', function (req, res) {

  console.log('post -> check_email');
  var_dump(req.body);

  let cont_email = 0;

  if(req.body && req.body.email){

    //----------------------------------------------------------
    //----------------------------------------------------------

    getDB('users', null, function(data, hash){

      for(let i_log=0;i_log<l(data);i_log++){

        if( (data[i_log].email==req.body.email) && (data[i_log].username!=req.body.username) ){

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
