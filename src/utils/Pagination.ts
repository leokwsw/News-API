import {Dict} from "./dict"
import {isEmpty, toNumber} from "./misc"

export class Pagination {
  skip: number = 0
  limit: number = 10
  count: boolean = false

  constructor(skip: number = 0, limit: number = 10) {
    this.skip = skip
    this.limit = limit
  }

  static from(req: any, defaultSkip: number = 0, defaultLimit: number = 10): Pagination {
    const p = new Pagination(defaultSkip, defaultLimit)
    const query: Dict<any> = req.query

    if (!isEmpty(query.limit))
      p.limit = toNumber(query.limit, defaultLimit)
    else if (!isEmpty(query.number))
      p.limit = toNumber(query.number, defaultLimit)

    p.skip = toNumber(query.skip) || toNumber(query.from) || defaultSkip

    p.count = query.count
    return p
  }
}
