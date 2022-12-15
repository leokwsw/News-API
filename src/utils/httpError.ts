import * as express from "express"
const throwHTTP = function (code: number, msg: String, next: express.NextFunction) {
  const error = {}
  error['code'] = code
  error['message'] = msg
  next(error)
  throw error
}
export = throwHTTP
