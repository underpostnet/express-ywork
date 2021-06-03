

function sessionOn(i, req, res, lang, confirm_email_js, session_pass_reset){

  let dead_state = 'false';
  if(req.session.life<=0){
        dead_state = 'true';
  }

  let bot_server = `
  data.bots = { activeServer: false };
  `;

  if(req.session.email==data.bot_server.email){
    bot_server = `
    //BOTS
    data.bots = {
      activeServer: true,
      initServer: function(){this.activeServer=true;mod_bots.initServer(data);},
      sendnew: function(id){mod_bots.sendnew(data, id);},
      testBots: function(){mod_bots.testBots(data);}
    };
    data.users.var[0].status = 'botServer';
    data.users.var[0].sub_state = 'dead';
    `;
  }

  return `

  console.log('session on');
  console.log('name -> `+req.session.name+`');
  console.log('email -> `+req.session.email+`');
  console.log('confirm_email -> `+req.session.confirm_email+`');
  let dead_state = `+dead_state+`;

  function session(data){

     data.token = '`+req.session.token+`';
     data.users.var[0].name = '`+req.session.name+`';
     data.users.var[0].email = '`+req.session.email+`';
     data.session.state = true;
     data.users.var[0].lang = '`+lang+`';
     data.users.var[0].confirm_email = `+req.session.confirm_email+`;
     data.users.var[0].coin = `+req.session.koyn+`;
     data.users.var[0].life = `+req.session.life+`;
     data.users.var[0].max_life = `+req.session.max_life+`;
     data.ws.host = '`+ws_host+`';


     `+bot_server+`

     `+confirm_email_js+`

     `+session_pass_reset+`

  }

  `;
}
