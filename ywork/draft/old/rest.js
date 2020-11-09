

	/*

	app.use(function (req,res,next){

		console.log('test');

		next();

		res.status(400).json({ errors: errors.array() });

	});

	*/


	app.get(('/pathfinding-browser.min.js'), function(req, res){

		res.sendFile(dir.get('/../ywork/build/client/pathfinding-browser.min.js'));

	})

	app.get(('/vanilla.js'), function(req, res){

		res.sendFile(dir.get('/../ywork/build/client/vanilla.js'));

	})

	app.get(('/util.js'), function(req, res){

		res.sendFile(dir.get('/../ywork/build/client/util.js'));

	})

	app.get(('/websocket.js'), function(req, res){

		res.sendFile(dir.get('/../ywork/build/client/websocket.js'));

	})

	app.get(('/underpost.css'), function(req, res){

		res.sendFile(dir.get('/../ywork/style/underpost.css'));

	})

	app.get(('/robots.txt'), function(req, res){

		res.sendFile(dir.get('/robots.txt'));

	})

	app.get(('/sitemap.xml'), function(req, res){

		res.sendFile(dir.get('/sitemap.xml'));

	})




	//favicon.ico
	app.get(('/favicon.ico'), function(req, res) {

		res.sendFile(dir.get('/assets/app/favicon.ico'));

	});

	//apple-touch-icon.png
	app.get(('/apple-touch-icon.png'), function(req, res) {

		res.sendFile(dir.get('/assets/app/apple-touch-icon.png'));

	});

	//favicon-32x32.png
	app.get(('/favicon-32x32.png'), function(req, res) {

		res.sendFile(dir.get('/assets/app/favicon-32x32.png'));

	});

	//favicon-194x194.png
	app.get(('/favicon-194x194.png'), function(req, res) {

		res.sendFile(dir.get('/assets/app/favicon-194x194.png'));

	});

	//android-chrome-36x36.png
	app.get(('/android-chrome-36x36.png'), function(req, res) {

		res.sendFile(dir.get('/assets/app/android-chrome-36x36.png'));

	});

	//android-chrome-48x48.png
	app.get(('/android-chrome-48x48.png'), function(req, res) {

		res.sendFile(dir.get('/assets/app/android-chrome-48x48.png'));

	});

	//android-chrome-72x72.png
	app.get(('/android-chrome-72x72.png'), function(req, res) {

		res.sendFile(dir.get('/assets/app/android-chrome-72x72.png'));

	});

	//android-chrome-96x96.png
	app.get(('/android-chrome-96x96.png'), function(req, res) {

		res.sendFile(dir.get('/assets/app/android-chrome-96x96.png'));

	});

	//android-chrome-144x144.png
	app.get(('/android-chrome-144x144.png'), function(req, res) {

		res.sendFile(dir.get('/assets/app/android-chrome-144x144.png'));

	});

	//android-chrome-192x192.png
	app.get(('/android-chrome-192x192.png'), function(req, res) {

		res.sendFile(dir.get('/assets/app/android-chrome-192x192.png'));

	});

	//android-chrome-256x256.png
	app.get(('/android-chrome-256x256.png'), function(req, res) {

		res.sendFile(dir.get('/assets/app/android-chrome-256x256.png'));

	});

	//android-chrome-384x384.png
	app.get(('/android-chrome-384x384.png'), function(req, res) {

		res.sendFile(dir.get('/assets/app/android-chrome-384x384.png'));

	});

	//favicon-16x16.png
	app.get(('/favicon-16x16.png'), function(req, res) {

		res.sendFile(dir.get('/assets/app/favicon-16x16.png'));

	});

	//site.webmanifest
	app.get(('/site.webmanifest'), function(req, res) {

		res.sendFile(dir.get('/assets/app/site.webmanifest'));

	});

	//safari-pinned-tab.svg
	app.get(('/safari-pinned-tab.svg'), function(req, res) {

		res.sendFile(dir.get('/assets/app/safari-pinned-tab.svg'));

	});

	//browserconfig.xml
	app.get(('/browserconfig.xml'), function(req, res) {

		res.sendFile(dir.get('/assets/app/browserconfig.xml'));

	});

	//mstile-70x70.png
	app.get(('/mstile-70x70.png'), function(req, res) {

		res.sendFile(dir.get('/assets/app/mstile-70x70.png'));

	});

	//mstile-144x144.png
	app.get(('/mstile-144x144.png'), function(req, res) {

		res.sendFile(dir.get('/assets/app/mstile-144x144.png'));

	});

	//mstile-150x150.png
	app.get(('/mstile-150x150.png'), function(req, res) {

		res.sendFile(dir.get('/assets/app/mstile-150x150.png'));

	});

	//mstile-310x150.png
	app.get(('/mstile-310x150.png'), function(req, res) {

		res.sendFile(dir.get('/assets/app/mstile-310x150.png'));

	});

	//mstile-310x310.png
	app.get(('/mstile-310x310.png'), function(req, res) {

		res.sendFile(dir.get('/assets/app/mstile-310x310.png'));

	});

	app.listen(data.http_port, function () {

		console.log('HTTP SERVER ONLINE -> PORT:'+data.http_port);

	});
