

const database = require('./datahandler');
const validateToken = require("./sbToken").validate;

const authenticator = async (req, res, next) => {
    if(!req.body.authToken || !req.body.user){
      return res.status(403).json("invalid token").end();
    }
    
    let user = {
        username: req.body.user,
        //password: '6179f1da72b2f5c466c25652eff2ebf46bca54c4a4d43ccc0ba120f8e56ddc92',
        isValid: true
      }

      let token = {"authToken": req.body.authToken}
    
    let resp = validateToken(token, user);
    console.log(resp)
    if (!resp) {
        return res.status(403).json("token invalid").end();
    }
    next();
}

/*const authenticator = (req, res, next) => {
  if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
      return res.append("WWW-Authenticate", 'Basic realm="User Visible Realm", charset="UTF-8"').status(401).end()
  }

  const credentials = req.headers.authorization.split(' ')[1];
  const [username, password] = Buffer.from(credentials, 'base64').toString('UTF-8').split(":");

  const user = authenticate(username, password)
  if (!user) {
      return res.status(403).end()
  }
  req.user = user;
  next();
}*/


module.exports = authenticator