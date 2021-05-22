
var pgp = require("pg-promise")(/*options*/);
var connect = "postgres://"+data.db.username+":"+data.db.password+"@"+data.db.host+":"+data.db.port+"/"+data.db.database+"";
var db = pgp(connect);
// https://vitaly-t.github.io/pg-promise/Database.html

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
			db_data[i].createdat = k.decr((''+db_data[i].createdat).trim());

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

function get_USER(email, pass, fn){

  /*db.task('my-task', t => {
      return t.one('SELECT id_users FROM users WHERE email = $1', k.encr(email))
          .then(user => {
              return t.any('SELECT * FROM users WHERE id_users = $1', user.id_users);
          });
  })
  .then(data => {
			console.log('success get_USER ->');
	 	  var_dump(data);
			fn(data);
  })
  .catch(error => {
			console.log('error get_USER ->');
			console.log(error);
			fn(error);
  });*/


	return db.any('SELECT * FROM users WHERE email = $1 and pass = $2',
	[k.encr(email), k.encr(pass)],
	row => row).then(data => {
		if(l(data)==1){
			log('info', 'success get_USER ->');
			console.log(data[0]);
			fn({success: true, content: data[0]});
		}else{
			if(l(data)>1){
				log('error', ('duplicated user db -> '+email));
			}
			if(l(data)<1){
				log('error', ("user doesn't exist -> "+email));
			}
			var_dump(data);
			fn({success: false, content: data});
		}
	})
	.catch(error => {
		log('error','error get_USER ->');
		console.log(error);
		fn({success: false, content: error});
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

	db.one('INSERT INTO users(id_users, username, pass, email, createdat) VALUES(DEFAULT, $1, $2, $3, $4) RETURNING id_users',

	[k.encr(obj.name), k.encr(obj.pass), k.encr(obj.email), k.encr(new Date().toString())])

	.then(data => {

		console.log('success register:');
		var_dump(data);
		end(id_register, true);

	})
	.catch(error => {

		console.log('fail register:');
		//var_dump(error);
		console.log(error);
		end(id_register, false);

	});

}
