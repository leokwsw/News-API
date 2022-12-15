import express = require("express")

const newsController = require("./news/news-controller")
const bodyParser = require("body-parser")
const router = express.Router()

router.use(bodyParser.json({limit: "10mb"}))
router.use(bodyParser.urlencoded({extended: true, limit: "10mb"}))

router.use("/", newsController.router)

router.use(function (req: express.Request, res: express.Response, next: express.NextFunction) {
  next({"code": 404, "message": "Route " + req.method + ": " + req.path + " not found"})
})

module.exports = router

