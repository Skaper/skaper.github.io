---
layout: page
title: Industrial VR Safety Training Solutions
description: Lead Unity Developer
img: assets/img/projects/promvr/cover.jpg
importance: 3
category: work
---

# Industrial VR Safety Training Solutions
Lead Unity Developer | May 2023 – Dec 2023 | Team of 9 (5 developers, 4 designers)

### Overview

Led development of B2B VR training platform serving major Russian oil & gas companies and industrial enterprises. Delivered safety compliance training simulations across 12 modules including work at heights, fire safety, hazard detection, first aid, and construction site safety protocols.

### Tech Stack
Unity, C#, Zenject, UniRx, OpenXR, Meta XR SDK, PICO SDK, Bitrix24 API, JSON-based configuration, Custom CI/CD

<div class="ratio ratio-16x9 mx-auto my-4 w-100">
  <iframe
    src="https://www.youtube.com/embed/BJGT8_QhVcw?si=bRy-Grts7ig8_nId"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>
</div>

### Major Achievement: Unified Architecture & Anti-Piracy System

Inherited 12 independent training simulators with disparate codebases and architectures. Architected and implemented complete platform unification enabling modular product delivery and robust license protection.

### Technical Approach:

- Designed modular initialization architecture using Zenject dependency injection, consolidating 12 separate projects into unified codebase with compile-time configuration system
- Built comprehensive licensing system with online/offline verification through Bitrix24 CRM integration and hardware-based protection
- Developed CRM monitoring dashboard for tracking client license usage and deployment analytics
- Created automated build pipeline on dedicated build machine supporting multi-platform compilation (Meta Quest, PICO, PCVR)

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/promvr/1.jpg" title="1" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/promvr/3.jpg" title="2" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/promvr/4.jpg" title="3" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

### Business Impact:

- Enabled flexible modular product offerings—clients could purchase any combination of training modules
- Streamlined client deployments and eliminated deployment complexity
- Protected revenue through anti-piracy measures, preventing unlicensed product copying
- Reduced ongoing maintenance overhead by consolidating codebases

<div class="ratio ratio-16x9 mx-auto my-4 w-100">
  <iframe
    src="https://www.youtube.com/embed/uVPObYeJuZY?si=ljDMdLCu9ZQ5BpOl"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>
</div>

## Core Development Contributions

### Safety Compliance Workflows

- Implemented interactive checklist systems with step-by-step verification procedures
- Built violation simulation systems demonstrating real-world safety consequences
- Created assessment and scoring frameworks for training certification

### Scenario Authoring Tools

- Developed JSON-based scenario configuration system with runtime loading, enabling non-technical staff to create and modify training content
- Built custom Unity Editor extensions and inspectors to accelerate level design workflows
- Created product configuration tools for managing different deployment packages

### Cross-Platform Optimization

- Maintained single codebase supporting mobile VR (Meta Quest, PICO) and PCVR with build configuration tooling
- Implemented comprehensive graphics optimizations: occlusion culling, LOD systems, texture atlasing/compression, baked lighting, draw call batching
- Achieved target frame rates across standalone and PC VR platforms

### UI/UX Systems

- Designed unified interface package standardizing UX across all 12 training modules
- Developed intuitive VR interaction patterns for industrial training contexts

<div class="col-sm mt-3 mt-md-0">
  {% include figure.liquid loading="eager" path="assets/img/projects/promvr/2.jpg" title="3" class="img-fluid rounded z-depth-1" %}
</div>
### Technical Leadership

- Conducted code reviews and mentored development team
- Made architectural decisions for modular system design
- Planned technical roadmap and feature prioritization

#### Training Modules Delivered

- Work at Heights Safety
- Fire Safety Qualification
- Hazard Detection & Response
- First Aid on Production Sites
- Occupational Safety Requirements
- Construction Site Safety Rules
