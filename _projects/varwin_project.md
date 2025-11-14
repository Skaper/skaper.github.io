---
layout: page
title: Varwin - No-Code VR Platform Development
description: Solo Unity Developer
img: assets/img/projects/varwin/cover.jpg
importance: 5
category: work
---

# Varwin - No-Code VR Platform Development
Unity C# Developer | Aug 2021 – Aug 2022 | Team of 10+ developers | St. Petersburg, Russia

### Overview
Contributed to core platform development and client project delivery for Varwin XRMS, an enterprise no-code VR platform serving 90+ clients across 24 countries. 
Worked across two specialized teams: 
- **Core Platform** (engine features, VR headset support, service integrations)
- **Client Projects** (custom simulators, interactive mechanics, industrial training applications).

Expanded platform capabilities through 40+ new Blockly visual programming blocks, comprehensive SDK documentation, and production delivery of 4 major VR applications for industrial training and retail analytics.

## Technical Stack & Methodologies

**Technologies:** Unity 2018/2021, C#, JavaScript, CSS, Electron, Google Blockly, OpenXR, SteamVR, Unity NavMesh, Reflection API, IPC protocols, Unity Profiler, Frame Debugger

**VR Platforms:** Meta Quest 1/2, HTC Vive Series, Pico Neo/4, Windows Mixed Reality, OpenXR-compatible headsets

**Development Practices:** Object-oriented design, metadata-driven architecture, visual programming language design, cross-platform optimization, technical documentation, SDK development, performance profiling

<div class="project-video">
  <iframe
    src="https://www.youtube.com/embed/DQKPu0lVOmQ?si=Qt7R1Y2LNMVNyXTe"
    title="YouTube video player"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>
</div>

## Core Platform Contributions

**Visual Programming System Expansion**
- Engineered 40+ new Blockly visual programming blocks integrated with Unity backend, expanding the standard library by 25% and enabling non-technical users to create complex interactive scenarios
- Developed comprehensive object movement system including transform manipulation, Bezier curve path following with speed/easing/looping controls, Unity NavMesh-based AI navigation, and physics-based motion
- Designed and implemented interactive SDK objects becoming part of standard Varwin library: hydraulic doors, elevator platforms, button sequence mechanisms, dynamic light sources, and NPC dialogue systems
- Maintained and enhanced reflection-based communication system between Unity and Electron, ensuring seamless metadata generation for automatic Blockly block creation from C# object definitions

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/varwin/ide1.jpg" title="1" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/varwin/ide2.jpg" title="2" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/varwin/ide3.png" title="3" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

**Cross-Platform VR Support & Optimization**
- Maintained compatibility across multiple VR headset platforms through OpenXR and SteamVR integration, supporting Meta Quest, Vive, Pico, and Windows Mixed Reality devices
- Optimized multiple client scenes for standalone VR deployment, improving frame rates from 72fps to 90fps through profiling, draw call reduction, LOD implementation, and asset optimization
- Utilized Unity Profiler and external frame debugging tools to analyze rendering bottlenecks and implement performance improvements for mobile VR hardware constraints

**Object Versioning & Migration System**
- Contributed to object versioning architecture enabling backward compatibility during platform evolution
- Implemented migration scripts allowing projects to upgrade seamlessly as platform capabilities expanded
- Supported platform transition from Unity 2018 to 2021 without breaking existing client projects

**Comprehensive SDK Documentation**
- Authored 100+ pages of technical documentation for public developer portal (docs.varwin.com) covering SDK API reference, core architecture patterns, and development workflows
- Documented Unity-Electron communication protocols, Blockly integration architecture, and SDK build pipeline
- Created initialization flow diagrams illustrating startup sequences, object loading procedures, and scene management lifecycle
- Developed tutorials and example projects demonstrating SDK usage patterns and best practices

## Client Project Delivery

**Russian Railways (RZD) - Track Maintenance VR Simulator**
- Developed realistic railroad equipment simulation for track laying/removal training supporting both VR and desktop modes
- Implemented accurate equipment behavior physics, procedural training workflows, and gamified scoring system evaluating technique and safety compliance
- Created assessment framework tracking user performance, identifying procedural errors, and generating competency reports
- Delivered interactive training scenarios replacing hazardous on-track training with safe, repeatable VR practice

<div class="project-video">
  <iframe
    src="https://www.youtube.com/embed/LHiA3QtZJgI?si=94lTFLw2vr-LAaih"
    title="YouTube video player"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>
</div>

**Naval Museum - Interactive 360° Virtual Tour**
- Engineered timeline-based interactive system synchronizing 3D exhibits with 360° video playback of military vessel converted to museum
- Developed event triggering mechanism activating interactive 3D models, information overlays, and audio narration at precise video timestamps
- Implemented navigation system enabling seamless transitions between panoramic viewpoints and interactive exhibit exploration
- Created immersive virtual tour enabling remote visitors to experience vessel interiors inaccessible in physical visits

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/varwin/museum1.png" title="1" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/varwin/museum2.png" title="2" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

**Jacobs (JDE) - Eye-Tracking Retail Analytics Platform**
- Built VR market research application for global coffee brand testing product placement strategies across virtual store replicas
- Implemented eye-tracking data collection system supporting both native eye-tracking (Vive Pro Eye, Pico Neo 3 Pro Eye) and gaze-based tracking (camera center for non-equipped headsets)
- Developed heatmap visualization, attention metrics computation, and data export system for marketing analysis
- Created Excel-based shelf layout generation system automatically positioning products in 3D scenes based on spreadsheet configurations (product SKU, shelf number, position coordinates)
- Designed complete store environment interactions and level layouts enabling realistic shopping behavior observation

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/varwin/jacobs1.png" title="1" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/varwin/jacobs2.png" title="2" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

**Auchan Retail - In-Store Customer Research Application**
- Developed VR shopping simulation for major supermarket chain deployed in physical Auchan locations for customer participation
- Engineered physics-based shopping cart mechanics enabling realistic product selection, basket placement, and checkout simulation
- Optimized for standalone Meta Quest 2 deployment eliminating PC requirements for in-store installations
- Implemented product placement testing scenarios capturing customer preferences through actual purchase decisions in virtual environments
- Created deployment-ready VR experience suitable for public retail environments with intuitive controls for untrained users

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/varwin/auchan1.png" title="1" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/varwin/auchan2.png" title="2" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

