import {Db, MongoClient} from "mongodb"
import collections = require("./collections")

export let client: MongoClient
export let db: Db

export async function connect(): Promise<MongoClient> {
  let dbStr = "News"
  if (db === undefined) {
    client = await MongoClient.connect("mongodb://127.0.0.1:27017", {
      useNewUrlParser: true,
      poolSize: 10,
      useUnifiedTopology: true
    })

    db = client.db(dbStr)
    await collections.init(db)
  }
  return client
}

export default {connect}
