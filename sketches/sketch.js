const canvasSketch = require('canvas-sketch');

// Defines our parameter for our artwork
const settings = {
  dimensions: [ 2048, 2048 ]
  // orientation: 'portrait',
  // units: 'cm',
  // pixelsPerInch: 300
};


const sketch = () => {
  const createGrid = () => {
    const points = [];
    const count = 5;

    // Creating two dimensional grid
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = x / count;
        const v = y / count;
        points.push([ u, v ]);
      }
    }
    return points;
  };

  const points = createGrid();
  console.log(points);
  
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
  };
};

// Circle Path
  // const sketch = () => {

    // Render Funct
  //   return ({ context, width, height }) => {
  //     context.fillStyle = 'yellow';
  //     context.fillRect(0, 0, width, height);

  //     context.beginPath();
  //     context.arc(width / 2, height / 2, 2, 0, Math.PI * 2, false);
  //     context.fillStyle = 'green';
  //     context.fill();
  //     context.lineWidth = width * 0.05;
  //     context.strokeStyle = 'blue';
  //     context.stroke();
  //   };
  // };

// Creates 2d boilerplate
canvasSketch(sketch, settings);
