---
layout: page
title: InMoov Humanoid Robot - Interactive Theater System
description: Full software stack for open-source humanoid robot used in live performances
img: assets/img/projects/inmoov/cover.jpg
importance: 3
category: personal projects
published: true
---

### Overview

Full software stack for the open-source InMoov humanoid robot. Used in live robotic theater performances and public demonstrations in Moscow, including children's shows at a robot theater where InMoov performed on stage alongside other robots and human actors. The robot recognized faces and emotions, reacted to people in real time, tracked objects, and spoke - controlled through a visual scenario editor built on top of [RMC Studio](https://github.com/Skaper/RMCStudio). Performed at 10+ public events.

<div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/inmoov/cover.jpg" title="InMoov at event" class="img-fluid rounded z-depth-1" %}
</div>

### Technical Stack

Python, ROS, OpenCV, Google Speech API, Ubuntu, mini-PC, Arduino, Inverse Kinematics, PID controllers

---

## What InMoov Is

[InMoov](https://inmoov.fr/) is an open-source life-size humanoid robot created by French sculptor Gaël Langevin. All STL files and assembly instructions are free. Anyone can print and build one. It's one of the most well-known open-source robotics projects - hundreds of builders worldwide.

I worked on it as part of a team of enthusiasts. We didn't just assemble the reference design - we developed our own mechanisms on top of it: custom joint designs, prototype leg assemblies, and modified parts where the originals didn't work well enough. The software was written entirely from scratch. InMoov's official software ecosystem exists, but we needed something more flexible for live performance use, so I built the full stack myself.

This project was that stack: computer vision, speech, inverse kinematics for arms, head and torso, PID joint control, and a visual scenario editor for putting it together into interactive shows.

---

## Computer Vision Pipeline

The CV pipeline ran in real time on a mini-PC running Ubuntu. Three things happening in parallel:

**Face detection and tracking.** When a person walked in front of the robot, it found their face and turned its head toward them. More than one person - it would pick one and track them.

**Emotion recognition.** Basic classification from the face: happy, neutral, surprised, and a few others. The robot's response could branch depending on what it detected. Someone smiling gets a different reaction than someone looking neutral.

**Object recognition.** The robot could identify objects shown to it and respond - say what it sees, point at it, react in some programmed way.

All three fed into the same event system that RMC Studio scenarios could listen to and react to.

---

## Speech

Two-way. Google Speech API handled recognition - the robot listened, transcribed, and could trigger scenario branches based on keywords. Google TTS handled output through speakers.

The main problem with speech at live events is noise. Crowds, music, echo. Recognition quality dropped a lot in noisy environments. I never fully solved it - ended up designing scenarios around it, making keyword triggers short and distinct so they'd survive bad audio conditions.

---

## Inverse Kinematics

InMoov's arms have 5 joints each. To make the robot point at something, reach toward a person, or do a gesture, you don't want to manually specify angles for every joint - you want to say "move the hand to this position" and have the solver figure out the angles.

I wrote the IK solver from scratch. Iterative approach similar to FABRIK - start from the end effector, work backward through the chain, repeat until the hand is close enough to the target position. It covers arms, head, and torso.

The calculated angles go from the mini-PC over serial to Arduino, which drives the servos directly.

<details>
<summary>Show IK approach</summary>
<div markdown="1">

Basic loop for one arm:

```python
def solve(self, target_pos, joints, max_iterations=50, tolerance=0.01):
    for _ in range(max_iterations):
        # Forward pass: reach end effector toward target
        joints[-1].position = target_pos
        for i in range(len(joints) - 2, -1, -1):
            direction = (joints[i].position - joints[i+1].position).normalized()
            joints[i].position = joints[i+1].position + direction * joints[i].length

        # Backward pass: fix root
        joints[0].position = self.root
        for i in range(1, len(joints)):
            direction = (joints[i].position - joints[i-1].position).normalized()
            joints[i].position = joints[i-1].position + direction * joints[i-1].length

        if distance(joints[-1].position, target_pos) < tolerance:
            break

    return [j.angle for j in joints]
```

After solving, each joint angle gets clamped to the physical limits of that servo and sent over serial.

</div>
</details>

---

## PID Joint Control

Servos on InMoov aren't precise out of the box. Send a target angle, and the joint overshoots, oscillates, then settles. For slow theatrical gestures that's fine. For anything faster it looks wrong.

PID controllers on each joint smoothed that out - the head and arm joints had separate tuned P/I/D values. Head tracking especially needed it: following a face without PID meant the head would jerk and overshoot every time someone moved.

Tuning was manual. Each joint is different - different servo, different load, different mechanical friction. A few sessions of watching the robot move and adjusting gains.
<div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/inmoov/back.png" title="InMoov poetry performance" class="img-fluid rounded z-depth-1" %}
</div>
---

## RMC Studio Scenarios

Scenarios for the robot were built in RMC Studio - the same visual editor I developed for R2-D2. Directors and operators without programming background could connect triggers to actions: "face detected → turn head → pause → say phrase → if emotion == happy → wave".
<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/inmoov/stage_2.JPG" title="InMoov at robot theater" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/inmoov/stage.jpg" title="InMoov poetry performance" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

CV events, speech recognition results, and timers all plugged into the same event system. A scenario could wait for a face, greet the person, react to their expression, and loop back to idle - all without touching code.

That was the point. Theater people don't want to write Python to change what the robot says. They want to drag blocks around and test it.

For the Moscow robot theater shows the workflow was different - full theatrical productions with a choreographer. Scenarios were timeline-based sequences built together with the choreographer in RMC Studio: gestures, head movements, pauses, and speech all locked to specific times. InMoov performed as part of the show alongside other robots and human actors.

One of the performances was a poetry reading - the robot recited contemporary Russian poets on stage in front of a children's audience.

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/inmoov/theater_1.jpg" title="InMoov at robot theater" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/inmoov/theater_2.jpg" title="InMoov poetry performance" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

---

## What Didn't Work Well

Speech recognition in noisy venues was the hardest unsolved problem. Google's API is good in quiet conditions, degraded significantly with crowd noise. Short, distinct keywords helped but didn't fully fix it.

IK for a real physical robot is harder than IK in a simulator. Mechanical backlash, servo wear, and joints that don't quite match the model all accumulate. The solver converged fine mathematically but the actual arm position was sometimes off by a few centimeters. Good enough for theatrical gestures, not good enough for precise pointing.

---

## Result

10+ public performances. The robot recognized faces, tracked people, reacted to expressions, spoke, and gestured - all from scenarios built in a visual editor.

The most complex robotics project I've built. Every subsystem - CV, speech, IK, PID, scenario execution - had to work at the same time without blocking each other. ROS handled the messaging between them. Getting that coordination stable enough for live use took most of the development time.