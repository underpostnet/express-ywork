


//------------------------------------------------------------------------------
//------------------------------------------------------------------------------



app.get('/cards',  auth, (req, res) => {
  log('info', 'GET -> /cards');
  logHeader(req, res, data, false);
  res.setHeader('Content-Type', 'application/json');
  res.end(signData({content: 'test'}));
});



//------------------------------------------------------------------------------
//------------------------------------------------------------------------------