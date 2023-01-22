import { groupBy } from './helpers'

// we'll use text file for our inputs
const file = Bun.file('input.txt')

// get the raw data, remove & split them by new lines
const input = (await file.text())
  .trim()
  .replace(/(\n){2,}/g, '$1\n')
  .split(/\n/)

// partitions the data into [[{x,y}, {xxx}]..n]
let data = groupBy(input, (val) => val !== '')

export { data }
