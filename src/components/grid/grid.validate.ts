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

// Credit: https://martin-thoma.com/how-to-check-if-a-point-is-inside-a-rectangle/
// Not sure why this isn't working. TODO: Fix to replace above func.
function _isInGrid(props: _GridProps) {
  const ABCD =
    0.5 *
    Math.abs(
      (props.yA - props.yC) * (props.xD - props.xB) +
        (props.yB - props.yD) * (props.xA - props.xC)
    )

  const ABP =
    0.5 *
    Math.abs(
      props.xA * (props.yB - props.yP) +
        props.xB * (props.yP - props.yA) +
        props.xP * (props.yA - props.yB)
    )

  const BCP =
    0.5 *
    Math.abs(
      props.xB * (props.yC - props.yP) +
        props.xC * (props.yP - props.yB) +
        props.xP * (props.yB - props.yC)
    )

  const CDP =
    0.5 *
    Math.abs(
      props.xC * (props.yD - props.yP) +
        props.xD * (props.yP - props.yC) +
        props.xP * (props.yC - props.yD)
    )

  const DAP =
    0.5 *
    Math.abs(
      props.xD * (props.yA - props.yP) +
        props.xA * (props.yP - props.yD) +
        props.xP * (props.yD - props.yA)
    )

  return !(ABCD < ABP + BCP + CDP + DAP)
}
