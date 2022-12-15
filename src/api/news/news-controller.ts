import newsService = require("./news-services")
import express = require("express")
import check = require("../../utils/checkQuery")
import {Pagination} from "../../utils/Pagination"

export const router = express.Router()

// new news
router.post("/news", async (req, res, next) => {
  check(req, [], ["type", "title", "content", "start", "end", "active", "images"], next)

  const json = await newsService.newNews(req.body)
  res.json({news_id: json})
})

// edit news
router.patch("/news/:news_id", async (req, res, next) => {
  check(req, [], ["type", "title", "content", "start", "end", "active", "images"], next)

  const json = await newsService.editNews(req.params.news_id, req.body)
  res.json(json)
})

// delete news
router.delete("/news/:news_id", async (req, res, next) => {
  check(req, [], [], next)

  const json = await newsService.deleteNews(req.params.news_id)
  res.json(json)
})

// get news
router.get("/news", async (req, res, _) => {
  const pagination = Pagination.from(req)

  const type = req.query.type
  let typeStr = undefined

  if (typeof type == "undefined") {
    typeStr = undefined
  } else if (typeof type == "string") {
    typeStr = type
  }


  const json = await newsService.getNews(typeStr, pagination)
  res.json({news: json})
})

// get one news
router.get("/news/:news_id", async (req, res, _) => {
  const json = await newsService.getNewsById(req.params.news_id)
  res.json({news: json})
})
