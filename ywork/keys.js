
var SHA256 = require('crypto-js/sha256');
//  SHA256(str).toString();

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

var encryptStringWithRsaPublicKey = function(toEncrypt, relativeOrAbsolutePathToPublicKey) {
    var absolutePath = path.resolve(relativeOrAbsolutePathToPublicKey);
    var publicKey = fs.readFileSync(absolutePath, "utf8");
    var buffer = Buffer.from(toEncrypt);
    var encrypted = crypto.publicEncrypt(publicKey, buffer);
    return encrypted.toString("base64");
};

var decryptStringWithRsaPrivateKey = function(toDecrypt, relativeOrAbsolutePathtoPrivateKey, passphrase) {
    var absolutePath = path.resolve(relativeOrAbsolutePathtoPrivateKey);
    var privateKey = fs.readFileSync(absolutePath, "utf8");
    var buffer = Buffer.from(toDecrypt, "base64");
    const decrypted = crypto.privateDecrypt(
        {
            key: privateKey.toString(),
            passphrase: passphrase,
        },
        buffer,
    )
    return decrypted.toString("utf8");
};

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

var encryptStringWithRsaPrivateKey = function(toEncrypt, relativeOrAbsolutePathToPrivateKey, passphrase) {
    var absolutePath = path.resolve(relativeOrAbsolutePathToPrivateKey);
    var privateKey = fs.readFileSync(absolutePath, "utf8");
    var buffer = Buffer.from(toEncrypt);
    var encrypted = crypto.privateEncrypt({
        key: privateKey.toString(),
        passphrase: passphrase,
    }, buffer);
    return encrypted.toString("base64");
};

var decryptStringWithRsaPublicKey = function(toDecrypt, relativeOrAbsolutePathtoPublicKey) {
    var absolutePath = path.resolve(relativeOrAbsolutePathtoPublicKey);
    var publicKey = fs.readFileSync(absolutePath, "utf8");
    var buffer = Buffer.from(toDecrypt, "base64");
    const decrypted = crypto.publicDecrypt(publicKey, buffer);
    return decrypted.toString("utf8");
};

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

var pathPublicKey = data.dataPath+'/keys/'+data.keys.current_key+'/public.pem';

var pathPrivateKey = data.dataPath+'/keys/'+data.keys.current_key+'/private.pem';

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

function testKeys(content){

  let encrTest;
  let decrTest;

  encrTest = encryptStringWithRsaPublicKey(JSONstr({content: content}), pathPublicKey);
  decrTest = decryptStringWithRsaPrivateKey(encrTest, pathPrivateKey, data.keys.key_pass);
  log('warn', 'test keys system encr public ->');
  log('warn', decrTest);
  encrTest = encryptStringWithRsaPrivateKey(JSONstr({content: content}), pathPrivateKey, data.keys.key_pass);
  decrTest = decryptStringWithRsaPublicKey(encrTest, pathPublicKey);
  log('warn', 'test keys system encr private ->');
  log('warn', decrTest);

}

testKeys("test");


//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

// https://stackoverflow.com/questions/58740109/error0409a06ersa-routines-data-too-large-for-key-size

function signData(content){
  let formData = JSONstr({
    date: new Date().getTime(),
    data: k.encr(JSONstr(content))
  });
  let sendMsg = JSONstr({
    doc: formData,
    sign: encryptStringWithRsaPrivateKey(
      SHA256(formData).toString(),
      pathPrivateKey,
      data.keys.key_pass
    )
  });
  verifyData(sendMsg);
  return sendMsg;
}

function verifyData(content){
  let test = JSON.parse(content);
  if(
    SHA256(test.doc).toString()
    ==
    decryptStringWithRsaPublicKey(test.sign, pathPublicKey)
  ){
    log('progress','success verify data -> date:'+JSON.parse(test.doc).date);
    console.log(k.decr(JSON.parse(test.doc).data));
    return true;
  }else{
    log('error','error verify data -> date:'+JSON.parse(test.doc).date);
    console.log(k.decr(JSON.parse(test.doc).data));
    return false;
  }
}

function logSingleData(test, id, attr){
  /* logSingleData(test, 0, "username"); */
  console.log(  k.decr(JSON.parse(k.decr(JSON.parse(test.doc).data))[id][attr])  );
}

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
