

app.post('/confirm_email', function (req, res) {

  console.log('post -> confirm_email');
  var_dump(req.body);
  let response = false;

  //------------------------------------------
  //------------------------------------------

  if(req.body.email){



  }


  //------------------------------------------
  //------------------------------------------

  res.send(JSON.stringify(response));
  res.end();


});
