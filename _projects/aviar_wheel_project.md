---
layout: page
title: Standalone VR Gaming Wheel Support
description: Industry-First Native USB Force Feedback Wheel Driver for Meta Quest
img: assets/img/projects/aviar/wheelCover.png
importance: 2
category: work projects
---
### Overview
Developed the first native USB gaming wheel driver for standalone VR headsets:
force feedback steering wheel support on Meta Quest without a PC. This removed
the €1,000+ PC requirement per training station and made VR vehicle simulation
setups fully portable.

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/aviar/1.jpg" title="1" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/aviar/2.jpg" title="2" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/aviar/3.jpg" title="3" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

### Technical Stack
Android USB Host API, Java Native Interface (JNI), Unity Native Plugins, Python
(protocol analysis), Wireshark, USB HID Protocol, Unity Input System

### The Challenge

Gaming steering wheels with force feedback had zero support on Android-based
systems. Unlike PC, where mature drivers exist, Android had no infrastructure
for these devices — not even basic input recognition. The communication
protocols used by major wheel manufacturers (Logitech, Thrustmaster) are
proprietary and undocumented, so there was nothing to build on.

**Industry Gap:** All competing VR training solutions required expensive PCVR
setups. No standalone VR application had ever achieved native wheel support.

<div class="project-video">
  <iframe
    src="https://www.youtube.com/embed/Jdm898xkbGw?si=RUXaqA6iZ6qntQRf"
    title="YouTube video player"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>
</div>

---

## Technical Approach

### Reverse Engineering (2 months)

- Analyzed 100+ protocol commands across multiple operational modes using
  Wireshark and custom Python scripts for packet parsing and pattern detection
- Developed automated filtering system to isolate relevant commands from noise
- Discovered multi-layer communication protocol with initialization sequences,
  mode switching, and bidirectional data flow
- Created standalone Android debugging utility to rapidly test protocol
  hypotheses in a similar OS environment

### Driver Implementation

- Built complete Java-based driver emulation as Android Native Plugin for Unity
- Implemented full USB HID protocol handling through Android USB Host API
- Implemented force feedback effects: spring, damper, friction, constant force
- Designed Unity-facing API exposing the wheel as a standard Joystick in the
  Unity Input System, so any Unity project can use it without special handling

### Architecture

<div class="col-sm mt-3 mt-md-0">
  {% include figure.liquid loading="eager" path="assets/img/projects/aviar/diagram.png" title="3" class="img-fluid rounded z-depth-1" %}
</div>

---

## Business Impact

**Industry First:**
The only standalone VR application with native USB force feedback wheel
support. Competing solutions still don't have it.

### Business Value

- Eliminated €1,000+ PC hardware requirement per training station
- Enabled fully portable demo setups for trade shows and client presentations
- Real force feedback during vehicle operations instead of a passive wheel
- Modular architecture: supporting a new wheel model mostly means adapting its
  protocol, not rewriting the driver

**Reception:** At aviation trade shows, the part that got attention was the
missing PC — mobile training deployments no longer needed one.
