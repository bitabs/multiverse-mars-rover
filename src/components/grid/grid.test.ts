import { DIRECTION } from '../robot/robot.types'
import { Grid } from './grid'

describe('[Grid]', () => {
  describe('Grid of (-5, -5)', () => {
    // Not supporting inverse grid
    test('Position is inside of grid, i.e. (-1, -1)', () => {
      const { isValid } = Grid([-5, -5], [-1, -1, DIRECTION.North])

      expect(isValid).toBe(false)
    })
  })

  describe('Grid of (5, 5)', () => {
    test('Position is inside of grid, i.e. (0, 0)', () => {
      const { isValid } = Grid([5, 5], [0, 0, DIRECTION.North])

      expect(isValid).toBe(true)
    })

    test('Position is outside of grid, i.e. (4, 17)', () => {
      const { isValid } = Grid([5, 5], [4, 17, DIRECTION.North])

      expect(isValid).toBe(false)
    })

    test('Position is outside of grid, i.e. (-1, 0)', () => {
      const { isValid } = Grid([5, 5], [-1, 0, DIRECTION.North])

      expect(isValid).toBe(false)
    })

    test('Position is inside of grid, i.e. (-0, 0)', () => {
      const { isValid } = Grid([5, 5], [-0, 0, DIRECTION.North])

      expect(isValid).toBe(true)
    })

    test('Position is inside of grid (0, 0), i.e. (0, 0)', () => {
      const { isValid } = Grid([0, 0], [0, 0, DIRECTION.North])

      expect(isValid).toBe(true)
    })
  })
})
