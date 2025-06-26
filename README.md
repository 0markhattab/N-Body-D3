# N‑Body Simulation in D3.js

A minimalist, browser‑based Newtonian gravity demo that animates 4 000 particles at 60 fps with nothing more than vanilla JavaScript and D3 v7.

---

## Why this project?

- Pedagogical – show core ideas of N‑body dynamics without heavy math or external engines.
- Lightweight – one HTML page + three small ES modules; opens directly in a browser.
- Hack‑friendly – every line is commented, encouraging you to tweak parameters, swap integrators, or migrate to WebGL when you outgrow SVG.

---


#
## How it works

### Physics core (`physics.js`)

| Step           | Code                       | Notes                                                     |
| -------------- | -------------------------- | --------------------------------------------------------- |
| State     | `x,y,vx,vy,ax,ay,mass`     | 2‑D vectors; units are *pixels* & *pixels/τ*              |
| Force     | Softened Newtonian gravity | `eps² = 100` prevents ∞ accelerations                     |
| Integrator | Velocity‑Verlet            | 2× half‑kick per frame preserves energy better than Euler |
| Complexity | O(N²)                      | OK for ≤4 k bodies; swap in Barnes–Hut for bigger crowds  |

### Renderer (`render.js`)

- SVG  for each particle (radius ≈ 1 px).
- Colour map – `d3.interpolateCool(id/N)` gives blue‑to‑yellow gradient.
- calls `step()` + DOM updates \~16 ms.




## Road‑map / future updates

1. Performance:
   - Barnes–Hut with θ slider.
   - Optional WebGL renderer (three.js InstancedMesh).
2. User experience
   - Zoom & pan (`d3-zoom`).
   - Reset / random seed buttons.
   - FPS counter overlay.
3. Physics extensions
   - Elastic collisions & mass‑dependent radii.
   - Configurable softening length ε.
   - Preset galaxy, globular cluster, or solar system initial conditions.
4. Tech stack
   - Vite + ESBuild for rapid dev.
   - Web Workers to offload physics.
   - TypeScript typings for zero‑surprise refactors.
5. Educational docs
   - Inline formula pop‑overs (MathJax).
   - Link each parameter to a short explainer.

 Omar Khattab


