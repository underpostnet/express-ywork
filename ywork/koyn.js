


app.get('/koyn',  auth, (req, res) => {
  log('info', 'GET -> /koyn');
  logHeader(req, res, data, false);
  getKoynDB((data)=>{
    let koynDB = {
      time: new Date().getTime(),
      data: data
    };
    res.setHeader('Content-Type', 'application/json');
    res.end(JSONstr(koynDB));
  });
});
