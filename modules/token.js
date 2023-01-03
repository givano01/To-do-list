const user = require("./user.js");
const crypto = require('crypto');
const secretKey = process.env.tokenSecret || require("../localenv").tokenSecret;

const algorithm = 'aes-256-ctr';
const iv = crypto.randomBytes(16);

let d = new Date();
const dateNow = Date.now();
const validToDate = d.setDate(d.getDate() + 1);

function createToken(user) {
    let body = { "created": dateNow, "user": JSON.stringify(user), "validTo": validToDate };
    let cipher = crypto.createCipheriv(algorithm, (secretKey), iv);
    let encrypted = cipher.update(JSON.stringify(body));

    // ------------ Converts body in to one string for token ------------- //
    
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    // ----------- Creates token from buffer ---------- // 

    let ivString = iv.toString("hex");
    let encryptedDataString = encrypted.toString('hex');          

    // ------------- Returns token to user ---------------- //

    let token = { "authToken": `${ivString}.${encryptedDataString}` };
    return token;
    
}

function validateToken(token, user) {

    let isTokenValid = false;

    const splitToken = token.authToken.split(".");

    let tIV = splitToken[0];
    let tEncryptedData = splitToken[1];

    if(splitToken.length > 2) {
        return isTokenValid;
    } else if(tIV.length !== 32) {
        return isTokenValid;
    } else if(tEncryptedData.length < 356 || tEncryptedData > 394) {
        return isTokenValid;
    } else {

        let iv = Buffer.from(tIV, 'hex');
        let encryptedToken = Buffer.from(tEncryptedData, 'hex');
        let decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), iv);
        let decrypted = decipher.update(encryptedToken);
        decrypted = Buffer.concat([decrypted, decipher.final()]);

        let tokenText = decrypted.toString();

        let expirationDate = JSON.parse(tokenText).validTo;
        let userInfo = JSON.parse(tokenText).user;
        userInfo = JSON.parse(userInfo);

        if(dateNow > expirationDate) {
            return isTokenValid;
        } else if(user.username !== userInfo.username) {
            return isTokenValid;
        
        } else {
            isTokenValid = true;
        }
    }
        
    return isTokenValid;

}


module.exports.create = createToken;
module.exports.validate = validateToken;