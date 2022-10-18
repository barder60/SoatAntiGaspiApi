const jwt = require("jsonwebtoken");
require('dotenv').config()
const privateKey = process.env.PRIVATEKEY

module.exports = {
  getToken: (data: any) => {
    let token = "";
    for (const key of Object.keys(data)) {
      const value = data[key];
      switch (true) {
        case /username/i.test(key):
            token = jwt.sign(data, privateKey, { expiresIn: 60 * 60 * 24 * 7 });
          break;
        default:
          break;
      }
    }
    return token;
  },
  decodeToken: (token:string) => {
    return jwt.verify(token, privateKey, (error:any, decodedToken:string) => {
      if (error) return new Error(error.message);
      return decodedToken;
    });
  },
  refresh: (token:string, options = {}) => {
    const payload = jwt.verify(token, privateKey);

    if (Date.now() <= payload.exp * 1000) {
      delete payload.iat;
      delete payload.exp;

      for (const key of Object.keys(payload)) {
        const value = payload[key];
        switch (true) {
          case /username/i.test(key):
              return jwt.sign(payload, privateKey, { expiresIn: 60 * 60 * 24 * 7 });
            break;
          default:
            break;
        }
      }
    }

    return false
  },
};