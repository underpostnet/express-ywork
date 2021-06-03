




app.post('/update_koyn', function (req, res) {

  controller(req, res, 'POST', '/update_koyn', function(req, res){

    /*console.log('cant ->');
    console.log(req.body.koyn);
    console.log('id_users ->');
    console.log(req.session.id_users);*/

    update_CHANGE_KOYN(req.body.koyn, req.session.id_users);
    req.session.koyn = req.body.koyn;

    res.write(JSONstr(true));
    res.end();

  });

});


//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
