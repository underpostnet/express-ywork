



function redirectController(suburl, req, res, fn){

  if(suburl==='/stream'){

    if(!(req.session.email==data.bot_server.email)){

      //session_state = `location.href='https://www.cyberiaonline.com/'`;

      /*

      res.writeHead(301,
        {Location: 'https://www.cyberiaonline.com/'}
      );
      res.end();

      */

      // res.json();
      // res.redirect('https://www.cyberiaonline.com/');
      // res.end();

      log('error', 'fail get path /stream');
      logHeader(req, res, data, false);
      return res.redirect("https://www.cyberiaonline.com/");

      // res.writeHead(302, {location: 'https://www.cyberiaonline.com/'});
      // res.end();

    }

  }

  fn();

}
