import redlock from "./red-lock"
import {isEmpty, pad} from "./misc"
import {idCounterCollection} from "../mongodb/collections"
import redis = require("./redis")


function lockResource(path: string[]): string {
  return "lock:" + toKey(path)
}

function toKey(path: string[]): string {
  return path.join(":")
}

export async function getNextIdNum(path: string[]): Promise<number> {
  const key = toKey(path)
  let idNum: number

  const lock = await redlock.lock(lockResource(path), 500)

  idNum = parseInt(await redis.redisGet(key), 10)

  if (isEmpty(idNum) || isNaN(idNum)) {
    const mongoResult = await idCounterCollection.findOne({_id: key})
    if (isEmpty(mongoResult)) {
      idNum = 0
    } else {
      idNum = mongoResult.id_num
    }
    await redis.redisSet(key, idNum)
  }
  await lock.unlock()
  idNum += 1
  return idNum
}

export async function saveIdNum(path: string[], idNum: number): Promise<void> {
  const key = toKey(path)
  const lock = await redlock.lock(lockResource(path), 1000)
  await redis.redisSet(key, idNum)
  await idCounterCollection.updateOne({"_id": key}, {$set: {id_num: idNum}}, {upsert: true})
  // await ref.set(idNum);
  await lock.unlock()
}

export function numToId(path: string[], idNum, digits): string {
  if (path === undefined || path.length === 0)
    return ""

  const prefix = path[path.length - 1]

  return prefix + pad(idNum, digits)
}
