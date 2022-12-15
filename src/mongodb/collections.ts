import {Collection, Db} from "mongodb"
import {News} from "../api/news/news-models"

// region main
export const ID_COUNTER_COLLECTION = "ids"
export let idCounterCollection: Collection<{ _id: string, id_num: number }>
export const NEWS_COLLECTION = "news"
export let newsCollection: Collection<News>

// endregion

export async function init(db: Db) {

  const ps = [
    db.createCollection(ID_COUNTER_COLLECTION)
      .then(async c => {
        idCounterCollection = c
      }),
    db.createCollection(NEWS_COLLECTION)
      .then(async c => {
        newsCollection = c
      })
  ]
  await Promise.all(ps)
}
