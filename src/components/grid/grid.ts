import type { PositionProps } from '../robot/robot.types'
import { isInGrid } from './grid.validate'

export type GridProps = [number, number]

export function Grid(grid: GridProps, robot: PositionProps['robot']) {
  const [x, y] = robot

  let isInside = isInGrid(grid, robot)

  const isValid = [isInside].every(Boolean) // this checks if the robot is inside

  return { isValid }
}
