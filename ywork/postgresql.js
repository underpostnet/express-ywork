
let pgp = require("pg-promise")(/*options*/);
let connect = "postgres://"+data.db.username+":"+data.db.password+"@"+data.db.host+":"+data.db.port+"/"+data.db.database+"";
let db = pgp(connect);

//------------------------------------
//------------------------------------

function showDB(){

	db.map('SELECT * FROM users', [], row => row)
	.then(db_data => {
		// data = array of active user id-s

		console.log('\nPOSTGRES DB - USERS TABLE');
		for(let i=0;  i<l(db_data); i++){

			db_data[i].username = k.decr((''+db_data[i].username).trim());
			db_data[i].email = k.decr((''+db_data[i].email).trim());
			db_data[i].pass = (''+db_data[i].pass).trim();

		}

		var_dump(db_data);

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

function getDB(table, hash, end){

	db.map(('SELECT * FROM '+table), [], row => row)
	.then(data => {

		for(let i=0;  i<l(data); i++){

			data[i].username = k.decr((''+data[i].username).trim());
			data[i].email = k.decr((''+data[i].email).trim());
			data[i].pass = k.decr((''+data[i].pass).trim());

		}

		end(data, hash);

	})
	.catch(error => {

		var_dump(error);

	});

}

//------------------------------------
//------------------------------------

function insert_USERS(id_register, obj, end){

	db.one('INSERT INTO users(id_users, username, pass, email) VALUES(DEFAULT, $1, $2, $3) RETURNING id_users',

	[k.encr(obj.name), k.encr(obj.pass), k.encr(obj.email)])

	.then(data => {

		console.log('success register:');
		var_dump(data);
		end(id_register, true);

	})
	.catch(error => {

		console.log('fail register:');
		var_dump(error);
		end(id_register, false);

	});

}
