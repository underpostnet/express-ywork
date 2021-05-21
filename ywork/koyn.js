











app.post('/update_koyn', function (req, res) {

  try{

    //console.log('test security /update_koyn ->');
    //console.log(req.body.token);
    //console.log(req.session.token);

    if(req.body.token==req.session.token){

      console.log('update koyn');
      console.log('cant ->');
      console.log(req.body.koyn);
      console.log('id_users ->');
      console.log(req.session.id_users);

      update_CHANGE_KOYN(req.body.koyn, req.session.id_users);
      req.session.koyn = req.body.koyn;

      res.write(JSONstr(true));
      res.end();

    }else{

      console.log('error /update_koyn -> corrupt token');
      console.log(req.body.token);
      res.write(JSONstr({error: 'corrupt token'}));
      res.end();

    }

  }catch(err){

    console.log('error /update_koyn ->');
    console.log(err);
    res.write(JSONstr({error: err}));
    res.end();

  }

});


//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
