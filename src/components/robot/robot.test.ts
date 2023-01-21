import { Robot } from './robot'

describe('[Robot]', () => {
  let robot: Robot

  beforeEach(() => {
    robot = new Robot({
      x: '0',
      y: '0',
      face: 'W',
    })
  })

  describe('Robot is initialized', () => {
    describe('Wrong values are passed', () => {
      test('Throw error when passing empty object', () => {
        expect(() => new Robot(undefined as any)).toThrow(
          'Must pass correct props to Robot'
        )
      })

      test('Throw error when passing empty object', () => {
        expect(() => new Robot({} as any)).toThrow(
          'Must pass correct props to Robot'
        )
      })

      test("Throw error related to 'x' value", () => {
        expect(
          () =>
            new Robot({
              x: 'd',
              y: '0',
              face: 'W',
            })
        ).toThrow("Robot's x coordinate 'd' is not valid")
      })

      test("Throw error related to 'y' value", () => {
        expect(
          () =>
            new Robot({
              x: '0',
              y: 'bar',
              face: 'W',
            })
        ).toThrow("Robot's y coordinate 'bar' is not valid")
      })

      test("Throw error related to 'face' value", () => {
        expect(
          () =>
            new Robot({
              x: '0',
              y: '0',
              face: 'foo',
            })
        ).toThrow("Robot's direction 'foo' is not valid")
      })

      test("Throw error related to 'status' value", () => {
        expect(
          () =>
            new Robot({
              x: '0',
              y: '0',
              face: 'W',
              status: 'WRONG',
            })
        ).toThrow("Robot's status 'WRONG' is not valid")
      })
    })

    describe('Correct values are passed', () => {
      test('Set the (x, y) as (0, 0, W)', () => {
        expect(robot.getX).toBe(0)
        expect(robot.getY).toBe(0)
        expect(robot.getDirection).toBe('W')
      })

      test('Set the Status of robot as (1, 1, W) LOST', () => {
        robot = new Robot({
          x: '1',
          y: '1',
          face: 'W',
          status: 'LOST',
        })

        expect(robot.getX).toBe(1)
        expect(robot.getY).toBe(1)
        expect(robot.getDirection).toBe('W')
        expect(robot.getCurrentStatus).toBe('LOST')
      })

      test('Set the Status of robot as (-10, -10, W)', () => {
        robot = new Robot({
          x: '-10',
          y: '-10',
          face: 'W',
        })

        expect(robot.getX).toBe(-10)
        expect(robot.getY).toBe(-10)
        expect(robot.getDirection).toBe('W')
      })
    })
  })
})
