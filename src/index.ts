import { Robot } from './components'
import { transform } from './helpers'
import { data } from './parser'

// Our input supports [1..n] grids separated
// by x2 new lines - see input text file
for (let i = 0, j = 0; i < data.length; i++, j = 0) {
  // transform the raw data
  const { grid, robots } = transform(data[i])

  const [x, y] = grid.map(Number)

  // runs in O(m)
  while (j < robots.length) {
    const { coordinates, commands } = robots[j]

    // initialize the robot
    const robot = new Robot([x, y], coordinates)

    // iterate over the commands and update
    robot.initiateCommands(commands)

    // print the final state
    console.log(robot.toString())

    j++
  }
}
