/**
 * Will split source array by given condition
 * @param rawData - array of data
 * @param fn - condition to partition against
 * @returns
 */
export function transform<T>(
  rawData: T[],
  condition?: (e: T) => boolean
): Array<T[]> {
  let result: T[][] = []
  let group: T[] = []

  if (rawData.length < 2) return result

  for (let i = 0; i < rawData.length; i++) {
    if (condition && condition(rawData[i])) {
      group.push(rawData[i])
    } else {
      if (group.length > 0) {
        result.push(group)
        group = []
      }
    }
  }

  if (group.length > 0) {
    result.push(group)
  }

  return result
}
