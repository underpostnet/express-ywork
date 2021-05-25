

// getKoynDB(); -> object
var koynDB;
function updateKoynDB(){
  getKoynDB((data)=>{
    koynDB = {
      time: new Date().getTime(),
      data: data
    };
    //console.log(JSONstr(koynDB));
  });
};

updateKoynDB();
setInterval(()=>{
  updateKoynDB();
}, (60*60*24*1000));

console.log(koynDB);
app.get('/koyn',  auth, (req, res) => {
  log('info', 'GET -> /koyn');
  logHeader(req, res, data, false);
  res.setHeader('Content-Type', 'application/json');
  res.end(JSONstr(koynDB));
});

app.get('/last-koyn-time',  auth, (req, res) => {
  log('info', 'GET -> /last-koyn-time');
  logHeader(req, res, data, false);
  res.setHeader('Content-Type', 'application/json');
  res.end(JSONstr(koynDB.time));
});
