var crypto = require('crypto');

var algorithm = 'aes-256-ctr';

var encrypt = (text, secretKey, iv) => {

    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
};

var decrypt = (hash, secretKey) => {

    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));

    const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

    return decrpyted.toString();
};

//--------------------------------------------
//--------------------------------------------

var k = {
	encr: function(content){
		return encrypt(content, data.db.key, Buffer.from(data.db.iv, "utf8")).content;
	},
	decr: function(content){
		return decrypt({
			content: content,
			iv: Buffer.from(data.db.iv, "utf8").toString('hex')
		}, data.db.key, Buffer.from(data.db.iv, "utf8"));
	},
	info: function(){
		log('info', 'DB ENCRYPT INFO ->');
		log('info', 'buffer iv ->');
		console.log(Buffer.from(data.db.iv, "utf8"));
		log('info','key char str length -> '+l(data.db.key));
		log('info','iv char str length -> '+l(data.db.iv));
	}
	/*
	let test = 'asda';
	console.log(k.encr(test));
	console.log(k.encr(test));
	console.log(k.decr(k.encr(test)));
	console.log(k.decr(k.encr(test)));
	*/
};
