export class News {
  _id: string = ""
  type: string = ""
  title: string = ""
  content: string = ""
  created_date: string = ""
  created: number = Date.now()
  start: number = 0
  end: number = 0
  active: boolean = true
  images: string[] = []
}

export class NewsEdit {
  type: string = ""
  title: string = ""
  content: string = ""
  start: number = 0
  end: number = 0
  active: boolean = true
  images: string [] = []

}
