import {createSystem, step} from './physics.js';

const N    = 4000;
const box  = Math.min(window.innerWidth, window.innerHeight);
const dt   = 0.8;              // try 0.5–1.0
const sys  = createSystem(N, box);


const svg  = d3.select('body').append('svg');
const g    = svg.append('g')
  .attr('transform', `translate(${window.innerWidth/2},${window.innerHeight/2})`);


const node = g.selectAll('circle')
  .data(sys.particles)
  .enter().append('circle')
  .attr('r', 0.9)
  .attr('fill', d => d3.interpolateCool(d.id/N));


let running = true;
document.getElementById('toggle').onclick = () => running = !running;
document.getElementById('gSlider').oninput = (e) => sys.G = +e.target.value;

d3.timer(function () {
  if (!running) return;
  step(sys, dt);

  node
    .attr('cx', d => d.x)
    .attr('cy', d => d.y);
});
