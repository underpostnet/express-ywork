






for(let i=0; i<l(data.path);i++){

	const suburl = data.path[i].url;

	  app.get(suburl, auth, function(req, res) {

			//-----------------------------------------------------
			//-----------------------------------------------------

			redirectController(data, i, req, res, function(mainClientPath){

			let header = logHeader(req, res, data.path[i], true);
			let lang = header.lang;
			let lang_id = header.id;

			//-----------------------------------------------------
			//-----------------------------------------------------



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

			let mod_underpost = '';

			for(let ii=0;ii<l(data.path[i].underpost);ii++){

				mod_underpost = mod_underpost
				//+ `<script type='text/javascript'>`
				+ fs.readFileSync((data.underpostPath+data.path[i].underpost[ii]))
				//+ `</script>`;

			}

			//-----------------------------------------------------
			//-----------------------------------------------------

			let mod_lib = '';
			let mod_socket_io = '';

			for(let ii=0;ii<l(data.path[i].lib);ii++){

				if(data.path[i].lib[ii]=='socket.io.js'){
					mod_socket_io = `

					<script defer src="/socket.io/socket.io.js"></script>

					`;

				}else{

					mod_lib = mod_lib
					//+ `<script type='text/javascript'>`
					+ fs.readFileSync((data.underpostPath+'lib/'+data.path[i].lib[ii]))
					//+ `</script>`;

				}

			}

			//-----------------------------------------------------
			//-----------------------------------------------------


			let renderMicrodata = '';

			for(let jsonMicrodata of microdata){

				renderMicrodata = renderMicrodata + `

				<script type="application/ld+json">

				`+JSONstr(jsonMicrodata)+`

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

			// let mod_js = '<script type="text/javascript">';
			let mod_js = '';
			let mod_css = '<style>';
			let JsCssController = modJsCssController(req, mod_js, mod_css, data.path[i]);
			mod_css = JsCssController.css;
			mod_js = JsCssController.js;
			mod_css = mod_css + '</style>';

			//-----------------------------------------------------
			//-----------------------------------------------------

			let mod_gcap = '';

			if(data.path[i].g_cap){

				mod_gcap = `

				<script type='text/javascript'>

					var grecaptchaTest;
					var siteKey_cap = '`+data.gcap+`';
					var onloadCallback = function() {
						grecaptcha.render('test-recaptcha', {
							'sitekey' : siteKey_cap
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

			let time_in_home = 2800;

			//-----------------------------------------------------
			//-----------------------------------------------------

			let session_pass_reset = '';

			if(req.session.pass_hash){

				if(req.session.pass_hash == '-> true'){

					session_pass_reset = `

					console.log('reset pass success');

					data.users.var[0].lang = '`+lang+`';
					data.users.var[0].email = '`+req.session.pass_email_reset+`';

					setTimeout(()=>{

							fadeIn(s('.change-pass-content'));

					}, `+time_in_home+`);

					`;

					req.session.pass_hash = '-> change_pass';

				}

				if(req.session.pass_hash == '-> false'){

					session_pass_reset = `

					console.log('reset pass failed');

					setTimeout(()=>{

							s('.mail-pass-notsend').style.display = 'block';
							fadeIn(s('.home-alert'));

					}, `+time_in_home+`);

					`;

					req.session.pass_hash = '';
					req.session.pass_email_reset = '';

				}

			}

			//-----------------------------------------------------
			//-----------------------------------------------------

			let session_state = '';

			if(session_pass_reset!=''){
				session_state = sessionOffPassReset(i, req, res, lang, session_pass_reset);
			}else{
				session_state = sessionOff(i, req, res, lang, time_in_home);
			}

			//-----------------------------------------------------
			//-----------------------------------------------------
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

				session_state = sessionOn(i, req, res, lang, confirm_email_js, session_pass_reset);

			}

			//-----------------------------------------------------
			//-----------------------------------------------------

			res.write((`

				<!DOCTYPE html>

        <html dir='`+data.dir+`' lang='`+lang+`'>

        <head>

				<meta charset='`+data.path[i].charset+`'>

        <title>`+data.path[i].title[lang_id]+`</title>

				`+renderMicrodata+`

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

				`+mod_gcap+`

				`+fonts+`

				<style>

					`+fs.readFileSync(

						data.underpostPath+'style/'+data.path[i].main_css

					)+`

				</style>

					`+mod_socket_io+`

					`+mod_css+`

				</head>

				<body>

				`+h1+h2+`

				<script type='text/javascript' async defer>

					((()=> {

					`+mod_underpost+`

					`+mod_lib+`

					`+mod_js+`

					`+session_state+`

					`+mainClientPath+`

					})())

				</script>

				</body>

				</html>

				`));

			res.end();

			});

		});

}
