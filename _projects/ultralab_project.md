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
Single-handedly developed sci-fi VR shooter combining tower defense, bullet-hell, and roguelike elements for Meta Quest and PCVR. Led complete development from concept through AppLab release, conducting extensive playtesting with 150+ users and iterating based on analytics and community feedback.

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

- Architected full ECS implementation managing hundreds of simultaneous enemies and projectiles at 72fps on Meta Quest 2
- Developed custom flocking behavior using Boids algorithm for coordinated swarm movement patterns
- Implemented ECS-based pathfinding system optimized for large-scale enemy coordination
- Achieved performance through ECS job system parallelization, burst compilation, and data-oriented design patterns

### Massive-Scale Object Optimization

- Built sophisticated object pooling system for projectiles, enemies, and VFX to eliminate runtime allocations
- Implemented spatial partitioning (octree/grid-based) for efficient collision detection and culling
- Leveraged ECS component archetype design for cache-friendly data layouts, minimizing memory access latency
- Utilized Unity's C# Job System with Burst compiler for multi-threaded AI calculations and physics
- Applied aggressive LOD systems and frustum culling for rendering optimization
- Batched draw calls through GPU instancing for identical enemy meshes and projectile effects
- Employed asynchronous scene streaming to manage memory footprint across procedurally generated arenas

### Weapon Systems & Combat

- Designed 12 distinct weapon types with unique VR interaction models: laser beams, ballistic projectiles, energy weapons, grenades, explosive ordnance, gravity traps, and black hole generators
- Each weapon featured custom physics behaviors, visual effects, and tactical advantages against swarm patterns

### Procedural Generation & Roguelike Systems

- Built procedural arena generation with randomized enemy configurations and spawn patterns
- Designed session-based progression with weapon/upgrade unlocks and persistent meta-progression between runs
- Implemented permadeath mechanics with build variety through combinatorial upgrade systems

### Audio Design (FMOD Integration)

- Integrated comprehensive FMOD audio system with adaptive music responding to combat intensity
- Implemented 3D positional audio for enemy localization and weapon feedback
- Created dynamic soundscapes enhancing immersion and spatial awareness

### Data-Driven Iteration

- Established analytics pipeline tracking retention, session length, difficulty spikes, and player progression
- Conducted 150+ playtests with recorded gameplay analysis and community surveys via Discord
- Iteratively refined difficulty curves, weapon balance, and progression pacing based on quantitative metrics and qualitative feedback

### Cross-Platform Development

- Delivered optimized builds for Meta Quest standalone and PCVR using OpenXR abstraction
- Maintained unified codebase with platform-specific performance tuning

---

## Additional Contributions

Contributed prototype work, technical consultation, and testing for [Ultra Boxing VR](https://ultraboxingvr.com/) 
Advised Ultralab teams on VR development best practices including performance optimization strategies, comfort considerations, and interaction design patterns.