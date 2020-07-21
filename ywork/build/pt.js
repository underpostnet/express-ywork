module.exports = function(app, data, dir){

  var strH1 = '';
  for(var i=0;i<data.h1.length;i++){

    strH1 = strH1 + '<h1>'+data.h1[i]+'</h1>';

  }

  var strH2 = '';
  for(var i=0;i<data.h2.length;i++){

    strH2 = strH2 + '<h2>'+data.h2[i]+'</h2>';

  }

  app.get(data.suburl, function(req, res) {

    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('Req "'+data.suburl+'" -> NEW CONNECTION -> IP:'+ip);
    console.log('Req "'+data.suburl+'" -> NEW CONNECTION -> HOST:'+req.headers.host);
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write(

      `
      <!DOCTYPE html>

      <html dir='`+data.dir+`' lang='`+data.lang+`'>

      <head>

      <title>`+data.title+`</title>

      <meta name='title' content='`+data.title+`' />
      <meta name='description' content='`+data.description+`' />

      <link rel='canonical' href='`+data.url+`' />


      <link rel='icon' type='image/png' href='/`+data.favicon+`' />


      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
      <link rel="icon" type="image/png" sizes="194x194" href="/favicon-194x194.png">

      <link rel="icon" type="image/png" sizes="36x36" href="/android-chrome-36x36.png">
      <link rel="icon" type="image/png" sizes="48x48" href="/android-chrome-48x48.png">
      <link rel="icon" type="image/png" sizes="72x72" href="/android-chrome-72x72.png">
      <link rel="icon" type="image/png" sizes="96x96" href="/android-chrome-96x96.png">
      <link rel="icon" type="image/png" sizes="144x144" href="/android-chrome-144x144.png">
      <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png">
      <link rel="icon" type="image/png" sizes="256x256" href="/android-chrome-256x256.png">
      <link rel="icon" type="image/png" sizes="384x384" href="/android-chrome-384x384.png">

      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
      <link rel="manifest" href="/site.webmanifest">
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="`+data.color+`">
      <meta name="apple-mobile-web-app-title" content="`+data.title+`">
      <meta name="application-name" content="`+data.title+`">
      <meta name="msapplication-config" content="/browserconfig.xml" />
      <meta name="msapplication-TileColor" content="`+data.color+`">
      <meta name="msapplication-TileImage" content="/mstile-144x144.png">
      <meta name="theme-color" content="`+data.color+`">


      <meta property='og:title' content='`+data.title+`' />
      <meta property='og:description' content='`+data.description+`' />
      <meta property='og:image' content='`+data.url+`/`+data.image+`' />
      <meta property='og:url' content='`+data.url+`' />
      <meta name='twitter:card' content='summary_large_image' />

      <link rel='stylesheet' type='text/css' href='/style.css'>

      <meta name='viewport' content='initial-scale=1.0, maximum-scale=1.0, user-scalable=0'/>

      <meta name='viewport' content='width=device-width, user-scalable=no' />

      <script async src='https://www.googletagmanager.com/gtag/js?id=`+data.googletag+`'></script>

      <script>

      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '`+data.googletag+`');

      </script>

      <script type='text/javascript' src='/vanilla.js'></script>

      <script type='text/javascript' src='/pathfinding-browser.min.js'></script>

      </head>

      <body>

      `+strH1+`

      `+strH2+`

      <link rel='stylesheet' type='text/css' href='/`+data.pathname+`/style.css'>

      <script type='text/javascript' src='/`+data.pathname+`/main.js'></script>

      </body>

      </html>

      `

    );

    res.end();

  });

  app.get(('/'+data.favicon), function(req, res) {

    res.sendFile(dir.get('/assets/'+data.favicon));

  });

  app.get(('/'+data.image), function(req, res) {

    res.sendFile(dir.get('/assets/'+data.image));

  });

  app.get(('/'+data.pathname+'/main.js'), function(req, res) {

    res.sendFile(dir.get('/path/'+data.pathname+'/main.js'));

  });

  app.get(('/'+data.pathname+'/style.css'), function(req, res) {

    res.sendFile(dir.get('/path/'+data.pathname+'/style.css'));

  });

};
