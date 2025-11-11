---
layout: page
title: Standalone VR Gaming Wheel Support
description: Industry-First Native USB Force Feedback Wheel Driver for Meta Quest
img: assets/img/projects/aviar/wheelCover.png
importance: 2
category: work
giscus_comments: true
---
# Industry-First: Native USB Force Feedback Wheel Driver for Meta Quest
### Overview
Developed the world's first native USB gaming wheel driver for standalone VR
headsets, enabling force feedback steering wheel support on Meta Quest without
requiring a PC. This breakthrough eliminated the €1,000+ PC requirement per
training station and enabled fully portable VR vehicle simulation setups.

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

#### Technical Stack
Android USB Host API, Java Native Interface (JNI), Unity Native Plugins, Python
(protocol analysis), Wireshark, USB HID Protocol, Unity Input System

## The Challenge

Gaming steering wheels with force feedback had zero support on Android-based
systems. Unlike PC platforms with mature driver ecosystems, Android lacked any
infrastructure for these devices—not even basic input recognition. No public
documentation existed for the proprietary communication protocols used by major
wheel manufacturers (Logitech, Thrustmaster), making native Android support
seemingly impossible.

**Industry Gap:** All competing VR training solutions required expensive PCVR
setups. No standalone VR application had ever achieved native wheel support.

<div class="ratio ratio-16x9 mx-auto my-4 w-100">
  <iframe
    src="https://www.youtube.com/embed/Jdm898xkbGw?si=RUXaqA6iZ6qntQRf"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>
</div>

## Technical Approach

**Reverse Engineering (2 months)**

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
- Developed comprehensive force feedback support (spring, damper, friction,
  constant force effects)
- Designed Unity-facing API to expose wheel as standard Joystick in Unity Input
  System, enabling seamless integration into any Unity project

### Architecture:
<div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/aviar/diagram.png" title="3" class="img-fluid rounded z-depth-1" %}
</div>

### Impact

**Industry First:**
Delivered the market's only standalone VR application with native USB force
feedback wheel support—a capability that remains unavailable in competing
solutions.

#### **Business Value:**

- Eliminated €1,000+ PC hardware requirement per training station
- Enabled fully portable demo setups for trade shows and client presentations
- Increased training immersion through realistic force feedback during vehicle
  operations
- Modular architecture allows rapid support for additional wheel models with
  minimal protocol adaptation

**Reception:** Industry professionals at aviation trade shows recognized this as
a significant breakthrough, particularly valuing the elimination of PC
dependency for mobile training deployments.
