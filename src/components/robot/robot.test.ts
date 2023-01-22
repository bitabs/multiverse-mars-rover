import { Robot } from './robot'
import {
  isValidCommand,
  isValidDirection,
  isValidStatus,
  move,
  rotate,
} from './robot.position'
import { COMMAND, DIRECTION } from './robot.types'

describe('[Robot]', () => {
  let robot: Robot

  beforeEach(() => {
    robot = new Robot([5, 5], {
      x: '0',
      y: '0',
      face: 'N',
    })
  })

  describe('Robot is initialized', () => {
    describe('Wrong values are passed', () => {
      test('Throw error when passing empty object', () => {
        expect(() => new Robot([0, 0], undefined as any)).toThrow(
          'Must pass correct props to Robot'
        )
      })

      test('Throw error when passing empty object', () => {
        expect(() => new Robot([0, 0], {} as any)).toThrow(
          'Must pass correct props to Robot'
        )
      })

      test("Throw error related to 'x' value", () => {
        const failed = () =>
          new Robot([0, 0], {
            x: 'd',
            y: '0',
            face: 'W',
          })

        expect(failed).toThrow("Robot's x coordinate 'd' is not valid")
      })

      test("Throw error related to 'y' value", () => {
        const failed = () =>
          new Robot([0, 0], {
            x: '0',
            y: 'bar',
            face: 'W',
          })

        expect(failed).toThrow("Robot's y coordinate 'bar' is not valid")
      })

      test("Throw error related to 'face' value", () => {
        const failed = () =>
          new Robot([0, 0], {
            x: '0',
            y: '0',
            face: 'foo',
          })

        expect(failed).toThrow("Robot's direction 'foo' is not valid")
      })

      test("Throw error related to 'status' value", () => {
        const failed = () =>
          new Robot([0, 0], {
            x: '0',
            y: '0',
            face: 'W',
            status: 'WRONG',
          })

        expect(failed).toThrow("Robot's status 'WRONG' is not valid")
      })
    })

    describe('Correct values are passed', () => {
      test('Set the (x, y) as (0, 0, N)', () => {
        expect(robot.getX).toBe(0)
        expect(robot.getY).toBe(0)
        expect(robot.getDirection).toBe('N')
      })

      test('Set the Status of robot as (1, 1, W) LOST', () => {
        robot = new Robot([0, 0], {
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
        robot = new Robot([0, 0], {
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

  describe('isValidDirection()', () => {
    test("Passing 'FOO' direction", () => {
      const isValid = isValidDirection('FOO')

      expect(isValid).toBe(false)
    })

    test("Passing 'undefined' direction", () => {
      const isValid = isValidDirection(undefined)

      expect(isValid).toBe(false)
    })

    test("Passing '1' direction", () => {
      const isValid = isValidDirection(1)

      expect(isValid).toBe(false)
    })

    test("Passing 'N' direction", () => {
      const isValid = isValidDirection('N')

      expect(isValid).toBe(true)
    })

    test("Passing 'E' direction", () => {
      const isValid = isValidDirection('E')

      expect(isValid).toBe(true)
    })

    test("Passing 'S' direction", () => {
      const isValid = isValidDirection('S')

      expect(isValid).toBe(true)
    })

    test("Passing 'W' direction", () => {
      const isValid = isValidDirection('W')

      expect(isValid).toBe(true)
    })

    test("Passing 'N' direction", () => {
      const isValid = isValidDirection('N')

      expect(isValid).toBe(true)
    })
  })

  describe('isValidStatus()', () => {
    test("Passing 'undefined' status", () => {
      // you can optionally pass 'status' prop to robot.
      // this is still valid
      const isValid = isValidStatus(undefined)

      expect(isValid).toBe(true)
    })

    test("Passing '' status", () => {
      const isValid = isValidStatus('')

      expect(isValid).toBe(false)
    })

    test("Passing 'FOO' status", () => {
      const isValid = isValidStatus('FOO')

      expect(isValid).toBe(false)
    })

    test("Passing 'L' status", () => {
      const isValid = isValidStatus('L')

      expect(isValid).toBe(false)
    })

    test("Passing 'LOST' status", () => {
      const isValid = isValidStatus('LOST')

      expect(isValid).toBe(true)
    })
  })

  describe('isValidCommand()', () => {
    test("Passing 'undefined' command", () => {
      const isValid = isValidCommand(undefined)

      expect(isValid).toBe(false)
    })

    test("Passing 'FOO' command", () => {
      const isValid = isValidCommand('FOO')

      expect(isValid).toBe(false)
    })

    test("Passing '[]' command", () => {
      const isValid = isValidCommand([])

      expect(isValid).toBe(false)
    })

    test("Passing 'F' command", () => {
      const isValid = isValidCommand('F')

      expect(isValid).toBe(true)
    })

    test("Passing 'R' command", () => {
      const isValid = isValidCommand('R')

      expect(isValid).toBe(true)
    })

    test("Passing 'L' command", () => {
      const isValid = isValidCommand('L')

      expect(isValid).toBe(true)
    })

    // We could support robot to go back
    test.skip("Passing 'B' command", () => {
      const isValid = isValidCommand('B')

      expect(isValid).toBe(true)
    })
  })

  describe('rotate()', () => {
    test("Passing 'R' rotation", () => {
      const [, , face] = rotate([0, 0, DIRECTION.North], COMMAND.R)

      expect(face).toBe(DIRECTION.East)
    })

    test("Passing 'L' rotation", () => {
      const [, , face] = rotate([0, 0, DIRECTION.North], COMMAND.L)

      expect(face).toBe(DIRECTION.West)
    })

    test("Passing 'F' rotation", () => {
      const [, , face] = rotate([0, 0, DIRECTION.North], COMMAND.F)

      expect(face).toBe(DIRECTION.North)
    })
  })

  describe('move()', () => {
    test('Moving 1 position in northerly direction', () => {
      const [x, y, face] = move([0, 0, DIRECTION.North])

      expect([x, y, face]).toStrictEqual([0, 1, DIRECTION.North])
    })

    test('Moving 1 position in easterly direction', () => {
      const [x, y, face] = move([0, 0, DIRECTION.East])

      expect([x, y, face]).toStrictEqual([1, 0, DIRECTION.East])
    })

    test('Moving 1 position in southerly direction', () => {
      const [x, y, face] = move([0, 0, DIRECTION.South])

      expect([x, y, face]).toStrictEqual([0, -1, DIRECTION.South])
    })

    test('Moving 1 position in westerly direction', () => {
      const [x, y, face] = move([0, 0, DIRECTION.West])

      expect([x, y, face]).toStrictEqual([-1, 0, DIRECTION.West])
    })
  })

  describe('Command', () => {
    test('Initiating without any command', () => {
      const failed = () => robot.initiateCommands([])

      expect(failed).toThrow('Command is empty - Aborting!')
    })

    test("Initiating with ''", () => {
      const failed = () => robot.initiateCommands([''])

      expect(failed).toThrow("Command '' is not supported")
    })

    test("Initiating with 'Q'", () => {
      const failed = () => robot.initiateCommands(['Q'])

      expect(failed).toThrow("Command 'Q' is not supported")
    })

    test("Initiating with 'F' to move forward", () => {
      robot.initiateCommands(['F'])

      const position = robot.toString()

      expect(position).toBe('(0, 1, N)')
    })

    test("Initiating with 'R' to rotate 90° right", () => {
      robot.initiateCommands(['R'])

      const position = robot.toString()

      expect(position).toBe('(0, 0, E)')
    })

    test("Initiating with 'L' to rotate 90° left", () => {
      robot.initiateCommands(['L'])

      const position = robot.toString()

      expect(position).toBe('(0, 0, W)')
    })

    test("Initiating with 'FRF'", () => {
      robot.initiateCommands(['F', 'R', 'F'])

      const position = robot.toString()

      expect(position).toBe('(1, 1, E)')
    })

    test("Initiating with 'LF'", () => {
      robot.initiateCommands(['L', 'F'])

      const position = robot.toString()

      expect(position).toBe('(0, 0, W) LOST')
    })

    test("Initiating with 'LLF'", () => {
      robot.initiateCommands(['L', 'L', 'F'])

      const position = robot.toString()

      expect(position).toBe('(0, 0, S) LOST')
    })

    test("Initiating with 'F'", () => {
      robot = new Robot([5, 5], {
        x: '5',
        y: '5',
        face: 'N',
      })

      robot.initiateCommands(['F'])

      const position = robot.toString()

      expect(position).toBe('(5, 5, N) LOST')
    })

    test("Initiating with 'B'", () => {
      robot = new Robot([5, 5], {
        x: '5',
        y: '5',
        face: 'N',
      })

      robot.initiateCommands(['B'])

      const position = robot.toString()

      expect(position).toBe('(5, 4, N)')
    })

    test("Initiating with 'FFLFRFF'", () => {
      robot = new Robot([4, 8], {
        x: '0',
        y: '2',
        face: 'N',
      })

      robot.initiateCommands(['F', 'F', 'L', 'F', 'R', 'F', 'F'])

      const position = robot.toString()

      expect(position).toBe('(0, 4, W) LOST')
    })

    test("Initiating with 'FLLFR'", () => {
      robot = new Robot([4, 8], {
        x: '2',
        y: '3',
        face: 'N',
      })

      robot.initiateCommands(['F', 'L', 'L', 'F', 'R'])

      const position = robot.toString()

      expect(position).toBe('(2, 3, W)')
    })

    test("Initiating with 'FFRLF'", () => {
      robot = new Robot([4, 8], {
        x: '1',
        y: '0',
        face: 'S',
      })

      robot.initiateCommands(['F', 'F', 'R', 'L', 'F'])

      const position = robot.toString()

      expect(position).toBe('(1, 0, S) LOST')
    })
  })
})
