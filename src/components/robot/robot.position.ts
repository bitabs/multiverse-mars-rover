import { DIRECTION, STATUS } from './robot.types'

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
