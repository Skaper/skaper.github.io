---
layout: page
title: AVIAR - Aviation VR Training Platform
description: Senior Unity/VR Developer
img: assets/img/projects/aviar/cover.jpg
importance: 1
category: work
related_publications: false
---

# Senior Unity Developer | VR Systems Engineer
## Aviation VR Training Platform | 2 years | Team of 5 developers
_B2B VR training platform serving global aviation industry clients including
Lufthansa, Swissport, DHL, and airlines worldwide_

Architected and delivered 10+ interactive training scenarios for professional
aviation ground operations, implementing full-featured simulations of
specialized equipment (Highloader, Beltloader, Trepel) with realistic physics,
AI systems, and intuitive VR controls.

**Tech Stack:** Unity 6, URP, DOTS/Entities, Meta XR/OpenXR/PICO SDK, Obi
Physics, Custom Behavior Trees, NavMesh, Contacts Modification API,
UniTask/UniRx, DOTween, RootMotion, Addressables

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/aviar/main.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  VIAR VR training solutions deployed in corporate and field environments. Users
  interact with high-fidelity aircraft simulations, practicing complex
  procedures that would be costly or dangerous to replicate in real-world
  conditions.
</div>

### Core Technical Contributions:

**Advanced Physics & IK Systems** - Engineered custom inverse kinematics for
Highloader lift mechanisms and realistic cargo handling. Implemented Contacts
Modification API for accurate belt conveyor physics and roller systems,
optimizing integration with Unity DOTS/ECS architecture. Developed
rope/cable/hose simulations using Obi Physics for cargo securing and equipment
operations.

**Ground Vehicle Operations** - Created comprehensive vehicle control systems
supporting multiple input methods (physical USB steering wheels, virtual
controls, joysticks) with mixed reality integration via Passthrough API.
Researched and implemented motion sickness mitigation techniques including
camera vignetting, visual anchoring, velocity constraints, and vehicle
stabilization to ensure comfortable extended training sessions.

**AI & Behavior Systems** - Built custom action-based behavior tree framework
integrated with DOTS/ECS for NPC drivers and autonomous vehicles. Implemented
NavMesh-based navigation with gesture recognition for marshalling interactions,
enabling realistic coordination between player and AI-controlled ground crew.

<div class="ratio ratio-16x9 mx-auto my-4 w-100">
  <iframe
    src="https://www.youtube.com/embed/rZlSJ9mKoPk?si=dEy9aoEdouqQug6x"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>
</div>

### Complex Training Scenarios:

**Pushback Operations** - Multi-vehicle coordination with aircraft pushback,
trajectory accuracy validation, and NPC interaction systems

**Highloader Operations** - Full cargo loading simulation with physics-based
conveyor systems and custom IK solutions

**Beltloader Integration** - AI autopilot systems and automated equipment
operations

<div class="ratio ratio-16x9 mx-auto my-4 w-100">
  <iframe
    src="https://www.youtube.com/embed/f8iADe1KS4k?si=jwY4P6LXG-s8PVUh"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>
</div>

**Performance Optimization** - Architected ECS system execution pipeline with
layered presentation/simulation groups. Implemented Asynchronous SpaceWarp with
selective exclusions for fast-moving objects, maintaining target frame rates
across Meta Quest and PICO platforms. Utilized Unity Profiler, OVR Metrics Tool,
and Meta Quest Developer Hub for performance analysis.

**Industry First Achievement** - Reverse-engineered proprietary USB HID
protocols and developed custom Java-Unity driver plugin, delivering the
market's first standalone VR headset application with native force-feedback
steering wheel support—a capability unavailable in any competing solution.

