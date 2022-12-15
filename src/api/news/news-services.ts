import {dateStr} from "../../utils/timestamp"
import {News, NewsEdit} from "./news-models"
import {newsCollection} from "../../mongodb/collections"
import redLock from "../../utils/red-lock"
import {getNextIdNum, numToId, saveIdNum} from "../../utils/next-id"
import {Pagination} from "../../utils/Pagination"
import Serializer = require("../../utils/Serializer")

export async function newNews(body: object): Promise<String> {
  const d = new Date()
  const date = dateStr(d)
  const now = d.getTime()

  const news: News = Serializer.toInstanceFlat(new News(), body);
  news.created_date = date
  news.created = now

  const lock = await redLock.lock("lock:create-news", 2000)
  const idPath = ["News", "NID-"]
  const idNum = await getNextIdNum(idPath)
  news._id = numToId(idPath, idNum, 8)

  await newsCollection.insertOne(news)

  await saveIdNum(idPath, idNum)
  await lock.unlock()
  return news._id
}

export async function editNews(newId: string, body: object): Promise<{ success: boolean }> {
  await getNewsById(newId)
  const news: NewsEdit = Serializer.toInstanceFlat(new NewsEdit(), body);
  await newsCollection.updateOne(
    {_id: newId},
    {$set: news}
  )
  return {success: true}
}

export async function deleteNews(newId: string): Promise<{ success: boolean }> {
  await newsCollection.deleteOne({_id: newId})

  return {success: true}
}

export async function getNews(type: undefined | string, p: Pagination): Promise<News[]> {
  const query: { [key: string]: any } = {}
  if (type !== undefined) query["type"] = type
  return await newsCollection
    .find(query)
    .sort([["created", -1]])
    .limit(p.limit)
    .toArray()
}

export async function getNewsById(newsId: string): Promise<News> {
  const news: News | null = await newsCollection.findOne({_id: newsId})
  if (!news) throw {code: 404, message: "News not found"}
  return news
}


