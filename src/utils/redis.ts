import redis = require("redis")
import bluebird = require("bluebird")
import {RedisClient} from "redis"

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

export interface RedisClientAsync extends RedisClient {
  // setAsync: (key: string, value: string) => Promise<void>
  /**
   * @see https://redis.io/commands/set
   */
  setAsync: (key: string, value: string, mode?: string, duration?: number) => Promise<string> // 'OK'
  getAsync: (key: string) => Promise<string>
  delAsync: (key: string) => Promise<void>
  flushallAsync: () => Promise<void>
}

export const redisClient: RedisClientAsync = redis.createClient() as RedisClientAsync

export function createRedisClient() {
  return redis.createClient()
}

let sub: RedisClient

export function redisSubClient() {
  if (!sub)
    sub = redis.createClient()
  return sub
}

let pub: RedisClient

export function redisPubClient() {
  if (!pub)
    pub = redis.createClient()
  return pub
}

export async function redisSet(key: string, value: any, mode?: string, duration?: number) {
  if (mode)
    await redisClient.setAsync(key, value.toString(), mode, duration)
  else
    await redisClient.setAsync(key, value.toString())
}

export async function redisGet(key: string): Promise<string> {
  return await redisClient.getAsync(key)
}

export async function redisDel(key: string) {
  await redisClient.delAsync(key)
}
