import { Robot } from './components'
import { groupBy, transform } from './helpers'

// we'll use text file for our inputs
const file = Bun.file('input.txt')

// get the raw data, remove & split them by new lines
const input = (await file.text())
  .trim()
  .replace(/(\n){2,}/g, '$1\n')
  .split(/\n/)

// partitions the data into [[{x,y}, {xxx}]..n]
let data = groupBy(input, (val) => val !== '')

// flatten the list of robots for each grid
const robots: any[] = []

// Our input supports [1..n] grids separated
// by x2 new lines - see input text file
for (let i = 0, j = 0; i < data.length; i++, j = 0) {
  // transform the raw data
  const { grid: rawGrid, robots: rawRobots } = transform(data[i])

  const [x, y] = rawGrid.map(Number)

  // runs in O(m)
  while (j < rawRobots.length) {
    const { coordinates, commands } = rawRobots[j]

    // initialize the robot
    const robot = new Robot(coordinates)

    // iterate over the commands and update
    robot.initiateCommands(commands)

    // print the final state
    console.log(robot.toString())

    j++
  }
}

// console.log(robots)
