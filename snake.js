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


}


// Draw function loops indefinitely
function draw () {
    // Colour background black
    background(0);

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

    show () {

    }

    checkCollision (snake_x, snake_y) {
        if ((this.x == snake_x) & (this.y == snake_x.y)) {
            this.times_eaten += 1;
            return true
        }
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

}