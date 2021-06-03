


app.post('/update_life', function (req, res) {

  controller(req, res, 'POST', '/update_life', function(req, res){

    //var_dump(req.body);
    update_CHANGE_LIFE(req.body.life, req.body.max_life, req.session.id_users);
    req.session.life = req.body.life;
    req.session.max_life = req.body.max_life;
    res.write(JSONstr(true));
    res.end();

  });

});


  //------------------------------------------------------------------------------
  //------------------------------------------------------------------------------
