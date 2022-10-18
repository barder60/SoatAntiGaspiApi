const jwt = require('jsonwebtoken')

require('dotenv').config()
const privateKey = process.env.PRIVATEKEY


import { Request, Response, NextFunction } from 'express';


module.exports = (req:Request, res:Response, next:NextFunction) => {
  const authorizationHeader = req.headers.authorization
  if (!authorizationHeader) {
    // req.user = { role: 'anonymous' }
    return next();
  }
  const [, token] = authorizationHeader.split(' ')
  const decodedToken = jwt.verify(token, privateKey, (error:any, decodedToken:string) => {
    if (error) {
      let returnedJsonError:any = {};
      switch (true) {
        case /jwt expired/i.test(error.message):
          returnedJsonError.message = 'Your session expired.';
          break;
        default:
          returnedJsonError.message = 'The user is not authorized to access this resource.`';
          returnedJsonError.data = error
          break;
      }
      return res.status(401).json(returnedJsonError)
    }
    // req.user = decodedToken
    next()
  })
}