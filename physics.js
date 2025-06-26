export function createSystem (N, box, G = 2e-4) {
  // random Gaussian helper
  const rand = d3.randomNormal.source(Math.random)(0, box/8);

  const particles = d3.range(N).map((id) => ({
    id,
    x:   Math.random()*box - box/2,
    y:   Math.random()*box - box/2,
    vx:  rand(),
    vy:  rand(),
    ax:  0,
    ay:  0,
    mass: 1
  }));

  return { particles, G };
}

export function step(system, dt) {
  const {particles, G} = system;
  const eps2 = 100;            // softening^2 (pixels²)


  for (const p of particles) p.ax = p.ay = 0;

  for (let i=0; i<particles.length; ++i) {
    const a = particles[i];
    for (let j=i+1; j<particles.length; ++j) {
      const b = particles[j];
      const dx = b.x - a.x,  dy = b.y - a.y;
      const dist2 = dx*dx + dy*dy + eps2;
      const inv   = G / Math.pow(dist2, 1.5);
      const ax = dx * inv,   ay = dy * inv;
      a.ax += ax * b.mass;   a.ay += ay * b.mass;
      b.ax -= ax * a.mass;   b.ay -= ay * a.mass;
    }
  }

  // velocity-Verlet update
  for (const p of particles) {
    p.vx += p.ax * dt/2;
    p.vy += p.ay * dt/2;
    p.x  += p.vx * dt;
    p.y  += p.vy * dt;
    p.vx += p.ax * dt/2;
    p.vy += p.ay * dt/2;
  }
}
