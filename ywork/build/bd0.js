module.exports = function(app, data, dir){

	//http://vitaly-t.github.io/pg-promise/Database.html#multi
	let pgp = require("pg-promise")(/*options*/);
	let connect = "postgres://"+data.bd.username+":"+data.bd.password+"@"+data.bd.host+":"+data.bd.port+"/"+data.bd.database+"";
	let db = pgp(connect);

	let var_dump = require('var_dump');

	function l(size){return size.length;};

	/*

	app.post('/save', function(req, res) {
	  console.log(req.body.objectData);
	  res.contentType('json');
	  res.send({ some: JSON.stringify({response:'json'}) });
	});

	*/

	//------------------------------------
	//------------------------------------

	/*

	db.one('INSERT INTO users(id_users, username, pass, email) VALUES(DEFAULT, $1, $2, $3) RETURNING id_users, username',

	['P4R4N014', '123123', 'fcoverdugoa@gmail.com']

)

.then(data => {

	data.username = (''+data.username).trim();
	var_dump(data);

})
.catch(error => {

	console.log('ERROR:', error); // print error;

});

*/

//------------------------------------
//------------------------------------



//'SELECT * FROM users WHERE username = $1;SELECT * FROM users', 'P4R4N014'
//, row => row.id



db.map('SELECT * FROM users WHERE username = $1', ['P4R4N014'], row => row)
.then(data => {
	// data = array of active user id-s
	for(let i=0;  i<l(data); i++){

		data[i].username = (''+data[i].username).trim();
		data[i].email = (''+data[i].email).trim();
		data[i].pass = (''+data[i].pass).trim();

	}

	var_dump(data);

})
.catch(error => {
	// error
	var_dump(error);
});



//------------------------------------
//------------------------------------

//$sql = 'TRUNCATE TABLE clientes RESTART IDENTITY;';
//$result = pg_query($dbconn, $sql);

//$sql = "INSERT INTO clientes (id,nombre,email,pass) VALUES (DEFAULT,'".$nombre."','".$email."','".$encriptar($pass)."');";
//$result = pg_query($dbconn, $sql);

//$sql = "SELECT * FROM clientes WHERE email='$email' ORDER BY id;";
//$result = pg_query($dbconn, $sql);

//$sql = "DELETE FROM clientes WHERE id = 29;";
//$result = pg_query($dbconn, $sql);

//$sql = "UPDATE clientes SET sietechakras = '' WHERE id = 1;";
//$result = pg_query($dbconn, $sql);

//$sql = "UPDATE clientes SET controlpeso = 'true' WHERE id = 1;";
//$result = pg_query($dbconn, $sql);


//------------------------------------
//------------------------------------

/*

db.one('TRUNCATE TABLE users RESTART IDENTITY')
.then(data => {
})
.catch(error => {
});



db.tx(t => {
	return t.map('SELECT id_users FROM users WHERE pass = $1', ['123123'], row => {
		return t.none('UPDATE users SET email = $1 WHERE id_users = $2', ['pico', row.id_users]);
	}).then(t.batch);
})
.then(data => {
	// success
	//var_dump(data);
})
.catch(error => {
	// error
	var_dump(error);
});




db.none('UPDATE users SET email = $1 WHERE username = $2', ['jaja', 'P4R4N014'])
.then(data => {
	// success
	var_dump(data);
})
.catch(error => {
	// error
	var_dump(error);
});


db.result('DELETE FROM users WHERE username = $1', ['P4R4N014'], r => r.rowCount)
  .then(data => {
      // data = number of rows that were deleted
			var_dump(data);
  });


*/

let CryptoJS = require("crypto-js");
let key = 'kronos94kronos94';

// Encrypt
let ciphertext = CryptoJS.AES.encrypt('contenido original', key).toString();

// Decrypt
let bytes  = CryptoJS.AES.decrypt(ciphertext, key);
let originalText = bytes.toString(CryptoJS.enc.Utf8);

var_dump(bytes);
var_dump(originalText);

};
