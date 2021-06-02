



function redirectController(data, i, req, res, fn){

  let back = (req.session.token==serverToken) ? true : false;
  if(back){
    mainClientPath = fs.readFileSync((data.clientPath+'path/'+data.path[i].main_path+'/back.js'));
  }else{
    mainClientPath = fs.readFileSync((data.clientPath+'path/'+data.path[i].main_path+'/main.js'));
  }

  if( (!back) && (data.path[i].url==='/stream') ){
    log('error', 'fail get path /stream');
    return res.redirect("/");
    res.end();
  }

  fn(mainClientPath);
}
