---
layout: page
title: VR Roguelike Tower Defense Shooter
description: Solo Unity Developer
img: assets/img/projects/ultralab/cover.png
importance: 4
category: work projects
---
Ultralab | Oct 2022 – May 2023 | 8-month development cycle

### Overview
Solo-developed a sci-fi VR shooter combining tower defense, bullet-hell, and roguelike elements for Meta Quest and PCVR — from concept through AppLab release. Ran playtests with 150+ users and iterated on analytics and community feedback.

### Tech Stack
Unity, C# (DOTS/ECS), Burst Compiler, C# Job System, FMOD, Meta XR SDK, OpenXR, Boids Algorithm, Custom Procedural Generation, Unity Timeline/Animator

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/ultralab/1.png" title="1" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/ultralab/2.png" title="2" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/ultralab/3.png" title="3" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

### Game Concept

1 billion years in the future, a robot collector scours space for ancient technologies. Navigate cosmic junkyards defended by swarms of enemy drones in this fast-paced VR shooter with procedural generation and permadeath mechanics.
Gameplay: Sci-fi bullet-hell tower defense featuring swarm-based enemy AI, 12 fantasy weapons with unique mechanics, procedural arena generation, and dual progression systems (session-based and meta-progression).

<div class="project-video">
  <iframe
    src="https://www.youtube.com/embed/9rwowVkGjkE?si=TtWQ1skW7NP3PfEI"
    title="YouTube video player"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>
</div>

**Try JankerMan:**
- [Itch.io](https://skaperdev.itch.io/jankerman)
- [Meta Quest AppLab](https://www.meta.com/experiences/app/6521195701244535/)

--- 

## Technical Implementation

#### High-Performance Swarm AI (Unity DOTS/ECS)

- Built full ECS implementation running hundreds of simultaneous enemies and projectiles at 72fps on Meta Quest 2
- Developed custom flocking behavior using the Boids algorithm for coordinated swarm movement
- Implemented ECS-based pathfinding for large-scale enemy coordination
- The performance comes from job system parallelization, Burst compilation, and data-oriented design

### Massive-Scale Object Optimization

- Built object pooling for projectiles, enemies, and VFX to eliminate runtime allocations
- Implemented spatial partitioning (octree/grid-based) for collision detection and culling
- Designed ECS component archetypes for cache-friendly data layouts
- Used the C# Job System with Burst compiler for multi-threaded AI and physics
- Aggressive LOD and frustum culling
- Batched draw calls through GPU instancing for identical enemy meshes and projectile effects
- Asynchronous scene streaming to keep memory in check across procedurally generated arenas

### Weapon Systems & Combat

- Designed 12 weapon types, each with its own VR interaction model: laser beams, ballistic projectiles, energy weapons, grenades, explosive ordnance, gravity traps, and black hole generators
- Each weapon has its own physics behavior and a tactical role against particular swarm patterns

### Procedural Generation & Roguelike Systems

- Built procedural arena generation with randomized enemy configurations and spawn patterns
- Designed session-based progression with weapon/upgrade unlocks and persistent meta-progression between runs
- Implemented permadeath mechanics with build variety through combinatorial upgrade systems

### Audio Design (FMOD Integration)

- Integrated FMOD with adaptive music that responds to combat intensity
- Implemented 3D positional audio for enemy localization and weapon feedback

### Data-Driven Iteration

- Set up analytics tracking retention, session length, difficulty spikes, and player progression
- Ran 150+ playtests with recorded gameplay analysis and community surveys via Discord
- Tuned difficulty curves, weapon balance, and progression pacing on the combination of metrics and player feedback

### Cross-Platform Development

- Delivered optimized builds for Meta Quest standalone and PCVR using OpenXR abstraction
- Maintained unified codebase with platform-specific performance tuning

---

## Additional Contributions

Contributed prototype work, technical consultation, and testing for [Ultra Boxing VR](https://ultraboxingvr.com/) 
Advised other Ultralab teams on VR performance, comfort, and interaction design.