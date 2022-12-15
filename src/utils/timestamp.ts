const leadingZero = function (s: number) {
  return [(s > 9 ? "" : "0") + s].join("")
}

export function dateStr(d: Date) {
  const mm = d.getMonth() + 1 // getMonth() is zero-based
  const dd = d.getDate()

  return [d.getFullYear(),
    leadingZero(mm),
    leadingZero(dd),
  ].join("")
}

export function todayStr() {
  return dateStr(new Date())
}

export function fullStr(d: Date) {
  const mm = d.getMonth() + 1 // getMonth() is zero-based
  const dd = d.getDate()
  const hh = d.getHours()
  const min = d.getMinutes()
  const ss = d.getSeconds()

  return [d.getFullYear(),
    leadingZero(mm),
    leadingZero(dd),
    leadingZero(hh),
    leadingZero(min),
    leadingZero(ss)
  ].join("")
}

export function todayFullStr() {
  return fullStr(new Date())
}

export function fullStrH(d: Date) {
  const mm = d.getMonth() + 1 // getMonth() is zero-based
  const dd = d.getDate()
  const hh = d.getHours()
  const min = d.getMinutes()
  const ss = d.getSeconds()

  return [d.getFullYear(), "/",
    leadingZero(mm), "/",
    leadingZero(dd), "-",
    leadingZero(hh), ":",
    leadingZero(min), ":",
    leadingZero(ss)
  ].join("")
}
