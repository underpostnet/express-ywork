module.exports = function(app, data, dir){

  var strH1 = '';
  for(var i=0;i<data.h1.length;i++){

    strH1 = strH1 + '<h1>'+data.h1[i]+'</h1>';

  }

  var strH2 = '';
  for(var i=0;i<data.h2.length;i++){

    strH2 = strH2 + '<h2>'+data.h2[i]+'</h2>';

  }

  var meta_mod = '';
  for(var i=0;i<data.modules.length;i++){

    meta_mod = meta_mod + `<link rel='stylesheet' type='text/css' href='/modules/`+data.modules[i]+`/style.css'>

    `;
    meta_mod = meta_mod + `<script type='text/javascript' src='/modules/`+data.modules[i]+`/main.js'></script>

    `;

    //``

    const path_mod = data.modules[i];

    app.get(("/modules/"+path_mod+"/style.css"), function(req, res) {

      res.sendFile(dir.get("/modules/"+path_mod+"/style.css"));

    });

    app.get(("/modules/"+path_mod+"/main.js"), function(req, res) {

      res.sendFile(dir.get("/modules/"+path_mod+"/main.js"));

    });

  }

  var microdata = '';
  for(var i=0;i<data.microdata.length;i++){

    microdata = microdata + `

    <script type="application/ld+json">

    `+data.microdata[i]+`

    </script>

    `;

  }

  app.get(data.suburl, function(req, res) {

    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    console.log(

      `
      http connection
      ip: `+ip+`
      time: `+new Date()+`
      host: `+req.headers.host+`
      lang: `+req.acceptsLanguages()+`

      `

    );

    let lang = ''+req.acceptsLanguages();
    lang = lang.split('-')[0];
    if(!(lang=='es')){ lang = 'en'; }

    res.writeHead(200, {

      'Content-Type': 'text/html; charset=utf-8',
      'Content-Language': (''+lang)

    });

    res.write(

      (`
        <!DOCTYPE html>

        <html dir='`+data.dir+`' lang='`+lang+`'>

        <head>

        <title>`+data.title+`</title>

        `+microdata+`

        <meta name ='title' content='`+data.title+`' />
        <meta name ='description' content='`+data.description+`' />
        <meta name ='theme-color' content = '`+data.color+`' />

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

        <script type='text/javascript' src='/wsnode.js'></script>

        <!-- <link href='https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap' rel='stylesheet'> -->

        <style>

        @font-face {

          font-family: 'retro-font';
          src: URL('/assets/fonts/PressStart2P.ttf') format('truetype');

        }

        </style>

        <script>

          var grecaptchaTest;
      		var onloadCallback = function() {
      		  grecaptcha.render('test-recaptcha', {
      		    'sitekey' : '`+data.gcap+`'
      		  });
      		  grecaptchaTest = grecaptcha;
      		};

      		function isCaptchaChecked() {
      		  return grecaptchaTest && grecaptchaTest.getResponse().length !== 0;
      		}

        </script>

        `+meta_mod+`

        </head>

        <body>

        <script src='https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit&hl=`+lang+`'
  			async defer></script>

        `+strH1+`

        `+strH2+`

        <script type='text/javascript' src='/path/`+data.pathname+`.js' async defer></script>

        </body>

        </html>

        `).replace(/\n|\t/g, ' ')

      );

      res.end();

    });

    app.get(('/'+data.favicon), function(req, res) {

      res.sendFile(dir.get('/assets/'+data.favicon));

    });

    app.get(('/'+data.image), function(req, res) {

      res.sendFile(dir.get('/assets/'+data.image));

    });

    app.get(('/path/'+data.pathname+'.js'), function(req, res) {

      res.sendFile(dir.get('/path/'+data.pathname+'.js'));

    });

  };
