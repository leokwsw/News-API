import error = require("./httpError")
import * as express from "express";
const check = function (req: express.Request, params: string[], bodys: string[], next: express.NextFunction) {
  const missedP = []
  const missedB = []
  for(const i in bodys){
    if(!req.body.hasOwnProperty(bodys[i]) ){
      console.log(bodys[i])
      missedB.push(bodys[i])
    }
  }

  for(const i in params){
    if(!req.query.hasOwnProperty(params[i])|| req.query[bodys[i]] === ""){
      console.log(params[i])
      missedP.push(params[i])
    }
  }

  let errorMsg = ""
  if(missedB.length > 0 && missedP.length > 0){
    errorMsg = "Param " + missedP.join() + " and Json property" + missedB.join() + " missed."
  }else if(missedP.length > 0){
    errorMsg = "Param " + missedP.join() + " missed."
  }else if(missedB.length > 0){
    errorMsg = "Json property " + missedB.join() + " missed."
  }

  if(errorMsg !== ""){
    error(400, errorMsg, next)
  }
}
export = check
