

function controller(req, res, type, url, fn){
  try{
    log('info', type + ' -> '+url);
    if(
      validateToken(req.session.token)
      &&
      validateLogToken(req.session.token)
      &&
      req.body.data.token==req.session.token
    ){
      log('info', 'success controller');
      fn(req, res);
    }else{
      log('error', 'error controller -> corrupt token -> '+req.session.token);
      res.write(JSONstr({error: 'corrupt token'}));
      res.end();
    }
  }catch(err){
    log('error','error controller -> bad api service -> '+err);
    res.write(JSONstr({error: err}));
    res.end();
  }
}
