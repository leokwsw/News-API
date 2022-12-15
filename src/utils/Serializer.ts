class Serializer {
  static toInstanceFlat<T>(obj: T, jsonObj: object) : T {
    for (const propName in obj) {
      const type = typeof obj[propName]
      const key: string = propName
      if (type !== "object" && jsonObj[key] !== undefined){
        if(type !== typeof jsonObj[key])
          throw {code: 400, message: key + " should be in type " + type + ", current type is " + typeof jsonObj[key]}
        obj[propName] = jsonObj[key]
      }
    }

    return obj;
  }
  static toInstance<T>(obj: T, jsonObj: object) : T {
    for (const propName in obj) {
      const type = typeof obj[propName]
      const key: string = propName
      if (jsonObj[key] !== undefined){
        if(type !== typeof jsonObj[key])
          throw {code: 400, message: key + " should be in type " + type + ", current type is " + typeof jsonObj[key]}
        obj[propName] = jsonObj[key]
      }
    }

    return obj;
  }
  static toInstanceForce<T>(obj: T, jsonObj: object) : T {
    for (const propName in obj) {
      const key: string = propName
      if (jsonObj[key] !== undefined){
        obj[propName] = jsonObj[key]
      }
    }

    return obj;
  }
}

export = Serializer
