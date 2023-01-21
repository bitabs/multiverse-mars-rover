export const enum STATUS {
  LOST = 'LOST',
}

export const enum DIRECTION {
  North = 'N',
  East = 'E',
  South = 'S',
  West = 'W',
}

export const enum COMMAND {
  F = 'F',
  R = 'R',
  L = 'L',
  // TODO: not sure why we don't support back. But I'll add here to discuss with engineers
  B = 'B',
}

export interface RobotProps {
  x: string
  y: string
  face: string
  status?: string
}

export interface StateProps {
  x: number
  y: number
  face: DIRECTION
  status?: STATUS
}
