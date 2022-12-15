# News API (Express.js + MongoDB + Redis)
---

### Start:

1. Install ```node.js```
2. Copy ```.env.sample``` to ```.env```
3. Change the port number in ```.env```
4. Run ```npm install```
5. Run ```npm start```

---

### API:

| Action        | Method |                   Url                    | Params            | Query                                                                                        | Body                                                                                                                                                               |
|---------------|--------|:----------------------------------------:|-------------------|----------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Create News   | POST   |     http://localhost:5000/api/news/      | null              | null                                                                                         | `json `<br/>` { `<br/>`  type: string`<br/>`  content: string`<br/>`  start: number`<br/>`  end: number`<br/>`  active: boolean`<br/>`  images: string[]`<br/>` }` |
| Edit News     | PATCH  | http://localhost:5000/api/news/{news_id} | news_id : news id | null                                                                                         | `json `<br/>` { `<br/>`  type: string`<br/>`  content: string`<br/>`  start: number`<br/>`  end: number`<br/>`  active: boolean`<br/>`  images: string[]`<br/>` }` |
| Delete News   | DELETE | http://localhost:5000/api/news/{news_id} | news_id : news id | null                                                                                         | null                                                                                                                                                               |
| Get Some News | GET    |     http://localhost:5000/api/news/      | null              | ` json `<br/>` { `<br/>` slip: number `<br/>` limit: number `<br/>` type: string `<br/>` } ` |                                                                                                                                                                    |
| Get One News  | GET    | http://localhost:5000/api/news/{news_id} | null              | null                                                                                         | null                                                                                                                                                               |
