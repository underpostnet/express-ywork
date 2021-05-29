var crypto = require('crypto');

var algorithm = 'aes-256-ctr';
// const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
// var iv = crypto.randomBytes(16);

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

/*module.exports = {
    encrypt,
    decrypt
};*/
