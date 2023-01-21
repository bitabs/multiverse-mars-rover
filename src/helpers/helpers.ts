export const extractCoordinates = (str: string) =>
  str
    .replace(/[{()}]/g, '') // removes parenthesis
    .split(/[ ,]+/) // splits by either space or comma

/**
 * Will split source array by given condition
 * @param rawData - array of data
 * @param fn - condition to partition against
 * @returns
 */
export function groupBy<T>(
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

export function extractGridFromInput(str: string) {
  const grid = extractCoordinates(str)

  return grid
}

interface RobotDTO {
  coordinates: {
    x: string
    y: string
    face: string
  }
  commands: string[]
}

export function extractRobotsFromInput(data: string[]) {
  const robots: RobotDTO[] = []

  if (data.length < 1)
    throw Error('Robot must have correct coordinates + instructions')

  for (let i = 0; i < data.length; i++) {
    const robot = data[i].match(/^\((.*?)\)|([a-zA-Z]+)$/g)

    if (robot) {
      const [coords, instructions] = robot

      if (typeof instructions == 'undefined')
        throw Error('Could not extract robots instructions')

      const [x, y, face] = extractCoordinates(coords)

      robots.push({
        coordinates: { x, y, face },
        commands: instructions.split(''),
      })
    }
  }

  return robots
}

export function transform(data: string[]) {
  if (!Array.isArray(data) || data.length < 2)
    throw Error('Data is either not an array or in wrong format')

  // initially all in raw strings
  const [rawGrid, ...rawRobots] = data

  const grid = extractGridFromInput(rawGrid)

  // Runs in O(m). i.e. m number of robots
  const robots = extractRobotsFromInput(rawRobots)

  return { grid, robots }
}
