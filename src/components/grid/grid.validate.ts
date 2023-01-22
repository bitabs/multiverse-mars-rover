import type { PositionProps } from '../robot/robot.types'
import { GridProps } from './grid'

export function isInGrid(grid: GridProps, robot: PositionProps['robot']) {
  const [gridX, gridY] = grid
  const [robotX, robotY] = robot

  return robotX <= gridX && robotX >= 0 && robotY <= gridY && robotY >= 0
}

type _GridProps = {
  xP: number
  yP: number
  xA: number
  yA: number
  xB: number
  yB: number
  xC: number
  yC: number
  xD: number
  yD: number
}
