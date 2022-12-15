import {redisClient} from "./redis"
import RedLock = require("redlock")

export default new RedLock([redisClient], {})
