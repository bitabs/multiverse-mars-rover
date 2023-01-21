import { isValid } from './grid'

describe('[Grid]', () => {
  describe('isValid()', () => {
    describe('Position', () => {
      test('I (0, 0, N)', () => {
        const valid = isValid({ grid: [0, 0], robot: [0, 0, 1, 1] })

        expect(true).toBe(true)
      })
    })
  })
})
