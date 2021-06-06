

function sessionOffPassReset(i, req, res, lang, session_pass_reset){
  return `

  console.log('session off');
  let dead_state = false;
  function session(data){

    data.users.var[0].lang = '`+lang+`';
    data.bots = { activeServer: false };
    data.token = '`+req.session.token+`';
    data.ws.host = '`+ws_host+`';
    data.interval_client_ping = `+ping.interval_client_ping+`;

    `+session_pass_reset+`

  }

  `;
}

function sessionOff(i, req, res, lang, time_in_home){
  return  `

  console.log('session off');
  let dead_state = false;
  function session(data){

    data.users.var[0].lang = '`+lang+`';
    data.bots = { activeServer: false };
    data.token = '`+req.session.token+`';
    data.ws.host = '`+ws_host+`';
    data.interval_client_ping = `+ping.interval_client_ping+`;

    setTimeout(()=>{

        fadeIn(s('.home-log-content'));

    }, `+time_in_home+`);

  }

  `;
}
