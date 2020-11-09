
//main data
let data = {

	title: 'CYBERIA',
	http_port: 3001,
	ws_port: 3002,
	dir: 'ltr',
	lang: ['en', 'es'],
	url: 'https://www.cyberiaonline.com',
	suburl: '/',
	h1: ['CYBERIA', 'Cyberia Online'],
	h2: ['Cyberia Online'],
	description: 'Cyberia OnLine Massively Multiplayer OnLine Role-Playing Game',
	image: 'CYBERIA.jpg',
	favicon: 'favicon-black-clear.png',
	googletag: 'UA-160275428-1',
	gcap: '6LcL09YZAAAAAJdbR0CjLiHDYpn1CHfaIgqO0LhO',
	pathname: 'cyberia',
	db: {

		username: 'postgres',
		password: 'kronos94kronos94',
		host: 'localhost',
		port: '5432',
		database: 'cyberia',
		key: 'magiadelcaos'

	},
	modules: [
		'mod_loader',
		'mod_pathfinding',
		'mod_avatar',
		'mod_tile',
		'mod_chat',
		'mod_click',
		'mod_bots',
		'mod_control',
		'mod_header',
		'mod_session'
	],
	color: '#1a1a1a',
	microdata: [
		`
		{
			"@context": "http://schema.org",
			"@type": "VideoGame",
			"name": "CYBERIA",
			"url": "https://www.cyberiaonline.com/",
			"playMode": "MultiPlayer",
			"gamePlatform": " Online_gaming_services",
			"gameServer": {
				"name": "CYBERIA",
				"url":"https://www.cyberiaonline.com/",
				"serverStatus": "Online"
			},
			"offers": {
				"@type": "Offer",
				"description": "Free",
				"price": "0.00",
				"priceCurrency": "USD",
				"url": "https://www.cyberiaonline.com/"
			},
			"operatingSystem": "Windows, IOS, Android",
			"applicationCategory": "Game, Multimedia",
			"aggregateRating": {
				"@type": "AggregateRating",
				"ratingValue": "5",
				"reviewCount": "20"
			}
		}
		`,
		`
		{
			"@context": "http://schema.org",
			"@type": "BreadcrumbList",
			"itemListElement":
			[{
				"@type": "ListItem",
				"position": 1,
				"item":
				{
					"@id": "https://www.cyberiaonline.com/",
					"name": "Massively Multiplayer OnLine Role-Playing Game"
				}
			}]
		}
		`
	]

};

//z-index
//1100 -> loader
//1002 -> screen-template
//1001 -> login-external
//1000 -> chat-content
//999 -> content-click-icon
//998 -> touch
//950 -> avatar
//925 -> tileMap
//900 -> color

/*

//load index path
require(dir.get('/../ywork/build/pt'))(app, data, dir);

//load http server
require(dir.get('/../ywork/build/sv'))(app, dir, 3001);

//load ws server
require(dir.get('/../ywork/build/ws'))(app, dir, 3002, data);

*/

let fs = require('fs');
eval(fs.readFileSync('C:/xampp/htdocs/node/ywork/build/client/util.js', 'utf8'));
eval(fs.readFileSync('C:/xampp/htdocs/node/ywork/build/server/node.js', 'utf8'));
setStatic(['assets']);
eval(fs.readFileSync('C:/xampp/htdocs/node/ywork/build/server/postgresql.js', 'utf8'));
eval(fs.readFileSync('C:/xampp/htdocs/node/ywork/build/server/wsnode.js', 'utf8'));
eval(fs.readFileSync('C:/xampp/htdocs/node/ywork/build/server/path.js', 'utf8'));
eval(fs.readFileSync('C:/xampp/htdocs/node/ywork/build/server/rest.js', 'utf8'));
