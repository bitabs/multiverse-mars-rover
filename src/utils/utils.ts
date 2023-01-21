export function isLetter(str: string) {
  return str.length === 1 && str.match(/[a-zA-Z]/i)
}

// credit: https://stackoverflow.com/a/175787
export function isNumeric(val: any): val is number {
  if (typeof val != 'string') return false // we only process strings!

  return (
    !isNaN(+val) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(val))
  ) // ...and ensure strings of whitespace fail
}

export function isObjEmpty(obj: any) {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

export const isEnum =
  <T extends ArrayLike<unknown>>(e: T) =>
  (token: any): token is T[keyof T] =>
    Object.values(e).includes(token as T[keyof T])
