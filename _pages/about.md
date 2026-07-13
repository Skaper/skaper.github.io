---
layout: about
title: about
permalink: /
subtitle: 

profile:
  align: right
  image: prof_pic.jpg
  image_circular: false # crops the image to make it circular

selected_papers: false # includes a list of papers marked as "selected={true}"
social: true # includes social icons at the bottom of the page
qr_code: /assets/img/qr_code.svg

announcements:
  enabled: false # includes a list of news items
  scrollable: false # adds a vertical scroll bar if there are more than 3 news items
  limit:

projects:
  enabled: true
  scrollable: true # adds a vertical scroll bar if there are more than 3 project items
  limit:
---

## DANIIL ROSTOVSKII
Software engineer with 5+ years building real-time interactive systems — games, VR training platforms, robotics. The kind of software where a missed frame is a bug and the hardware budget is fixed. **Based in Tokyo, Japan**.

What I've shipped:

- **Systems & reverse engineering** — Reverse-engineered undocumented USB HID protocols and wrote an Android driver (Java/JNI) for force-feedback steering wheels at [AVIAR](https://www.aviar.nl/), where I delivered 10+ VR training scenarios for Lufthansa, Swissport, and DHL. First standalone VR product with native wheel support — removed the €1,000+ PC per training station.

- **Architecture & platform consolidation** — Merged 12 independent safety training simulators into one modular codebase at [PromVR](https://promvr.net/): Zenject DI, licensing with CRM integration, automated multi-platform builds. One codebase to maintain instead of twelve.

- **Performance engineering** — Solo-developed [JankerMan](https://www.meta.com/experiences/jankerman-alpha/6521195701244535/), a VR roguelike on full DOTS/ECS: hundreds of concurrent enemies at 72 FPS on mobile-class hardware (Meta Quest 2) — data-oriented design, Burst, Job System.

- **Developer tools & SDKs** — Extended the [Varwin](https://varwin.com/en/) no-code platform with 40+ visual programming blocks (+25% standard library) and 100+ pages of SDK documentation, used by 90+ clients across 24 countries. Built VR analytics tools for Jacobs and Auchan retail research.

**Languages:** C# • Python • Java • C/C++ (embedded)

**Engineering:** Unity DOTS/ECS (Burst, Job System) • Multiplayer Networking • Custom Physics & IK • Behavior Trees • Dependency Injection (Zenject) • UniRx/UniTask • SOLID

**Also worked with:** ROS • OpenCV • Electron/IPC • REST & CRM integrations • CI/CD

Open to: Software Engineering | Game & XR Development | Real-time Systems