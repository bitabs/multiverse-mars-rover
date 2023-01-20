import { transform } from './utils'

describe('[Utils]', () => {
  describe('transform()', () => {
    describe('An empty data', () => {
      test('No condition func is given', () => {
        const data = transform<string>([])

        const result: string[] = []

        expect(data).toStrictEqual(result)
      })

      test('Falsy condition func is given', () => {
        const data = transform([], () => false)

        const result: string[] = []

        expect(data).toStrictEqual(result)
      })

      test('Truthy condition func is given', () => {
        const data = transform([], () => true)

        const result: string[] = []

        expect(data).toStrictEqual(result)
      })
    })

    describe('An array of data', () => {
      test('Data is 3 elements with truthy condition', () => {
        const data = transform<string>(['1', '2', '3'], () => true)

        const result: string[][] = [['1', '2', '3']]

        expect(data).toStrictEqual(result)
      })

      test('Splitting data by empty string element', () => {
        const data = transform<string>(
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
        const data = transform<string>(
          ['1', '2', '3', '4', '5', '|', '6'],
          (el) => el !== '|'
        )

        const result = [['1', '2', '3', '4', '5'], ['6']]

        expect(data).toEqual(result)
      })

      test('Splitting data by Infinity', () => {
        const data = transform<number>(
          [1, 2, 3, Infinity, 6],
          (el) => el !== Infinity
        )

        const result = [[1, 2, 3], [6]]

        expect(data).toEqual(result)
      })
    })
  })
})
