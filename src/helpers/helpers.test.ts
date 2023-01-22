import {
  transform,
  groupBy,
  extractCoordinates,
  extractRobotsFromInput,
} from './helpers'

describe('[Helpers]', () => {
  describe('groupBy()', () => {
    describe('An empty data', () => {
      test('No condition func is given', () => {
        const data = groupBy<string>([])

        const result: string[] = []

        expect(data).toStrictEqual(result)
      })

      test('Falsy condition func is given', () => {
        const data = groupBy([], () => false)

        const result: string[] = []

        expect(data).toStrictEqual(result)
      })

      test('Truthy condition func is given', () => {
        const data = groupBy([], () => true)

        const result: string[] = []

        expect(data).toStrictEqual(result)
      })
    })

    describe('An array of data', () => {
      test('Data is 3 elements with truthy condition', () => {
        const data = groupBy<string>(['1', '2', '3'], () => true)

        const result: string[][] = [['1', '2', '3']]

        expect(data).toStrictEqual(result)
      })

      test('Splitting data by empty string element', () => {
        const data = groupBy<string>(
          ['1', '2', '3', '', '4', '5', '6'],
          (el) => el !== ''
        )

        const result: string[][] = [
          ['1', '2', '3'],
          ['4', '5', '6'],
        ]

        expect(data).toEqual(result)
      })

      test('Splitting data by pipe char', () => {
        const data = groupBy<string>(
          ['1', '2', '3', '4', '5', '|', '6'],
          (el) => el !== '|'
        )

        const result = [['1', '2', '3', '4', '5'], ['6']]

        expect(data).toEqual(result)
      })

      test('Splitting data by Infinity', () => {
        const data = groupBy<number>(
          [1, 2, 3, Infinity, 6],
          (el) => el !== Infinity
        )

        const result = [[1, 2, 3], [6]]

        expect(data).toEqual(result)
      })
    })
  })

  describe('extractCoordinates()', () => {
    describe('The coordinates', () => {
      test("The format is 'x x'", () => {
        const coords = extractCoordinates('x x')
        expect(coords).toEqual(['x', 'x'])
      })

      test("The format 'x, x'", () => {
        const coords = extractCoordinates('x, x')
        expect(coords).toEqual(['x', 'x'])
      })

      test("The format '{x x}'", () => {
        const coords = extractCoordinates('{x x}')
        expect(coords).toEqual(['x', 'x'])
      })

      test("The format '{x, x}'", () => {
        const coords = extractCoordinates('{x, x}')
        expect(coords).toEqual(['x', 'x'])
      })

      test("The format '(x x)'", () => {
        const coords = extractCoordinates('(x x)')
        expect(coords).toEqual(['x', 'x'])
      })

      test("The format '(x, x)'", () => {
        const coords = extractCoordinates('(x, x)')
        expect(coords).toEqual(['x', 'x'])
      })

      test("The format 'x y z'", () => {
        const coords = extractCoordinates('x y z')
        expect(coords).toEqual(['x', 'y', 'z'])
      })
    })
  })

  describe('extractRobotsFromInput()', () => {
    describe('Robots', () => {
      test('Passing argument as an empty list', () => {
        const failed = () => extractRobotsFromInput([])

        expect(failed).toThrow(
          'Robot must have correct coordinates + instructions'
        )
      })

      test('Not providing robot instructions', () => {
        const failed = () => extractRobotsFromInput(['d'])

        expect(failed).toThrow('Could not extract robots instructions')
      })

      test('Passing coordinates in the wrong format', () => {
        const failed = () => extractRobotsFromInput(['0 0 0 LF'])

        expect(failed).toThrow('Could not extract robots instructions')
      })

      test("Passing argument as '(x, x, x) xxxx' format", () => {
        const robots = extractRobotsFromInput(['(0, 3, E) LDFR'])

        const { coordinates, commands } = robots[0]

        const result = {
          x: '0',
          y: '3',
          face: 'E',
        }

        expect(coordinates).toMatchObject(result)
        expect(commands).toEqual(['L', 'D', 'F', 'R'])
      })

      test("Passing argument as '(x x x) xxxx' format", () => {
        const robots = extractRobotsFromInput(['(0 3 E) LDFR'])

        const { coordinates, commands } = robots[0]

        const result = {
          x: '0',
          y: '3',
          face: 'E',
        }

        expect(coordinates).toMatchObject(result)
        expect(commands).toEqual(['L', 'D', 'F', 'R'])
      })

      test("Passing argument as '(x x x)xxxx' format", () => {
        const robots = extractRobotsFromInput(['(0 3 E)LDFR'])

        const { coordinates, commands } = robots[0]

        const result = {
          x: '0',
          y: '3',
          face: 'E',
        }

        expect(coordinates).toMatchObject(result)
        expect(commands).toEqual(['L', 'D', 'F', 'R'])
      })
    })
  })

  describe('transform()', () => {
    describe('Grids', () => {
      test('No arguments are provided', () => {
        expect(transform).toThrowError(Error)
      })

      test('There is no grid', () => {
        const failed = () => transform([''])

        expect(failed).toThrow('Data is either not an array or in wrong format')
      })

      test('The grid is 4x3 with 1 robot (3 3 E) LF', () => {
        const { grid, robots } = transform(['4 3', '(3 3 E) LF'])

        expect(grid).toEqual(['4', '3'])
        expect(robots).toStrictEqual([
          {
            coordinates: {
              x: '3',
              y: '3',
              face: 'E',
            },
            commands: ['L', 'F'],
          },
        ])
      })
    })
  })
})
