---
layout: page
title: Robotrek - Programming & Robotics Instructor
description: Curriculum Designer & Instructor
img: assets/img/projects/robotrek/cover.jpg
importance: 6
category: work projects
---
2019 – 2021 | Robotrek | Balakovo, Russia

### Overview
Taught programming and robotics at Robotrek (franchised network of 100+ coding schools across Russia) for over two years, working with children and teenagers aged 6–17. Course tracks included LEGO robotics and HUNA-MRT, alongside three original courses I designed from scratch: Scratch programming, Java game development, and Arduino robotics.

Each course track was designed for a specific age group and skill level, with its own lesson structure, progression system, and learning goals. I ran multiple groups simultaneously, adapting my teaching approach to different ages and learning speeds.

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/robotrek/1.jpg" title="1" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/robotrek/2.png" title="2" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/robotrek/3.png" title="3" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

### Course Tracks

**Platforms & Tools:** LEGO Mindstorms, Arduino, Scratch 3, Java, Swing, Processing, GIMP, Audacity, PixelArt Online tools

**Self-built:** 30-lesson Java course + custom 2D Java game engine SKENGINE, 20-lesson Arduino course, Scratch Game Design course

**Teaching Practices:** Curriculum design, lesson planning, age-appropriate pedagogy, hands-on project-based learning, student motivation systems, competition facilitation, progress assessment

---

## Teaching

### Ages 6–9 — Construction & Logic Foundations [HUNA-MRT](https://www.myrobottime.com)
- Taught an introductory course using HUNA-MRT educational construction kits (similar to LEGO WeDo), focused on spatial thinking and basic logic
- Structured each 80-minute class around a themed model: 15 minutes of introduction and educational material, 60 minutes of hands-on building, followed by group games and competitions
- Used a collectible card reward system to keep kids motivated - earned for good behavior, performance, and mini-game wins, exchangeable for prizes
- Adapted pace and complexity to individual students within group sessions

### Ages 9–12 — Arduino-based Construction (Blockly) [HUNA-MRT](https://www.myrobottime.com/secondary)
- Taught an Arduino-based course using visual Blockly programming, covering sensors, variables, loops, conditionals, and functions
- Each class had its own theme and a matching physical model, giving students a concrete goal every session
- Ran in-class competitions and games to reinforce concepts and keep engagement high across the full 80-minute session
- Helped students debug both hardware assembly and code, building my ability to explain technical concepts clearly to young learners

### Ages 9–12 — LEGO Mindstorms
- Ran a parallel Mindstorms track for the same age group, combining mechanical construction with programmable logic
- Lesson sequences that gradually introduced more complex builds, maintaining a theme-per-class format
- Balanced structured instruction with open exploration time, letting students experiment beyond the base model
## Curriculum Design

### Ages 12–17 — DIY Robots: Arduino Course for Teens (self-designed course)
- Designed and taught a 20-lesson Arduino programming course (~3–5 months) built around the Arduino-based Bluetooth 4WD car with varieties of sensors, targeting high-school students with no prior experience
- Students wrote real Arduino C++ code from lesson one — no block-based tools. Each lesson followed a consistent rhythm: new concept → standalone sketch → exercise building on previous code
- Structured the course in five phases:
  - **Foundations (lessons 1–4):** Arduino IDE, digital I/O, conditionals with IR sensor, Serial Monitor
  - **Sensors & actuators (5–9):** ultrasonic rangefinder, IR remote, servo motors and PWM, Bluetooth (HC-06) with Android companion app, I2C LCD display
  - **Algorithms (10–11):** loops, user-defined functions, and a radar project pairing an ultrasonic sensor on a servo with a Processing visualization on PC
  - **Robotics (12–19):** chassis assembly, motor driver control, IR remote driving, Bluetooth driving, line following, ultrasonic obstacle avoidance
  - **Capstone (20):** fully autonomous "4-in-1" SmartBot — line follower, obstacle avoider, IR-controlled, and Bluetooth-controlled, with push-button mode selector and live LCD status
- Students walked away with a working autonomous robot and hands-on experience reading datasheets, wiring sensors, integrating libraries, and shipping embedded sketches
  
<div class="project-video">
  <iframe
    src="https://www.youtube.com/embed/GAqvzCXEUSw?si=JZGHjjB6gDwNSJlc"
    title="YouTube video player"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>
</div>



### Ages 9–12 — Scratch Game Design (self-designed course)
- Designed and taught an original game development course in Scratch, built around real game studio roles rather than programming alone
- Structured each project to include four roles: **Programmer** (logic and mechanics), **Artist** (pixel art in GIMP and online tools), **Level Designer** (building levels from created assets), and **Audio Designer** (sound effects in Audacity)
- Introduced students to real game industry concepts — mechanics, art styles, professional roles — using examples from well-known games
- Developed a clear learning progression: early classes built games together step by step; mid-course students received project briefs and worked semi-independently; final project was fully open-ended — students formed their own teams, chose their roles, and built original games
- Every 2–3 classes produced a complete new game, maintaining a high sense of achievement and momentum throughout the course

### Ages 13–17 — Java Game Development (self-designed course)
- Designed a 30 lesson Java programming course from the ground up, taking students from zero to building GUI desktop applications and an introductory Arduino sketch
- Course arc: variables and types → loops and user input → arrays → OOP and classes → Swing GUI (calculator, chatbot, dialogs) → C and Arduino introduction
- Oriented the entire curriculum around game development to keep the material relevant and motivating for the age group; kept groups small (up to 10 students) to provide individual attention
- Authored all lesson plans, exercises, and reference materials independently — published on [GitHub](https://github.com/Skaper/java_lessons)

#### SKENGINE — Custom 2D Java Game Engine
- Built [SKENGINE](https://github.com/Skaper/SKENGINE) from scratch without third-party libraries, inspired by Unity's component system, specifically as an educational framework for the course
- Key features: component-based GameObject architecture, fixed-timestep game loop, software pixel renderer with alpha blending, scene management, collision detection, 2D animation system, asset pipeline, and audio — all using only native Java APIs
- Designed to be simple enough for beginners to understand internals, yet capable enough to produce interactive results from early lessons, lowering the barrier to learning OOP concepts

#### FlyShip — Space Shooter Demo Game
- Developed [FlyShip](https://github.com/Skaper/FlyShip) on top of SKENGINE as a live coding demonstration — students built the game step-by-step following instructor-led sessions
- Covered core game dev concepts hands-on: directional movement with trigonometry, energy and weapon systems, enemy AI with sensor-based detection and orbital movement, solar system with orbiting planets, collision response, and animation — all built incrementally as teaching material

<div class="project-video">
  <iframe
    src="https://www.youtube.com/embed/DctP6MWqv8Q?si=VWxktxzC39JIntAm"
    title="YouTube video player"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>
</div>

---

## Impact
- Designed 3 original course tracks from scratch covering ages 6–17, each with full lesson plans, exercises, and teaching materials authored independently
- Built SKENGINE — a custom 2D Java game engine from scratch using only native Java APIs — and FlyShip, a complete demo game built on top of it, both used as live teaching material
- Arduino course curriculum took complete beginners from blinking an LED to building a fully autonomous multi-mode robot over 20 lessons
- Introduced a game studio role-based structure to the Scratch curriculum, giving students exposure to programming, pixel art, level design, and audio production in a single course
- Contributed to curriculum expansion in second year, helping the school grow its course offerings
- Supervised student teams at regional robotics competitions and off-site events