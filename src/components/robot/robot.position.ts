import { Grid } from '../grid'
import { DIRECTION, PositionProps, STATUS, COMMAND } from './robot.types'

const DIRECTIONS = ['N', 'E', 'S', 'W']

export function isValidDirection(arg: any): arg is DIRECTION {
  return [
    DIRECTION.North,
    DIRECTION.East,
    DIRECTION.South,
    DIRECTION.West,
  ].includes(arg)
}

export function isValidStatus(arg: any): arg is STATUS {
  return (
    typeof arg == 'undefined' ||
    (typeof arg != 'undefined' && arg !== '' && [STATUS.LOST].includes(arg))
  )
}

export function isValidCommand(char: any): char is COMMAND {
  return [COMMAND.F, COMMAND.R, COMMAND.B, COMMAND.L].includes(char)
}

export function rotate(
  robot: [number, number, DIRECTION],
  command: COMMAND
): [number, number, DIRECTION] {
  let [x, y, face] = robot

  const getDirection = (dir: string, pos: number) =>
    DIRECTIONS[(((DIRECTIONS.indexOf(dir) + pos) % 4) + 4) % 4]

  switch (command) {
    case COMMAND.R:
      face = getDirection(face.valueOf(), 1) as DIRECTION
      break
    case COMMAND.L:
      face = getDirection(face.valueOf(), -1) as DIRECTION
      break
    default:
      break
  }

  return [x, y, face]
}

export function move(
  robot: [number, number, DIRECTION],
  command?: COMMAND
): [number, number, DIRECTION] {
  let [x, y, face] = robot

  const commandValue = command === COMMAND.B ? -1 : +1

  switch (face) {
    case DIRECTION.North:
      y = y + commandValue
      break
    case DIRECTION.East:
      x = x + commandValue
      break
    case DIRECTION.South:
      y = y - commandValue
      break
    case DIRECTION.West:
      x = x - commandValue
      break
    default:
      break
  }

  return [x, y, face]
}

export function Position({ commands, grid, robot }: PositionProps) {
  if (commands.length < 1) throw Error(`Command is empty - Aborting!`)

  let cached: PositionProps['robot'] = robot

  let isValid = true

  for (let i = 0; i < commands.length; i++) {
    const command = commands[i]
    let newPosition = cached

    if (!isValidCommand(command)) {
      isValid = false
      throw Error(`Command '${command}' is not supported`)
    }

    switch (command) {
      case COMMAND.R:
        newPosition = rotate(newPosition, COMMAND.R)
        break
      case COMMAND.L:
        newPosition = rotate(newPosition, COMMAND.L)
        break
      case COMMAND.F:
        newPosition = move(newPosition, COMMAND.F)
        break
      case COMMAND.B:
        newPosition = move(newPosition, COMMAND.B)
        break
      default:
        break
    }

    const { isValid: isValidPosition } = Grid(grid, newPosition)

    // break from the loop, and return last valid position
    if (!isValidPosition) {
      isValid = false
      break
    }

    // new position is valid, update our cache
    cached = newPosition
  }

  return { isValid, robot: cached }
}
