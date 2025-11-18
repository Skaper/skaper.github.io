---
layout: page
title: project 5
description: a project with a background image
img: assets/img/1.jpg
importance: 3
category: personal projects
published: false
---
# VR Space Adventure - Technical Portfolio

## Project Overview
**Reabell** - First-person VR space exploration game featuring non-standard gravity mechanics, ship combat, and survival puzzles. Solo developer project showcasing rapid prototyping of unique VR mechanics.

🔗 [Play on itch.io](https://skaperdev.itch.io/reabell)

**Inspired by:** 2001: A Space Odyssey's rotating station gravity scenes

TODO: VIDEO.

## Development Journey

### Platform Evolution
**Google Cardboard (Android) → Meta Quest Migration**

**Initial Challenge:**
- Developed for mobile VR with Bluetooth dual-joystick control
- Low-poly art style for mobile optimization
- Critical issue: Severe phone overheating

**Solution:**
- Ported to Meta Quest standalone platform
- Rebuilt controls for native VR input
- Maintained performance-focused design philosophy

## Tech Stack
- **Engine**: Unity 2019.4 LTS
- **VR Framework**: BNG Framework, Unity XR Interaction Toolkit
- **Third-party**: Invector AI System, Battlehub Spline Editor

## Core Mechanics Implementation

### 🌀 1. Multi-Directional Gravity Station
**"Walking on Walls" Puzzle Level**

**Concept:**
Circular space station divided into 3 sections at different angles (horizontal, vertical, inverted) connected by a gravity transition ring - inspired by 2001: A Space Odyssey.
<div class="project-video">
  <iframe
    src="https://www.youtube.com/embed/NIfS7lN61CE?si=qDsrTTlu0WV2iq59&amp;start=1244"
    title="YouTube video player"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>
</div>

**Technical Implementation**

```csharp
// Smooth gravity transition in ring corridor
void OnTriggerStay(Collider col) {
    if (col.CompareTag("Player/GravityCollider")) {
        var targetGravity = Quaternion.Euler(angle) * Vector3.up;
        RotateRigidbody(transform, targetGravity.normalized);
    }
}

// Cylindrical gravity calculation
var onNormal = (Origin.position + transform.forward) - Origin.position;
var center = Vector3.Project(
    (rigidbody.position - Origin.position), 
    onNormal
) + Origin.position;

// Apply centripetal-like force
var angle = CalculateAngle(Vector3.up, target);
var gravity = new Vector3(
    -Mathf.Sin(angle * Mathf.Deg2Rad), 
    Mathf.Cos(angle * Mathf.Deg2Rad), 
    0
) * -9.81f;
```

**Features:**
- **Universal Gravity System**: All interactive objects respond to local gravity via `IGravityChanged` interface
- **Smooth Transitions**: Player orientation interpolates when crossing boundaries
- **Physics Consistency**: `ConstantForce` dynamically adjusted based on surface normal

**Gameplay Loop:**
1. **Oxygen Survival**
    - Timed oxygen depletion
    - Refill stations scattered across sections
    - Post-processing vignette warning system


2. **Battery Collection Puzzle**
   ```csharp
   // Magnetic socket attraction
   battery.position = Vector3.Lerp(current, socket, 
       attractSpeed * Time.deltaTime);
   battery.rotation = Quaternion.RotateTowards(current, 
       socket, rotateSpeed * Time.deltaTime);
   ```
    - 3 batteries needed to power charging station
    - Each section contains one battery
    - Gravity-affected physics puzzles

3. **Tower Defense Phase**
    - Enemy wave system spawns after battery collection
    - Protect charging crane for 60 seconds
    - Tower health system with destruction physics

---

###  2. Space Combat & Flight Simulation
**6-DOF Ship Combat Level**
<div class="project-video">
  <iframe
    src="https://www.youtube.com/embed/NIfS7lN61CE?si=O2AM0D0Op1sfFff3&amp;start=251"
    title="YouTube video player"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>
</div>

**Ship Physics**
```csharp
// VR dual-stick flight controls
float pitch = -input.RightThumbstickAxis.y * turnSpeed;
float roll = -input.RightThumbstickAxis.x * turnSpeedRoll;
float yaw = input.LeftThumbstickAxis.x * turnSpeed;
float thrust = input.RightGrip; // Analog trigger

// Energy management system
if (inputThrust > 0.1f && energyLevel > 0.1f) {
    thrust += thrustIncreaseSpeed * Time.deltaTime;
    energyLevel -= energyDecrease * Time.deltaTime;
} else {
    energyRegenerationTimer += Time.deltaTime;
    if (timer > regenerationDelay)
        energyLevel += energyRecovery * Time.deltaTime;
}
```

**Mission Structure:**
1. **Navigation Gates** - Fly through checkpoints to calibrate systems
2. **Beacon Destruction** - Disable signal jammer
3. **Enemy Dogfights** - Combat AI fighters
4. **Wreckage Investigation** - Scan ancient battlefield debris
5. **Capital Ship Docking** - Navigate into massive carrier

**3D Spherical Radar**
```csharp
void FixedUpdate() {
    float dist = Vector3.Distance(transform.position, 
        target.position);
    
    // Project target onto sphere surface
    Vector3 targetVector = (target.position - 
        transform.position).normalized * radius + 
        transform.position;
    
    targetPointer.position = targetVector;
    
    // Distance indicator (clamped at 5000m)
    distanceText.text = Mathf.Min(dist, 5000).ToString();
}
```

**Enemy AI Ships**
```csharp
// Dynamic obstacle avoidance (4-ray system)
RaycastHit upHit, downHit, leftHit, rightHit;
if (upHit.distance <= sensDistance) 
    targetAngle.x += rotateAngle;

// Orbital combat behavior
if (distanceToPlayer <= minDistanceToTarget) {
    moveOnOrbit = true;
    // Tangential movement using cross product
    targetRotation = Quaternion.LookRotation(
        Vector3.Cross(targetDir, Vector3.up)
    ) * Quaternion.Euler(avoidanceAngle);
}

// Adaptive detection sphere
sphereCollider.radius = linearK * Mathf.Sqrt(dist) + linearB;
```

**Features:**
- Real-time energy/shield UI indicators
- Audio feedback system (engine thrust, navigation thrusters)
- Weapon overheating mechanics
- Scanner system with data overlay

---

### 3. Capital Ship Interior Escape
**Laser Turrets & Shield Deflection**

**AI Turret System**


**"Crazy Turret" Variant:**
- Spinning barrel with unpredictable fire patterns
- Randomized delay: `Random.Range(baseDelay/3f, baseDelay*1.5f)`
- Increased difficulty scaling

**Shield Deflection** (`BulletTurret.cs`)
```csharp
// Reflect projectiles back at turret
if (reflectBullet && Vector3.Distance(transform.position, 
    hitPoint) < 0.25f) {
    
    Quaternion randomRotation = Quaternion.Euler(
        Random.Range(-40f, 40f),
        Random.Range(-40f, 40f),
        Random.Range(-40f, 40f)
    );
    
    rigidbody.velocity = Vector3.zero;
    rigidbody.AddForce(-0.5f * randomRotation * originalForce);
}
```

**VR Camera Shake**
```csharp
// Explosion proximity feedback
float distToPlayer = Vector3.Distance(explosionPoint, 
    player.position);
if (distToPlayer <= 10f) {
    CameraShaker.Instance.ShakeOnce(
        magnitude: 10f - distToPlayer,
        roughness: 4f,
        fadeInTime: 1f,
        fadeOutTime: 1f
    );
}
```

**Level Events:**
- Escape pod door animation system
- Explosive decompression sequence
- Debris physics simulation
- Cinematic camera transitions

---

## 🔧 VR-Specific Features

### Gravity Gun
**Physics Manipulation Tool** 
<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/projects/reabell/GravityGun.gif" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

### Comfort Features
- **Snap Rotation**: 45° increments to reduce motion sickness
- **Smooth Locomotion**: Optional for advanced users
- **Vignette System**: Oxygen/health warnings via post-processing
- **Haptic Feedback**: Contextual controller vibration

### Input Abstraction
```csharp
// Cross-platform VR input layer (BNG Framework)
InputBridge.Instance.RightTriggerDown
InputBridge.Instance.LeftThumbstickAxis
InputBridge.Instance.VibrateController(...)
```


## Quest & Progression System
**Event-Driven Architecture** 
```csharp
// Modular quest trigger system
public Action onActionPlayerShipActive;
public Action<int> onActionGatesPassed;
public Action onActionBeaconDestroyed;
public Action onActionEnemiesDestroyed;

// Cross-scene state persistence
if (PlayerPrefs.GetString("CurrentProgress") == "Ep1SpaceBattle") {
    PlayerPrefs.SetString("CurrentProgress", "Ep2.1Ship");
    levelChanger.FadeToLevel("Ep2.1Ship");
}
```

**Localized AI Voice System with dynamic audio queue with hologram visuals**

## Technical Challenges & Solutions

### 1. Mobile Overheating → Quest Port
**Problem:** Android thermal throttling broke gameplay  
**Solution:**
- Native Quest SDK integration
- Removed Bluetooth lag with 6-DOF controllers
- Optimized render pipeline for mobile chipset

### 2. Gravity Transitions Causing Nausea
**Problem:** Instant reorientation = instant nausea  
**Solution:**
```csharp
// Smooth interpolation in gravity tunnels
rigidbody.MoveRotation(
    Quaternion.RotateTowards(
        current, target, 
        smoothRotationSpeed * Time.deltaTime
    )
);
```

### 3. Physics Objects in Multi-Gravity Zones
**Problem:** Objects jittering between gravity fields  
**Solution:** Interface-based system with single authority
```csharp
public interface IGravityChanged {
    void OnGravityChanged(Vector3 gravity);
}

// Each object maintains ONE gravity source
constantForce.force = gravity * rigidbody.mass;
```

### 4. VR Performance Optimization
- **Low-poly art style**: <10k tris per scene
- **Object pooling**: Bullets, explosions, enemies
- **Occlusion culling**: Manual volumes for space station
- **LOD groups**: Distant asteroids use simplified meshes
- **Async loading**: Scene transitions with progress bar

---

## Code Architecture Highlights

### Design Patterns
- **Observer**: C# Actions for decoupled event system
- **Singleton**: GameManager for cross-scene references
- **Interface**: IGravityChanged for physics consistency
- **Object Pool**: Projectile recycling
- **State Machine**: Quest progression logic

### Best Practices
```csharp
// Component caching
private Rigidbody _rigidbody;
void Awake() {
    _rigidbody = GetComponent<Rigidbody>();
}

// Delta time for frame-independent physics
thrust += thrustSpeed * Time.deltaTime;

// SerializeField over public
[SerializeField] private float speed = 10f;
```

---

## Math & Algorithms Used

✅ **Linear Interpolation**: Smooth movement, thrust curves  
✅ **Quaternion Math**: Gravity reorientation, ship rotation  
✅ **Vector Projection**: Cylindrical tunnel gravity  
✅ **Parametric Curves**: Spline-based ship paths (Bézier)  
✅ **Trigonometry**: Orbital combat, radar positioning  
✅ **Inverse Kinematics**: Not used, but planned for future turret aiming

---

## Results & Achievements

📊 **Development Stats:**
- Solo developer
- 6 months development time
- 3 unique levels with distinct mechanics
- 15+ custom gameplay systems

🎮 **Player Feedback:**
- "Non-standard gravity is mind-bending in VR"
- "Ship combat feels like Elite Dangerous meets Star Wars"
- "Oxygen survival adds real tension"

🔗 **Play Now:** [skaperdev.itch.io/reabell](https://skaperdev.itch.io/reabell)

---

## Technologies Summary
**Core:** Unity 2019.4, C#, Unity Physics  
**VR:** BNG Framework, XR Interaction Toolkit, Meta Quest SDK  
**AI:** Invector Third Person Controller (AI module)  
**Animation:** Battlehub Spline Editor, Unity Animator  
**Audio:** 3D spatial audio, dynamic mixing  
**Graphics:** Low-poly style, post-processing stack (URP)
