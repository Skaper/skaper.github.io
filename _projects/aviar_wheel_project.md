---
layout: page
title: Reverse Engineering Gaming Steering Wheels
description: USB HID protocol reverse engineering and a custom Android force feedback driver
img: assets/img/projects/aviar/wheelCover.png
importance: 2
category: work projects
---
### Overview
Gaming steering wheels (Logitech, Thrustmaster) talk to the PC over
proprietary, undocumented USB protocols — force feedback only works through
the manufacturer's closed drivers. I reverse-engineered the protocol with
Wireshark and custom Python tooling, then reimplemented it as a native Android
driver: full USB HID handling plus force feedback effects.

The deployment target was standalone VR: the driver made Meta Quest the first
standalone headset with native gaming wheel support and removed the €1,000+ PC
per training station.

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

Force feedback wheels had zero support on Android-based systems. On PC the
manufacturer's driver handles everything; on Android there was no
infrastructure at all — not even basic input recognition. And since the
protocols are proprietary, there was no documentation to write a driver
against. The only way in was recovering the protocol from live USB traffic.

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

## Recovering the Protocol

Two months of packet captures and analysis:

- Captured and analyzed 100+ protocol commands across the wheel's operational
  modes, using Wireshark and custom Python scripts for packet parsing and
  pattern detection
- Built automated filtering to separate relevant commands from noise
- Mapped a multi-layer protocol: initialization sequences, mode switching,
  bidirectional data flow
- Wrote a standalone Android debugging utility to test protocol hypotheses
  quickly in a similar OS environment

## Driver Implementation

- Built complete Java-based driver emulation as Android Native Plugin for Unity
- Implemented full USB HID protocol handling through Android USB Host API
- Implemented force feedback effects: spring, damper, friction, constant force
- Designed Unity-facing API exposing the wheel as a standard Joystick in the
  Unity Input System, so any Unity project can use it without special handling

## Architecture

<div class="col-sm mt-3 mt-md-0">
  {% include figure.liquid loading="eager" path="assets/img/projects/aviar/diagram.png" title="3" class="img-fluid rounded z-depth-1" %}
</div>

---

## Business Impact

**Industry First:**
The only standalone VR application with native USB force feedback wheel
support. Every competing VR training solution still requires a PCVR setup.

### Business Value

- Eliminated €1,000+ PC hardware requirement per training station
- Enabled fully portable demo setups for trade shows and client presentations
- Real force feedback during vehicle operations instead of a passive wheel
- Modular architecture: supporting a new wheel model mostly means adapting its
  protocol, not rewriting the driver

**Reception:** At aviation trade shows, the part that got attention was the
missing PC — mobile training deployments no longer needed one.
