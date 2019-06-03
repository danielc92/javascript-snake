/* 
Global variables setup
The arena is to be square, so height will equal width
offset is the size of each square, for now let it be 20
*/
let w = 1000;
let h = w;
let offset = 20;
let points = [];


// The possible locations of all points
// Used to generate new coordinates for Snake/Food instances
for (let i = 0; i <= w - offset; i += offset) {
    points.push(i);
}


// Used to generate a random point
function randomPoint() {
    let n = Math.floor(Math.random() * points.length);
    return points[n];
}


// Initial setup function
function setup () {
    // Create the canvas as a square
    createCanvas(w, h);
   
    // Set frame rate
    frameRate(14);

    // Initialize instance of food and snake
    snake = new Snake(x = randomPoint(), y = randomPoint());
    food = new Food(x = randomPoint(), y = randomPoint());
}


// Draw function loops indefinitely
function draw () {
    // Colour background black
    background(0);

    snake.updateDirection();
    snake.checkPosition();
    snake.move();
    snake.show();

    if (food.checkCollision(snake.loc[0][0], snake.loc[0][1])) {
        food.rellocate();
        console.log(`Food rellocated to at ${food.x}, ${food.y}`);
        snake.updateLocationsToShow();
        
        //document.getElementById('score-counter').innerHTML = food.score;
    }
    food.show();


}


/*
The Food class
An instance of the Food class has the following characteristics
- It starts with an x, y position
- It can detect a collision with a snake object
- It can render on canvas.
- It can move or rellocate based on the outcome of the collision function
- It keeps track of how many times it rellocates (the score in other words)
*/

class Food {
    // Food is initialized with an x, y coordinate. 
    // times_eaten (score) is default to 0
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.times_eaten = 0;
    }


    // Render the Food at its current position
    // Size set to the offset global variable
    show () {
        rect(this.x, this.y, offset, offset);
    }


    // Check if the snake head position collides with food position
    // If true return true and increment times_eaten value
    checkCollision (snake_x, snake_y) {
        if ((this.x == snake_x) & (this.y == snake_x.y)) {
            this.times_eaten += 1;
            return true
        }
    }


    // Simply rellocates position of Food
    rellocate () {
        this.x = randomPoint();
        this.y = randomPoint();
    }



}

/* 
The Snake Class
An instance of the Snake class has the following attributes;
- It starts off with a location (array of arrays)
- It can 'move'
- It can update its size (after a collision with food)
- It can change direction
- It can render
- It can check position (collision with boundaries of arena)
*/

class Snake {
    /*
    Initialize a Snake object with a location array,
    default location to show of 1 (this increases with food collisions)
    Default direction of 'R' (right)
    */
    constructor (x, y) {
        this.dir = 'R';
        this.location = [[x, y]];
        this.locations_to_show = 1;
    }


    // Updater function for locations to show
    updateLocationsToShow() {
        this.locations_to_show += 1;
    }


    // Rendering function
    show () {
        for (let i = 0; i < this.locations_to_show; i++) {
            rect(this.loc[i][0], this.loc[i][1], offset, offset);
        }
    }


    // Update direction based on key press in browser
    updateDirection() {
        if (keyCode == UP_ARROW) {
            this.dir = 'U';
        } else if (keyCode == RIGHT_ARROW) {
            this.dir = 'R';
        } else if (keyCode == LEFT_ARROW) {
            this.dir = 'L';
        } else if (keyCode == DOWN_ARROW) {
            this.dir = 'D';
        }
    }


    // Move function will unshift a new location into the location array conditionally based on direction
    move () {
        let curr_x;
        let curr_y;
        if (this.dir == 'L') {
            curr_x = this.loc[0][0] - offset;
            curr_y = this.loc[0][1];
        } else if (this.dir == 'R') {
            curr_x = this.loc[0][0] + offset;
            curr_y = this.loc[0][1];
        } else if (this.dir == 'U') {
            curr_x = this.loc[0][0];
            curr_y = this.loc[0][1] - offset;
        } else if (this.dir == 'D') {
            curr_x = this.loc[0][0];
            curr_y = this.loc[0][1] + offset;
        } 

        // After move unshift location
        this.loc.unshift([curr_x, curr_y])
    }


    // Check position function to unshift new location based on wall collisions
    // The snake will be able to pass through walls and carry on from opposite walls
    checkPosition () {
        let temp_x = this.loc[0][0];
        let temp_y = this.loc[0][1];

        if ((temp_x > w) & (this.dir == 'R')) {
            this.loc.unshift([0, temp_y]);
        }

        if ((temp_y > h) & (this.dir == 'D')) {
            this.loc.unshift([temp_x, 0]);
        }

        if ((temp_x < 0) & (this.dir == 'L')) {
            this.loc.unshift([w - offset, temp_y]);
        }

        if ((temp_y < 0) & (this.dir == 'U')) {
            this.loc.unshift([temp_x, h - offset]);
        }

    }
    

}