import { transform } from './utils'

// we'll use text file for our inputs
const file = Bun.file('input.txt')

// get the raw data, remove & split them by new lines
const input = (await file.text())
  .trim()
  .replace(/(\n){2,}/g, '$1\n')
  .split(/\n/)

// transforms the input into [[{x,y}, {xxx}]..n]
let data = transform(input, (val) => val !== '')

// Our input supports multiple grids separated
// by multiple new lines - see input text file
for (let i = 0; i < data.length; i++) {
  // TODO: Loop through the data
}
