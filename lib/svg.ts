import fs from 'fs'

function outputSvg(size: number, count: number) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 200 200">
      <style>
        .days {
          text-anchor: middle;
          fill: #fff;
          font-size: 56px;
          font-family: monospace;
          font-weight: bold;
        }

        .subtext {
          text-anchor: middle;
          fill: #fff;
          font-size: 20px;
          font-family: sans-serif;
          font-weight: bold;
        }
      </style>
      <rect height="200" width="200" fill="#238636" stroke="#000" stroke-width="5" />
      <text x="100" y="90" class="days">${count}</text>
      <text x="100" y="120" class="subtext">consecutive days</text>
      <text x="100" y="145" class="subtext">of contributions</text>
    </svg>
  `;

  try {
    fs.writeFileSync("green.svg", svg);
  } catch(e) {
    console.log('Error wrting "green.svg"');
    throw e;
  }
}

export default outputSvg;
