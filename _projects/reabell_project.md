---
layout: page
title: reAbell - VR Space Game Development
description: My first VR project
img: assets/img/projects/reabell/cover.png
importance: 1
category: personal projects
published: true
---
### Overview
Solo VR project developed over 6 months. Started on Android/Google Cardboard, later ported to Meta Quest 2.
Inspired by the rotating station scene from 2001: A Space Odyssey - I wanted to recreate walking on walls and ceilings with artificial gravity in VR.

<div class="project-video">
  <iframe
    src="https://www.youtube.com/embed/OLaNpr7XqwY?si=Cfq1Y9rztHBNUsBy"
    title="reAbell"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>
</div>

**Try reAbell:**
- [Itch.io](https://skaperdev.itch.io/reabell)

### Technical Stack
Unity 2019.4, C#, BNG Framework, Meta Quest SDK, Invector AI, Custom gravity physics, Meta Quest 2/3 (originally Android/Cardboard)

---

## Starting with Android/Cardboard

This was my first VR project. I wanted to make that scene from *2001: A Space Odyssey* where the astronaut runs around the rotating station with artificial gravity. Walking on walls and ceilings in VR seemed like a cool idea to try.
<div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/reabell/2001.jpg" title="1" class="img-fluid rounded z-depth-1" %}
</div>
I started developing for Android phone with Google Cardboard. Seemed like a good starting point - most people have phones, so potentially more players could try it.

### The Overheating Problem

The main problem was the phone getting too hot. After 10-15 minutes of playing, the phone would overheat badly. Not just warm - actually hot enough that the CPU would throttle and the framerate would drop. In VR, low framerate makes you sick pretty fast.

I tried optimizing everything - reduced draw calls, aggressive LOD, simplified physics. Nothing really helped for long. The phone was doing too much: physics calculations, 3D audio, constant sensor reading.

So I modified the headset. I took a small USB fan, connected it to a battery pack, and mounted it inside the Cardboard with tape. It looked ridiculous but it worked - gave me maybe 5-10 extra minutes before throttling. Not a real solution, but better than nothing.


Here's an early prototype of the gravity station level running on Samsung Galaxy S6.
<div class="project-video">
  <iframe
    src="https://www.youtube.com/embed/mQQVZFhYrCs?si=OLzPPrU4c-ofJSZc"
    title="reAbell"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>
</div>


### Controller Issues

I used two Bluetooth joysticks for controls. They worked for movement and looking around, but they had no positional tracking. Just analog sticks and buttons.

The problem: how do you interact with objects in VR when you can't reach out and grab them?

My solution was making a Gravity Gun that followed your head direction. You look at an object, pull the trigger, it pulls toward you. Hold another button to charge power, then release to throw it. Like Half-Life 2's gravity gun but locked to where you're looking.

<details>
<summary>Show Gravity Gun Code</summary>
<div markdown="1">

```csharp
public interface IInteractable
{
    void OnTargeted();
    void OnReleased();
    Vector3 GetAttractPoint();
}

public class GravityGunController : MonoBehaviour
{
    [Header("Raycast Settings")]
    [SerializeField] private float maxDistance = 15f;
    [SerializeField] private LayerMask interactableLayers;
    
    [Header("Performance")]
    [SerializeField] private float raycastInterval = 0.1f;
    
    private Transform headTransform;
    private IInteractable currentTarget;
    private WaitForSeconds raycastWait;
    
    private void Awake()
    {
        headTransform = Camera.main.transform;
        raycastWait = new WaitForSeconds(raycastInterval);
        StartCoroutine(ScanForTargets());
    }
    
    private IEnumerator ScanForTargets()
    {
        while (enabled)
        {
            if (Physics.Raycast(
                new Ray(headTransform.position, headTransform.forward),
                out RaycastHit hit,
                maxDistance,
                interactableLayers))
            {
                ProcessHit(hit);
            }
            else
            {
                ReleaseCurrentTarget();
            }
            
            yield return raycastWait;
        }
    }
    
    private void ProcessHit(RaycastHit hit)
    {
        if (hit.collider.TryGetComponent<IInteractable>(out var target))
        {
            if (currentTarget != target)
            {
                ReleaseCurrentTarget();
                currentTarget = target;
                currentTarget.OnTargeted();
            }
        }
    }
    
    private void ReleaseCurrentTarget()
    {
        currentTarget?.OnReleased();
        currentTarget = null;
    }
}
```

</div>
</details>

Not perfect, but it worked with the hardware I had.

### Low-Poly Graphics
I chose low-poly style from the start because mobile GPUs are weak. Every model under 10k triangles, optimized textures. It wasn't just art direction - it was necessary to run on different phone models without overheating even worse.

---

## Moving to Meta Quest 2

After dealing with phone limitations for months, I switched to Meta Quest 2. Standalone VR headset with hand tracking and 6DOF controllers.

The port took a few weeks - mainly rebuilding the input system and adjusting for different performance. But now I could use actual hand controllers instead of head-locked interactions.

The Gravity Gun moved from your head to your hand, with proper pointing and haptic feedback. Much better experience.

And no more overheating issues. The Quest 2 cooling system is designed for VR.

---

## Level 1: Multi-Gravity Station
<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/reabell/screenshot_1png.png" title="1" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/reabell/screenshot_2png.png" title="2" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
This level was the main reason I started the project. A space station with three sections at different angles - horizontal, vertical, and upside-down. Connected by a ring corridor that smoothly transitions between gravity directions.

### Making It Not Nauseating

First attempt: instant gravity flip when crossing boundaries. Players took the headset off immediately. Your brain doesn't like sudden orientation changes.

Solution: smooth rotation in the transition corridor.

<details>
<summary>Show Gravity Transition Code</summary>
<div markdown="1">

```csharp
public class GravityTransitionZone : MonoBehaviour
{
    [Header("Configuration")]
    [SerializeField] private Transform gravityOrigin;
    [SerializeField] private AnimationCurve transitionCurve = AnimationCurve.EaseInOut(0, 0, 1, 1);
    [SerializeField] private float transitionSpeed = 45f;
    
    private readonly HashSet<IGravityAffected> affectedObjects = new();
    private readonly Dictionary<IGravityAffected, Coroutine> activeTransitions = new();
    
    private void OnTriggerEnter(Collider other)
    {
        if (other.attachedRigidbody && 
            other.attachedRigidbody.TryGetComponent<IGravityAffected>(out var affected))
        {
            affectedObjects.Add(affected);
            
            if (activeTransitions.TryGetValue(affected, out var existing))
            {
                StopCoroutine(existing);
            }
            
            activeTransitions[affected] = StartCoroutine(ApplyGravityTransition(affected));
        }
    }
    
    private IEnumerator ApplyGravityTransition(IGravityAffected affected)
    {
        while (affectedObjects.Contains(affected))
        {
            Vector3 radialVector = affected.Position - gravityOrigin.position;
            Vector3 tangent = Vector3.Project(radialVector, transform.forward);
            Vector3 centerPoint = gravityOrigin.position + tangent;
            
            Vector3 newGravityDirection = (centerPoint - affected.Position).normalized;
            Quaternion targetRotation = Quaternion.FromToRotation(affected.UpVector, -newGravityDirection);
            
            float step = transitionSpeed * Time.deltaTime;
            affected.ApplyRotation(Quaternion.RotateTowards(affected.Rotation, targetRotation * affected.Rotation, step));
            affected.SetGravityDirection(newGravityDirection);
            
            yield return null;
        }
        
        activeTransitions.Remove(affected);
    }
    
    private void OnTriggerExit(Collider other)
    {
        if (other.attachedRigidbody && 
            other.attachedRigidbody.TryGetComponent<IGravityAffected>(out var affected))
        {
            affectedObjects.Remove(affected);
        }
    }
}

public interface IGravityAffected
{
    Vector3 Position { get; }
    Vector3 UpVector { get; }
    Quaternion Rotation { get; }
    void ApplyRotation(Quaternion rotation);
    void SetGravityDirection(Vector3 direction);
}
```

</div>
</details>

Takes 2-3 seconds to rotate as you walk through. Your brain can adapt to gradual changes. Added some edge vignetting during transitions and it felt natural.

### Gameplay

The level is a timed survival puzzle:

**Battery Collection Phase**
Find 3 energy cells across the three platforms while managing oxygen. Oxygen depletes over time. Below 20%, screen vignettes and breathing gets heavy. At 0%, you take damage.

<details>
<summary>Show Oxygen System Code</summary>
<div markdown="1">

```csharp
public class OxygenSystem : MonoBehaviour
{
    [System.Serializable]
    public struct OxygenSettings
    {
        [Range(0, 100)] public float criticalThreshold;
        [Range(0, 20)] public float maxVignetteIntensity;
        public float damageRate;
        public AnimationCurve suffocationCurve;
    }
    
    [SerializeField] private OxygenSettings settings;
    
    public event System.Action<float> OnOxygenChanged;
    public event System.Action OnCriticalOxygenReached;
    public event System.Action OnSuffocationStarted;
    
    private float currentOxygen = 100f;
    private bool isCritical;
    private bool isSuffocating;
    
    public float OxygenLevel => currentOxygen;
    public float NormalizedCriticalLevel => Mathf.Clamp01(currentOxygen / settings.criticalThreshold);
    
    public void ConsumeOxygen(float amount)
    {
        SetOxygen(currentOxygen - amount);
    }
    
    public void ReplenishOxygen(float amount)
    {
        SetOxygen(Mathf.Min(currentOxygen + amount, 100f));
    }
    
    private void SetOxygen(float value)
    {
        float previous = currentOxygen;
        currentOxygen = Mathf.Clamp(value, 0f, 100f);
        
        if (Mathf.Abs(previous - currentOxygen) > 0.01f)
        {
            OnOxygenChanged?.Invoke(currentOxygen);
            UpdateOxygenState();
        }
    }
    
    private void UpdateOxygenState()
    {
        bool wasCritical = isCritical;
        bool wasSuffocating = isSuffocating;
        
        isCritical = currentOxygen < settings.criticalThreshold;
        isSuffocating = currentOxygen <= 0f;
        
        if (isCritical && !wasCritical)
            OnCriticalOxygenReached?.Invoke();
            
        if (isSuffocating && !wasSuffocating)
            OnSuffocationStarted?.Invoke();
    }
    
    public float GetVignetteIntensity()
    {
        if (!isCritical) return 0f;
        
        float t = 1f - NormalizedCriticalLevel;
        return settings.suffocationCurve.Evaluate(t) * settings.maxVignetteIntensity;
    }
    
    public float GetDamageAmount()
    {
        return isSuffocating ? settings.damageRate * Time.deltaTime : 0f;
    }
}
```

</div>
</details>

Oxygen tanks are scattered around - grab one, twist the valve, refill your oxygen. Creates a risk-reward loop of how far you explore before going back for air.

**Defense Phase**
Insert all batteries, charging starts. 60 second timer. Then enemy drones spawn and attack the charging station. You defend it until charging completes.

The multi-gravity becomes tactical - enemies on the floor, you can run to the wall section. They can't track well across gravity zones. You can throw objects from unexpected angles with the Gravity Gun.

---

## Level 2: Space Ship Combat

This was me trying to make *Elite Dangerous* style combat.

Physics are semi-realistic - you drift, momentum builds. I added rotational damping so you don't spin forever, but kept linear momentum.
<div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/reabell/screenshot_4png.png" title="1" class="img-fluid rounded z-depth-1" %}
</div>

### Ship Controls

Six degrees of freedom with energy management:
- Right stick: pitch and roll
- Left stick: yaw and vertical thrust
- Right trigger: forward thrust (analog)

<details>
<summary>Show Ship Flight Controller Code</summary>
<div markdown="1">

```csharp
public class ShipFlightController : MonoBehaviour
{
    [System.Serializable]
    public struct FlightDynamics
    {
        public float maxAngularVelocity;
        public AnimationCurve responseCurve;
        public Vector3 rotationalDamping;
        public float returnToNeutralRate;
    }
    
    [SerializeField] private FlightDynamics dynamics;
    
    private struct AxisState
    {
        public float current;
        public float target;
        public float velocity;
        public float dampingFactor;
        
        public void Update(float input, float returnRate, float deltaTime)
        {
            if (Mathf.Abs(input) > 0.01f)
            {
                target = input;
                velocity = 0f;
            }
            else
            {
                target = Mathf.SmoothDamp(target, 0f, ref velocity, 1f / returnRate);
            }
            
            current = Mathf.Lerp(current, target, dampingFactor * deltaTime);
        }
    }
    
    private AxisState pitch, yaw, roll;
    private Rigidbody shipRigidbody;
    
    private void Awake()
    {
        shipRigidbody = GetComponent<Rigidbody>();
        shipRigidbody.maxAngularVelocity = dynamics.maxAngularVelocity;
        
        pitch.dampingFactor = dynamics.rotationalDamping.x;
        yaw.dampingFactor = dynamics.rotationalDamping.y;
        roll.dampingFactor = dynamics.rotationalDamping.z;
    }
    
    public void ProcessFlightInput(Vector3 rotationInput)
    {
        float deltaTime = Time.fixedDeltaTime;
        
        pitch.Update(rotationInput.x, dynamics.returnToNeutralRate, deltaTime);
        yaw.Update(rotationInput.y, dynamics.returnToNeutralRate, deltaTime);
        roll.Update(rotationInput.z, dynamics.returnToNeutralRate, deltaTime);
        
        Vector3 torque = new Vector3(
            dynamics.responseCurve.Evaluate(Mathf.Abs(pitch.current)) * Mathf.Sign(pitch.current),
            dynamics.responseCurve.Evaluate(Mathf.Abs(yaw.current)) * Mathf.Sign(yaw.current),
            dynamics.responseCurve.Evaluate(Mathf.Abs(roll.current)) * Mathf.Sign(roll.current)
        );
        
        shipRigidbody.AddRelativeTorque(torque, ForceMode.Acceleration);
    }
}
```

</div>
</details>

Energy drains when using thrusters or weapons. Recharges when idle. Forces you to choose between running or fighting.

### 3D Radar

Copied from *Elite Dangerous* - spherical hologram showing objective and enemy positions with distance readouts.

<details>
<summary>Show Tactical Avoidance System Code</summary>
<div markdown="1">

```csharp
public class TacticalAvoidanceSystem : MonoBehaviour
{
    [Header("Detection")]
    [SerializeField] private float detectionRange = 10f;
    [SerializeField] private LayerMask obstacleLayer;
    [SerializeField] private int rayCount = 8;
    
    [Header("Avoidance")]
    [SerializeField] private AnimationCurve avoidanceStrength;
    [SerializeField] private float maxAvoidanceForce = 20f;
    
    private readonly struct RaycastData
    {
        public readonly Vector3 Direction;
        public readonly Vector3 AvoidanceVector;
        
        public RaycastData(Vector3 dir, Vector3 avoid)
        {
            Direction = dir;
            AvoidanceVector = avoid;
        }
    }
    
    private RaycastData[] raycastConfiguration;
    private RaycastHit[] hitBuffer;
    
    private void Awake()
    {
        InitializeRaycastConfiguration();
        hitBuffer = new RaycastHit[1];
    }
    
    private void InitializeRaycastConfiguration()
    {
        raycastConfiguration = new[]
        {
            new RaycastData(Vector3.forward, Vector3.zero),
            new RaycastData(Vector3.up, Vector3.down),
            new RaycastData(Vector3.down, Vector3.up),
            new RaycastData(Vector3.left, Vector3.right),
            new RaycastData(Vector3.right, Vector3.left),
            new RaycastData((Vector3.forward + Vector3.up).normalized, (Vector3.back + Vector3.down).normalized),
            new RaycastData((Vector3.forward + Vector3.down).normalized, (Vector3.back + Vector3.up).normalized),
            new RaycastData((Vector3.forward + Vector3.left).normalized, (Vector3.back + Vector3.right).normalized),
        };
    }
    
    public Vector3 CalculateAvoidance(Vector3 currentVelocity)
    {
        Vector3 totalAvoidance = Vector3.zero;
        float velocityMagnitude = currentVelocity.magnitude;
        
        for (int i = 0; i < raycastConfiguration.Length; i++)
        {
            Vector3 rayDirection = transform.TransformDirection(raycastConfiguration[i].Direction);
            float rayLength = detectionRange * (1f + velocityMagnitude * 0.1f);
            
            if (Physics.RaycastNonAlloc(transform.position, rayDirection, hitBuffer, rayLength, obstacleLayer) > 0)
            {
                float normalizedDistance = hitBuffer[0].distance / rayLength;
                float avoidanceMultiplier = avoidanceStrength.Evaluate(1f - normalizedDistance);
                
                Vector3 localAvoidance = raycastConfiguration[i].AvoidanceVector * avoidanceMultiplier;
                totalAvoidance += transform.TransformDirection(localAvoidance);
            }
        }
        
        return Vector3.ClampMagnitude(totalAvoidance * maxAvoidanceForce, maxAvoidanceForce);
    }
}
```

</div>
</details>

In VR you can lean in and look around the hologram to see markers behind you.

### AI Ships

Enemy ships use 4-directional raycasting for obstacle avoidance:

<details>
<summary>Show Laser Deflection System Code</summary>
<div markdown="1">

```csharp
public class LaserDeflectionSystem : MonoBehaviour
{
    [System.Serializable]
    public struct DeflectionSettings
    {
        [Range(0, 90)] public float maxDeflectionAngle;
        [Range(0, 1)] public float energyRetention;
        public AnimationCurve deflectionCurve;
        public ParticleSystem deflectionEffect;
        public AudioClip[] deflectionSounds;
    }
    
    [SerializeField] private DeflectionSettings settings;
    
    private Rigidbody projectileBody;
    private AudioSource audioSource;
    private Vector3 originalVelocity;
    
    private void Awake()
    {
        projectileBody = GetComponent<Rigidbody>();
        audioSource = GetComponent<AudioSource>();
        originalVelocity = projectileBody.velocity;
    }
    
    private void OnTriggerEnter(Collider other)
    {
        if (other.TryGetComponent<IShieldSystem>(out var shield))
        {
            ProcessDeflection(shield);
        }
    }
    
    private void ProcessDeflection(IShieldSystem shield)
    {
        float shieldStrength = shield.GetDeflectionStrength();
        Vector3 deflectionNormal = shield.GetDeflectionNormal(transform.position);
        
        Vector3 reflectedDirection = Vector3.Reflect(projectileBody.velocity.normalized, deflectionNormal);
        float deflectionAngle = settings.deflectionCurve.Evaluate(shieldStrength) * settings.maxDeflectionAngle;
        
        Quaternion randomRotation = Quaternion.AngleAxis(
            Random.Range(-deflectionAngle, deflectionAngle), 
            Vector3.Cross(reflectedDirection, deflectionNormal)
        );
        
        Vector3 finalDirection = randomRotation * reflectedDirection;
        float retainedSpeed = originalVelocity.magnitude * settings.energyRetention * shieldStrength;
        
        projectileBody.velocity = finalDirection * retainedSpeed;
        
        PlayDeflectionEffects(shield.transform.position);
        shield.OnSuccessfulDeflection(retainedSpeed * (1f - settings.energyRetention));
    }
    
    private void PlayDeflectionEffects(Vector3 impactPoint)
    {
        if (settings.deflectionEffect != null)
        {
            settings.deflectionEffect.transform.position = impactPoint;
            settings.deflectionEffect.Play();
        }
        
        if (settings.deflectionSounds?.Length > 0 && audioSource != null)
        {
            var clip = settings.deflectionSounds[Random.Range(0, settings.deflectionSounds.Length)];
            audioSource.PlayOneShot(clip);
        }
    }
}

public interface IShieldSystem
{
    float GetDeflectionStrength();
    Vector3 GetDeflectionNormal(Vector3 impactPoint);
    void OnSuccessfulDeflection(float absorbedEnergy);
}
```

</div>
</details>

They weave between asteroids and break off if you fly into debris. When close, they switch to strafing:


### Gameplay / Mission Structure

1. Fly through navigation gates
2. Destroy signal jammer
3. Fight 3 enemy ships
4. Scan ancient battlefield wreckage
5. Dock with capital ship

---

## Level 3: Ship Interior Escape

<div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/reabell/screenshot_3png.png" title="1" class="img-fluid rounded z-depth-1" %}
</div>


Tighter corridors, immediate danger. Different pace from open space.

### Laser Turrets

Wall and ceiling mounted turrets that track and shoot. Basic version leads the target slightly:

<details>
<summary>Show Turret Targeting System Code</summary>
<div markdown="1">

```csharp
public class TurretTargetingSystem : MonoBehaviour
{
    [Header("Tracking")]
    [SerializeField] private float trackingSpeed = 90f;
    [SerializeField] private float predictiveLeadTime = 0.3f;
    [SerializeField] private float lockOnThreshold = 5f;
    
    [Header("Firing")]
    [SerializeField] private float fireRate = 2f;
    [SerializeField] private GameObject laserPrefab;
    [SerializeField] private Transform firePoint;
    
    private ITargetable currentTarget;
    private float nextFireTime;
    
    public void AssignTarget(ITargetable target)
    {
        currentTarget = target;
    }
    
    private void Update()
    {
        if (currentTarget == null || !currentTarget.IsValid)
            return;
            
        Vector3 predictedPosition = PredictTargetPosition();
        RotateTowards(predictedPosition);
        
        if (IsLockedOn() && Time.time >= nextFireTime)
        {
            Fire();
        }
    }
    
    private Vector3 PredictTargetPosition()
    {
        Vector3 targetVelocity = currentTarget.Velocity;
        float distance = Vector3.Distance(transform.position, currentTarget.Position);
        float interceptTime = distance / GetProjectileSpeed();
        
        return currentTarget.Position + targetVelocity * Mathf.Min(interceptTime, predictiveLeadTime);
    }
    
    private void RotateTowards(Vector3 targetPosition)
    {
        Vector3 direction = (targetPosition - transform.position).normalized;
        Quaternion targetRotation = Quaternion.LookRotation(direction, transform.up);
        
        transform.rotation = Quaternion.RotateTowards(
            transform.rotation, 
            targetRotation, 
            trackingSpeed * Time.deltaTime
        );
    }
    
    private bool IsLockedOn()
    {
        Vector3 toTarget = (currentTarget.Position - transform.position).normalized;
        float angle = Vector3.Angle(transform.forward, toTarget);
        return angle < lockOnThreshold;
    }
    
    private void Fire()
    {
        nextFireTime = Time.time + (1f / fireRate);
        
        GameObject laser = Instantiate(laserPrefab, firePoint.position, firePoint.rotation);
        if (laser.TryGetComponent<IProjectile>(out var projectile))
        {
            projectile.Initialize(currentTarget, GetProjectileSpeed());
        }
    }
    
    private float GetProjectileSpeed() => 50f; // Could be configured per turret type
}

public interface ITargetable
{
    Vector3 Position { get; }
    Vector3 Velocity { get; }
    bool IsValid { get; }
}
```

</div>
</details>

Also made a "crazy" version that spins constantly and fires at random intervals:

<details>
<summary>Show Chaos Turret Code</summary>
<div markdown="1">

```csharp
public class ChaosTurret : MonoBehaviour
{
    [Header("Chaos Settings")]
    [SerializeField] private Vector3 rotationAxis = Vector3.up;
    [SerializeField] private float rotationSpeed = 180f;
    [SerializeField] private Vector2 fireIntervalRange = new(0.1f, 0.5f);
    [SerializeField] private int burstCount = 3;
    
    private float nextFireTime;
    private int remainingBursts;
    
    private void Update()
    {
        transform.Rotate(rotationAxis, rotationSpeed * Time.deltaTime, Space.Self);
        
        if (Time.time >= nextFireTime)
        {
            if (remainingBursts > 0)
            {
                Fire();
                remainingBursts--;
                nextFireTime = Time.time + 0.1f; // Short burst interval
            }
            else
            {
                remainingBursts = Random.Range(1, burstCount + 1);
                nextFireTime = Time.time + Random.Range(fireIntervalRange.x, fireIntervalRange.y);
            }
        }
    }
    
    private void Fire()
    {
        // Firing logic with spread pattern
    }
}
```

</div>
</details>

### Shield Deflection

Handheld energy shield deflects lasers at random angles:

<details>
<summary>Show Energy Shield Code</summary>
<div markdown="1">

```csharp
public class EnergyShield : MonoBehaviour, IShieldSystem
{
    [Header("Shield Properties")]
    [SerializeField] private float maxEnergy = 100f;
    [SerializeField] private float rechargeRate = 10f;
    [SerializeField] private float rechargeDelay = 2f;
    
    [Header("Deflection")]
    [SerializeField] private AnimationCurve strengthByEnergy;
    [SerializeField] private Transform shieldMesh;
    
    private float currentEnergy;
    private float lastHitTime;
    
    public float GetDeflectionStrength()
    {
        float normalizedEnergy = currentEnergy / maxEnergy;
        return strengthByEnergy.Evaluate(normalizedEnergy);
    }
    
    public Vector3 GetDeflectionNormal(Vector3 impactPoint)
    {
        return (impactPoint - transform.position).normalized;
    }
    
    public void OnSuccessfulDeflection(float absorbedEnergy)
    {
        currentEnergy = Mathf.Max(0, currentEnergy - absorbedEnergy);
        lastHitTime = Time.time;
        
        StartCoroutine(ShieldImpactEffect());
    }
    
    private void Update()
    {
        if (Time.time - lastHitTime > rechargeDelay)
        {
            currentEnergy = Mathf.Min(maxEnergy, currentEnergy + rechargeRate * Time.deltaTime);
        }
    }
    
    private IEnumerator ShieldImpactEffect()
    {
        // Visual feedback implementation
        yield return null;
    }
}
```

</div>
</details>

You can deflect shots back at turrets to destroy them.

### Camera Shake

Explosions shake the camera based on distance:

<details>
<summary>Show Explosion Manager Code</summary>
<div markdown="1">

```csharp
public class ExplosionManager : MonoBehaviour
{
    [System.Serializable]
    public struct ExplosionProfile
    {
        public AnimationCurve falloffCurve;
        public float maxRange;
        public float baseMagnitude;
        public float frequency;
        public float duration;
    }
    
    [SerializeField] private ExplosionProfile smallExplosion;
    [SerializeField] private ExplosionProfile largeExplosion;
    
    private static ExplosionManager instance;
    private ICameraShaker cameraShaker;
    
    private void Awake()
    {
        instance = this;
        cameraShaker = GetComponent<ICameraShaker>();
    }
    
    public static void TriggerExplosion(Vector3 position, ExplosionType type)
    {
        if (instance == null) return;
        
        ExplosionProfile profile = type == ExplosionType.Large ? 
            instance.largeExplosion : instance.smallExplosion;
            
        instance.ProcessExplosion(position, profile);
    }
    
    private void ProcessExplosion(Vector3 explosionPos, ExplosionProfile profile)
    {
        float distance = Vector3.Distance(explosionPos, Camera.main.transform.position);
        
        if (distance > profile.maxRange) return;
        
        float normalizedDistance = distance / profile.maxRange;
        float intensity = profile.falloffCurve.Evaluate(1f - normalizedDistance);
        
        ShakeParameters shakeParams = new()
        {
            magnitude = profile.baseMagnitude * intensity,
            roughness = profile.frequency,
            fadeInTime = 0.05f,
            duration = profile.duration * intensity
        };
        
        cameraShaker?.Shake(shakeParams);
    }
}

public struct ShakeParameters
{
    public float magnitude;
    public float roughness;
    public float fadeInTime;
    public float duration;
}

public interface ICameraShaker
{
    void Shake(ShakeParameters parameters);
}

public enum ExplosionType
{
    Small,
    Large
}
```

</div>
</details>

Close explosions shake hard, distant ones barely shake. Adds impact.

### Escape Sequence

Navigate to escape pod while the ship breaks apart. Timed destruction events - panels exploding, lights flickering, debris flying. Used Unity Animator for the sequence timing.

Pod ejects, you watch the ship through the window, level ends.

---

## What I Learned

#### Hardware constraints force different solutions
The head-locked Gravity Gun was originally created because I didn't have hand tracking. But when I ported to Quest and could hold it in your actual hand, it became much more useful - you can use it for different puzzles, manipulate physics objects from different angles, throw things while moving. What started as a workaround became a core mechanic that expanded gameplay possibilities.
#### VR comfort isn't optional
Smooth gravity transitions, snap rotation, vignetting - these are core features, not polish. First version with instant gravity flips made testers sick immediately. Had to rebuild the whole system.
####  Physics sells presence in VR
Objects with weight, momentum, collision feel real. VR amplifies these details. The Gravity Gun works because objects have mass and inertia. The ship feels like a ship because thrust builds over time.
####  Lots of iteration needed
Enemy AI was rewritten 5 times. Ship controls rebuilt twice. Oxygen system changed from countdown timer to dynamic depletion. Can't design VR on paper - you have to put on the headset and feel it.
####  Audio is critical
The oxygen tank hiss, Gravity Gun hum, engine sounds, heavy breathing - audio does more for immersion than most visual effects. When I added the heavy breathing at low oxygen, the tension increased way more than from the visual vignette.

---

## Result

- Solo project, 6 months development. Rough around the edges but everything in it is mine.
- The multi-gravity station still surprises people. Ship combat makes players lean into turns. Escape sequence gets real reactions.
- That modded Cardboard headset with the taped fan is on my shelf now.