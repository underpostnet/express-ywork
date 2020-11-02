
let pgp = require("pg-promise")(/*options*/);
let connect = "postgres://"+data.db.username+":"+data.db.password+"@"+data.db.host+":"+data.db.port+"/"+data.db.database+"";
let db = pgp(connect);

//------------------------------------
//------------------------------------

function showDB(){

	db.map('SELECT * FROM users', [], row => row)
	.then(data => {
		// data = array of active user id-s

		console.log('\nPOSTGRES DB - USERS TABLE');
		for(let i=0;  i<l(data); i++){

			data[i].username = decr((''+data[i].username).trim());
			data[i].email = decr((''+data[i].email).trim());
			data[i].pass = (''+data[i].pass).trim();

		}

		var_dump(data);

	})
	.catch(error => {
		// error
		var_dump(error);
	});

};

//------------------------------------
//------------------------------------

function truncateDB(){

	db.one('TRUNCATE TABLE users RESTART IDENTITY')
	.then(data => {
	})
	.catch(error => {
	});

};

//------------------------------------
//------------------------------------

function getDB(table, end){

	db.map(('SELECT * FROM '+table), [], row => row)
	.then(data => {

		for(let i=0;  i<l(data); i++){

			data[i].username = decr((''+data[i].username).trim());
			data[i].email = decr((''+data[i].email).trim());
			data[i].pass = decr((''+data[i].pass).trim());

		}

		end(data);

	})
	.catch(error => {

		var_dump(error);

	});

}

//------------------------------------
//------------------------------------

function insertDB(obj){

	db.one('INSERT INTO users(id_users, username, pass, email) VALUES(DEFAULT, $1, $2, $3) RETURNING id_users',

	[encr(obj.name), encr(obj.pass), encr(obj.email)])

	.then(data => {

		var_dump(data);

	})
	.catch(error => {

	});

}
