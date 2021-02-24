






for(let i=0; i<l(data.path);i++){

	const suburl = data.path[i].url;

	  app.get(suburl, auth, function(req, res) {

			//-----------------------------------------------------
			//-----------------------------------------------------

			let header = logHeader(req, res);
			let lang = header.lang;
			let lang_id = header.id;

			//-----------------------------------------------------
			//-----------------------------------------------------

			app.get(('/'+data.favicon), function(req, res) {

	      res.sendFile(dir.get('/assets/'+data.favicon));

	    });

	    app.get(('/'+data.path[i].image), function(req, res) {

	      res.sendFile(dir.get('/assets/'+data.path[i].image));

	    });

			//-----------------------------------------------------
			//-----------------------------------------------------

			let microdata = '';

			for(let ii=0;ii<l(data.path[i].microdata);ii++){

				microdata = microdata + `

				<script type="application/ld+json">

				`+main_microdata[ii]+`

				</script>

				`;

			}

			//-----------------------------------------------------
			//-----------------------------------------------------

			let h1 = '';

			for(let ii=0;ii<l(data.path[i].h1);ii++){

				h1 = h1 + `

					<h1>

					`+data.path[i].h1[ii][lang_id]+`

					</h1>

				`;

			}

			//-----------------------------------------------------
			//-----------------------------------------------------

			let h2 = '';

			for(let ii=0;ii<l(data.path[i].h2);ii++){

					h2 = h2 + `

					<h2>

					`+data.path[i].h2[ii][lang_id]+`

					</h2>

				`;

			}

			//-----------------------------------------------------
			//-----------------------------------------------------

			let fonts = '';

			for(let ii=0;ii<l(data.fonts);ii++){

				fonts = fonts + 	`

				<style>

				@font-face {

					font-family: '`+data.fonts[ii].name+`';
					src: URL('`+data.fonts[ii].url+`') format('truetype');

				}

				</style>

				`;

			}

			//-----------------------------------------------------
			//-----------------------------------------------------

			let mod_js = '<script type="text/javascript">';
			for(let ii=0;ii<l(data.path[i].modules);ii++){

				mod_js = mod_js + fs.readFileSync(

					(data.path_file+'modules/'+data.path[i].modules[ii]+'/main.js')

				);

			}
			mod_js = mod_js + '</script>';

			//-----------------------------------------------------
			//-----------------------------------------------------

			let mod_css = '<style>';
			for(let ii=0;ii<l(data.path[i].modules);ii++){

				mod_css = mod_css + fs.readFileSync(

					(data.path_file+'modules/'+data.path[i].modules[ii]+'/style.css')

				);

			}
			mod_css = mod_css + '</style>';

			//-----------------------------------------------------
			//-----------------------------------------------------

			let mod_gcap = '';

			if(data.path[i].g_cap){

				mod_gcap = `

				<script type='text/javascript'>

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

				<script type='text/javascript' src='https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit&hl=`+lang+`'
				async defer></script>

				`;

			}

			//-----------------------------------------------------
			//-----------------------------------------------------

			let mod_streamer = '';

			if(data.path[i].streamer){
				mod_streamer = `

				<script defer src="/peer.js"></script>
		    <script defer src="/socket.io/socket.io.js"></script>


				`;
			}

			//-----------------------------------------------------
			//-----------------------------------------------------

			let time_in_home = 2800;

			let session_state = `

			console.log('session off');
			function session(data){

				data.users.var[0].lang = '`+lang+`';

				setTimeout(()=>{

						fadeIn(s('.home-log-content'));

				}, `+time_in_home+`);

			}

			`;
			if(req.session.name && req.session.email){


				//---------------------------------------------
				//---------------------------------------------

				let confirm_email_js = '';

				if(req.session.email_hash_confirm){

					if(req.session.email_hash_confirm=='-> true'){

						confirm_email_js = `

							setTimeout(()=>{

									s('.mail-confirm-true').style.display = 'block';
									fadeIn(s('.home-alert'));

							}, `+time_in_home+`);

						`;

					}

					if(req.session.email_hash_confirm=='-> false'){

						confirm_email_js = `

							setTimeout(()=>{

									s('.mail-confirm-false').style.display = 'block';
									fadeIn(s('.home-alert'));

							}, `+time_in_home+`);

						`;

					}

					req.session.email_hash_confirm = '';

				}





				//---------------------------------------------
				//---------------------------------------------

				session_state = `

				console.log('session on');
				console.log('name -> `+req.session.name+`');
				console.log('email -> `+req.session.email+`');
				console.log('confirm_email -> `+req.session.confirm_email+`');

				function session(data){

					 data.users.var[0].name = '`+req.session.name+`';
					 data.users.var[0].email = '`+req.session.email+`';
					 data.session.state = true;
					 data.users.var[0].lang = '`+lang+`';
					 data.users.var[0].confirm_email = `+req.session.confirm_email+`;

					 `+confirm_email_js+`

				}

				`

			}

			//-----------------------------------------------------
			//-----------------------------------------------------

			if(req.session.pass_hash){

				if(req.session.pass_hash == '-> true'){

					session_state = `

					console.log('reset pass');
					function session(data){

						data.users.var[0].lang = '`+lang+`';
						data.users.var[0].email = '`+req.session.pass_email_reset+`';

						setTimeout(()=>{

								fadeIn(s('.change-pass-content'));

						}, `+time_in_home+`);

					}

					`;

					req.session.pass_hash = '-> change_pass';

				}

				if(req.session.pass_hash == '-> false'){

					session_state = `

					console.log('reset pass');
					function session(data){

						setTimeout(()=>{

								s('.mail-pass-notsend').style.display = 'block';
								fadeIn(s('.home-alert'));

						}, `+time_in_home+`);

					}

					`;

					req.session.pass_hash = '';
					req.session.pass_email_reset = '';

				}

			}

			//-----------------------------------------------------
			//-----------------------------------------------------

			res.write((`

				<!DOCTYPE html>

        <html dir='`+data.dir+`' lang='`+lang+`'>

        <head>

        <title>`+data.path[i].title[lang_id]+`</title>

				`+microdata+`

				<meta name ='title' content='`+data.path[i].title[lang_id]+`' />
				<meta name ='description' content='`+data.path[i].description[lang_id]+`' />
				<meta name ='theme-color' content = '`+data.color+`' />

				<link rel='canonical' href='`+data.url+data.path[i].url+`' />


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
				<meta name="apple-mobile-web-app-title" content="`+data.path[i].title[lang_id]+`">
				<meta name="application-name" content="`+data.path[i].title[lang_id]+`">
				<meta name="msapplication-config" content="/browserconfig.xml" />
				<meta name="msapplication-TileColor" content="`+data.color+`">
				<meta name="msapplication-TileImage" content="/mstile-144x144.png">
				<meta name="theme-color" content="`+data.color+`">


				<meta property='og:title' content='`+data.path[i].title[lang_id]+`' />
				<meta property='og:description' content='`+data.path[i].description[lang_id]+`' />
				<meta property='og:image' content='`+data.url+`/`+data.path[i].image+`' />
				<meta property='og:url' content='`+data.url+data.path[i].url+`' />
				<meta name='twitter:card' content='summary_large_image' />


				<meta name='viewport' content='initial-scale=1.0, maximum-scale=1.0, user-scalable=0'/>

				<meta name='viewport' content='width=device-width, user-scalable=no' />

				<script async src='https://www.googletagmanager.com/gtag/js?id=`+data.googletag+`'></script>

				<script type='text/javascript'>

				window.dataLayer = window.dataLayer || [];
				function gtag(){dataLayer.push(arguments);}
				gtag('js', new Date());
				gtag('config', '`+data.googletag+`');

				</script>

				`+mod_streamer+`

				`+mod_gcap+`

				`+fonts+`

				<style>

					`+fs.readFileSync(

						'c:/dd/deploy_area/client/style/'+data.path[i].main_css

					)+`

				</style>

				<script type='text/javascript'>

					`+fs.readFileSync(

						('c:/dd/deploy_area/client/pathfinding-browser.min.js')

					)+`

					`+fs.readFileSync(

						('c:/dd/deploy_area/client/util.js')

					)+`

					`+fs.readFileSync(

						('c:/dd/deploy_area/client/vanilla.js')

					)+`

					`+fs.readFileSync(

						('c:/dd/deploy_area/client/websocket.js')

					)+`

				</script>

				`+mod_js+mod_css+`

				</head>

				<body>

				`+h1+h2+`

				<script type='text/javascript' async defer>

					((()=> {

					`+session_state+`

					`+fs.readFileSync(

						(data.path_file+'path/'+data.path[i].main_js)

					)+`

					})())

				</script>

				</body>

				</html>

				`));

			res.end();


		});

}
