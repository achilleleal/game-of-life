const _ = require("lodash")

// Initial cell configuration
// A cell is represented by a 1 when alive and a 0 when dead
// Change this to see how the cells evolve!
let grid = [
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,1,0,0,0,0,0,0,0],
	[0,0,0,1,0,0,0,0,0,0],
	[0,1,1,1,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
]

const conwaysGameOfLife = (gens) => {

    console.log(formatGen(grid, 0)) //Initial config

    let newGen;

    for (let i = 1; i <= gens; i++) {

        //Deep clone the grid to keep the original as a reference
        //This way we can rewrite the newGen without altering the original
        newGen = _.cloneDeep(grid); 

        for (let y = 0; y < grid.length; y++) {

            for (let x = 0; x < grid[y].length; x++) {   

                const cell = grid[y][x]
                const totalNeighbours = upperCells(x,y) + bottomCells(x,y) + lineCells(x,y)
        
                if (cell) {
                    if (totalNeighbours < 2 || totalNeighbours > 3) {
                        newGen[y][x] = 0; // Cell dies
                    } // Else cell lives
                } else {
                    if (totalNeighbours === 3) {
                        newGen[y][x] = 1; // Cell is born!
                    }
                }
        
            }
        }

        //Rewrite grid with the current generation's config to keep it as reference for the next gen.
        grid = newGen; 

        console.log(formatGen(newGen, i))
    }
}

conwaysGameOfLife(10)


function formatGen(gen, i) {
    let result = '';
    gen.forEach(
        line => line.forEach(
            (cell, i) => {
                cell 
                  ? result += 'O'
                  : result += '_'
                if (i === line.length-1) {
                    result += '\n'
                }
            }
        )
    )
    return `Generation ${i}:\n${result}\n`
}

// Counts the two adjacent cells to the current one
function lineCells(x,y) {

    const prevCell = x > 0 
                        ? grid[y][x-1] 
                        : 0;

    const nextCell = x < grid[y].length - 1 
                      ? grid[y][x+1] 
                      : 0;

    return prevCell + nextCell
}

// Counts the three upper neighbour cells of the current one
function upperCells(x,y) {
    if (grid[y-1]) {

        const uCell = grid[y-1][x];

        const previousUCell = x > 0 
                                ? grid[y-1][x-1] 
                                : 0;

        const nextUCell = x < grid[y-1].length - 1 
                            ? grid[y-1][x+1] 
                            : 0;

        return uCell + previousUCell + nextUCell;
    }
    return 0;
}

// Counts the three lower neighbour cells of the current one
function bottomCells(x, y) {
    if (grid[y+1]) {

        const bCell = grid[y+1][x];

        const previousBCell = x > 0 
                                ? grid[y+1][x-1] 
                                : 0;
                                
        const nextBCell = x < grid[y+1].length - 1 
                            ? grid[y+1][x+1] 
                            : 0;

        return bCell + previousBCell + nextBCell;
    }
    return 0;
}

