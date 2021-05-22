
var pgp = require("pg-promise")(/*options*/);
var connect = "postgres://"+data.db.username+":"+data.db.password+"@"+data.db.host+":"+data.db.port+"/"+data.db.database+"";
var db = pgp(connect);

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
			db_data[i].confirm_email = k.decr((''+db_data[i].confirm_email).trim());
			db_data[i].pass = k.decr((''+db_data[i].pass).trim());

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
			data[i].confirm_email = k.decr((''+data[i].confirm_email).trim());

		}

		end(data, hash);

	})
	.catch(error => {

		var_dump(error);

	});

}

//------------------------------------
//------------------------------------

function update_CONFIRM_EMAIL(email, id){

	db.tx(t => {
		return t.none('UPDATE users SET confirm_email = $1 WHERE id_users = $2',
		[k.encr('true'), id]);
	})
	.then(data => {
		console.log('success update email_confirm -> '+email);
		var_dump(data);
	})
	.catch(error => {
		console.log('error update email_confirm -> '+email);
		var_dump(error);
	});

}

//------------------------------------
//------------------------------------

function update_CHANGE_EMAIL(email, id){

	db.tx(t => {
		return t.none('UPDATE users SET email = $1 WHERE id_users = $2',
		[k.encr(email), id]);
	})
	.then(data => {
		console.log('success update change email -> '+email);
		var_dump(data);
	})
	.catch(error => {
		console.log('error update change email -> '+email);
		var_dump(error);
	});

}

//------------------------------------
//------------------------------------

function update_CHANGE_KOYN(koyn, id){

	db.tx(t => {
		return t.none('UPDATE users SET koyn = $1 WHERE id_users = $2',
		[koyn, id]);
	})
	.then(data => {
		console.log('success update change koyn cant: '+koyn+' id_user -> '+id);
		var_dump(data);
	})
	.catch(error => {
		console.log('error update change koyn cant: '+koyn+' id_user -> '+id);
		var_dump(error);
	});

}

//------------------------------------
//------------------------------------

function update_CHANGE_LIFE(life, max_life , id){

	db.tx(t => {
		return t.none('UPDATE users SET life = $1, max_life = $2 WHERE id_users = $3',
		[life, max_life, id]);
	})
	.then(data => {
		console.log('success update change life: '+life+' max_life: '+max_life+' id_user -> '+id);
		var_dump(data);
	})
	.catch(error => {
		console.log('error update change life: '+life+' max_life: '+max_life+' id_user -> '+id);
		var_dump(error);
	});

}

//------------------------------------
//------------------------------------

function update_CHANGE_PASS(pass, id){

	db.tx(t => {
		return t.none('UPDATE users SET pass = $1 WHERE id_users = $2',
		[k.encr(pass), id]);
	})
	.then(data => {
		console.log('success update change pass -> id:'+id);
		var_dump(data);
	})
	.catch(error => {
		console.log('error update change pass -> id:'+id);
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
