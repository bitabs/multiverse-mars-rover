import { isNumeric, isObjEmpty } from '@utils'
import { GridProps } from '../grid'
import { isValidDirection, isValidStatus, Position } from './robot.position'
import * as Types from './robot.types'

export class Robot {
  private x: number
  private y: number
  private face: Types.DIRECTION
  private status: Types.STATUS
  private grid: GridProps

  constructor(grid: GridProps, props: Types.RobotProps) {
    // make sure we don't pass empty props
    if (typeof props == 'undefined' || isObjEmpty(props) || !props)
      throw Error(`Must pass correct props to Robot`)

    // convert data to correct typing
    const { x, y, face, status } = this.validate(props)

    this.grid = grid
    this.x = x
    this.y = y
    this.face = face
    this.status = status
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
    const x = this.x
    const y = this.y
    const face = this.face

    // updates the robot to the new position
    const { isValid, robot } = Position({
      robot: [x, y, face],
      grid: this.grid,
      commands,
    })

    this.face = robot[2] // face

    // don't update pos, but set status to lost
    if (!isValid) {
      this.status = Types.STATUS.LOST
    }

    this.x = robot[0] // x
    this.y = robot[1] // y
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
    return this.status
  }

  public toString() {
    if (this.status === Types.STATUS.LOST)
      return `(${this.x}, ${this.y}, ${this.face}) LOST`

    return `(${this.x}, ${this.y}, ${this.face})`
  }
}
