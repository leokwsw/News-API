export function isEmpty(obj: any): boolean { // == null of js
  return obj === undefined || obj === null
}

export function pad(n: number, width: number, c: string = "0"): string {
  const nStr = n + ""
  return nStr.length >= width ? nStr : new Array(width - nStr.length + 1).join(c) + nStr
}

export function toNumber(data, defaultNumber: number = 0) {
  const n = Number(data)
  return (isNaN(n)) ? defaultNumber : n
}
