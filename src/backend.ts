import MongoConnector from "./mongodb/mongo-connector"
import cors = require("cors")

const express = require("express")
const app = express()
const http = require("http").createServer(app)
const path = require("path")
const PORT = process.env.PORT || 5000
const apiRouter = require("./api/api")

console.log("API Starts")

let ready = 0

function initFinish() {
  ready++
  if (ready >= 2 && process.send) {
    process.send("ready")
  }
}

MongoConnector.connect().then(initFinish).catch()

const options: cors.CorsOptions = {
  origin: ["*"],
  allowedHeaders: ["X-Requested-With", "Content-Type", "Authorization", "Cache-Control"],
  methods: ["PUT", "POST", "PATCH", "GET", "DELETE", "OPTIONS"]
}

app.use(cors(options))
app.use(express.json())
app.use("/api/", apiRouter)

http.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
  initFinish()
})

process.on("SIGINT", async function () {
  http.close()
  console.log("http service stopped")
  process.exit()
})
