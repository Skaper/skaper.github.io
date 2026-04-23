---
layout: page
title: Full-Scale R2-D2 Replica - Interactive Event Robot
description: Real-time controlled entertainment robot for live events
img: assets/img/projects/r2d2/cover.jpg
importance: 2
category: personal projects
published: true
---

### Overview

Full-scale R2-D2 replica for live entertainment events. One operator controlled movement, dome rotation, panels, lighting, and sound effects in real time from a hidden station over a Wi-Fi A/V link. Performed at 10+ events across Russia.

<div class="project-video">
  <iframe
    src="https://www.youtube.com/embed/OOwe5mRFg5I?si=5XSCAyc4tAoaMEUM"
    title="YouTube video player"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>
</div>

**Source code:**
- [RMC Studio on GitHub](https://github.com/Skaper/RMCStudio)

### Technical Stack

Python, PyQt4, Arduino (C++), Raspberry Pi, FFmpeg, Linux, Serial/USB, RC control systems, MJPEG streaming

---

## Building the Body

The hardest part wasn't the software. It was finding dimensions.

There are no official blueprints for a full-size R2-D2. I spent a lot of time on hobbyist forums, measuring proportions off photos and calculating ratios from smaller licensed replicas. If the dome on the small version is X% of total height, it should be the same on the full-size one. A lot of cross-referencing before I was confident enough to cut anything.

The structure is wood - cheap, easy to work with, holds the weight. Movable parts like dome panels and port covers were 3D printed. Then everything got skinned in PVC sheet plastic, filled, sanded, primed, and painted in multiple layers.

<div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/r2d2/build.png" title="Frame construction" class="img-fluid rounded z-depth-1" %}
</div>

The finished robot came out at over 40 kg. That caused a real problem with the motors. They needed to be strong enough to move the weight, small enough to fit inside the legs, and have enough gear reduction to not burn out. Leg space is tight, so finding motors that matched all three took a while.

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/r2d2/1.jpg" title="1" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/r2d2/2.jpg" title="2" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/r2d2/3.jpg" title="3" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

After all that, writing the control software felt easy.

---

## Hardware Architecture

Electronics are split between head and body.

**Body:** Arduino, batteries, drive motors. Arduino handles servos for panel movement, LED lighting, and the RC motor controller. Real-time hardware on a microcontroller keeps latency low - Linux would add jitter that makes movement feel off.

**Head:** Raspberry Pi, camera, indicator LEDs. The Pi streams video back to the operator, receives commands over Wi-Fi, and forwards them to the Arduino over serial.

```
[Operator Station]
       | Wi-Fi
       v
[HEAD: Raspberry Pi] --serial--> [BODY: Arduino]
       |                                |
  MJPEG stream                    Drive motors
  Audio stream                    Servos (panels)
  Camera, indicators              Battery packs
```

---

## The Rotating Head Problem

R2-D2's dome spins freely. The head has the Pi, camera, and LEDs inside - all needing power and a data connection to the body. If you just run cables through the neck, a few rotations and they're twisted into a knot.

The fix was a **slip ring** - a component that lets cables pass through a rotating joint without twisting. Power and the serial line between head and body go through it.

<div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/r2d2/slip_ring.png" title="Slip ring" class="img-fluid rounded z-depth-1" %}
</div>

Not something most people would think about upfront. But without it the dome would just wrap its own cables after a few minutes.

---

## RMC Studio

I wrote the operator software from scratch in Python with PyQt4. It's a modular desktop app - each robot subsystem is a panel the operator can drag and arrange freely.

<div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/r2d2/rmcstudio.jpg" title="RMC Studio interface" class="img-fluid rounded z-depth-1" %}
</div>

**Modules:**

- **Camera (MJPEG)** - live feed from the robot, low-latency enough to drive by
- **Move** - directional commands to the drive motors
- **Servo** - dome rotation and panel positions, configurable min/max limits
- **Sound Play** - R2-D2 sound effects on demand
- **TTS** - text-to-speech through the robot's speakers
- **Battery** - voltage monitoring

Each module sends commands over a socket. The Pi routes them to Arduino over serial when hardware is involved.

<details>
<summary>Show serial command structure</summary>
<div markdown="1">

```python
def sendData(self, data):
    if self.portConnect:
        self.portConnect.write(data + "\n")
```

Simple text protocol - prefix, pin, value. A servo command looks like `S|D9>120`: servo on pin 9, move to position 120. Human-readable so I could debug over a terminal during setup.

</div>
</details>

---

## A/V Streaming

I used FFmpeg on the Pi to stream the camera as MJPEG over HTTP. The studio just pulls it as a standard stream. Audio goes over a separate socket.

Events are noisy RF environments - lots of Bluetooth, other Wi-Fi networks, metal everywhere. A few things helped: running a dedicated hotspot from the operator laptop, keeping stream resolution low (latency matters more than quality), staying line-of-sight when possible. Worked well enough across all 10+ events.

---

## Operating Live

Everything is manual, in real time. Watching the feed, driving toward people, rotating the dome to look at someone, triggering a sound when a kid touches the robot.

The modular layout of the studio mattered more than I expected. During setup I'd arrange the panels: camera big on the left, sounds across the bottom, servo on the right. At the event you just glance at the right panel, no hunting.

The dome servo got used constantly. Most of R2-D2's character expression comes from head movement - turning to look at someone, snapping back, tilting. Getting servo limits right before the event was important. First time I didn't, and it strained against the physical stop for a few seconds before I caught it.

---

## Result

10+ events across Russia - kids' parties, corporate events, exhibitions. One person running everything from a laptop.

RMC Studio is open source on [GitHub](https://github.com/Skaper/RMCStudio). Built for R2-D2 but the architecture is generic - swap modules, point it at a different serial device, and it runs something else.