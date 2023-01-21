import { isNumeric, isObjEmpty } from '@utils'
import { isValidDirection, isValidStatus } from './robot.position'
import * as Types from './robot.types'

export class Robot {
  private x: number
  private y: number
  private face: Types.DIRECTION
  private state: Types.StateProps

  constructor(props: Types.RobotProps) {
    // make sure we don't pass empty props
    if (typeof props == 'undefined' || isObjEmpty(props) || !props)
      throw Error(`Must pass correct props to Robot`)

    // convert data to correct typing
    const { x, y, face, status } = this.validate(props)

    // getter accessors
    this.x = x
    this.y = y
    this.face = face

    // keep track of current robot state
    this.state = { x, y, face, status }
  }

  private validate({ x, y, face, status }: Types.RobotProps) {
    if (!isNumeric(x)) throw Error(`Robot's x coordinate '${x}' is not valid`)

    if (!isNumeric(y)) throw Error(`Robot's y coordinate '${y}' is not valid`)

    if (!isValidDirection(face))
      throw Error(`Robot's direction '${face}' is not valid`)

    if (!isValidStatus(status))
      throw Error(`Robot's status '${status}' is not valid`)

    return {
      x: Number(x),
      y: Number(y),
      face,
      status,
    }
  }

  public initiateCommands(commands: string[]) {
    // Not implemented
  }

  public get getX() {
    return this.x
  }

  public get getY() {
    return this.y
  }

  public get getDirection() {
    return this.face
  }

  public get getCurrentStatus() {
    return this.state.status
  }

  private get getState() {
    return this.state
  }

  public toString() {
    const { x, y, face, status } = this.getState

    if (status === Types.STATUS.LOST) return `(${x}, ${y}, ${face}) LOST`

    return `(${x}, ${y}, ${face})`
  }
}
