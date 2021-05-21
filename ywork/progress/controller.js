

function controller(req, res, type, url, fn){
  try{
    log('info', type + ' -> '+url);
    if(req.body.token==req.session.token){
      fn(req, res);
    }else{
      log('error', 'error controller -> corrupt token -> '+req.body.token);
      res.write(JSONstr({error: 'corrupt token'}));
      res.end();
    }
  }catch(err){
    log('error','error controller -> bad api service -> '+err);
    res.write(JSONstr({error: err}));
    res.end();
  }
}
