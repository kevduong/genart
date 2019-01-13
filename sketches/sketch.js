const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

// Defines our parameter for our artwork
const settings = {
  dimensions: [ 2048, 2048 ]
  // orientation: 'portrait',
  // units: 'cm',
  // pixelsPerInch: 300
};


const sketch = () => {
  const colorCount = random.rangeFloor(2, 7);
  const palette = random.shuffle(random.pick(palettes))
    .slice(0, colorCount);

  const createGrid = () => {
    const points = [];
    const count = 30;

    // Creating two dimensional grid
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        points.push({
          color: random.pick(palette),
          radius: Math.abs(0.01 + random.gaussian() * 0.1),
          rotation: random.noise2D(u, v),
          position: [ u, v ]
        });
      }
    }
    return points;
  };

  // random.setSeed(512);
  
  const points = createGrid().filter(() => random.value() > 0.5);
  const margin = 400;
  
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    points.forEach(data => {
      const {
        position,
        radius,
        color,
        rotation
      } = data;

      const [ u, v] = position;

      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      // context.beginPath();
      // context.arc(x, y, radius * width, 0, Math.PI * 2, false);
      // context.strokeStyle = 'black';
      // context.fillStyle = color;
      // context.fill();

      context.save();
      context.fillStyle = color;
      context.font = `${radius * width}px "Helvetica"`;
      context.translate(x, y);
      context.rotate(rotation);
      context.fillText('=', 0, 0);

      context.restore();

    });
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
