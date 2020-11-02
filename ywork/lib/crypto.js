let CryptoJS = require("crypto-js");
let key = data.db.key;

function encr(content){
	return CryptoJS.AES.encrypt(content, key).toString();
}

function decr(content){
	let bytes  = CryptoJS.AES.decrypt(content, key);
	return  bytes.toString(CryptoJS.enc.Utf8);
}
