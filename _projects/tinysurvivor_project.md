---
layout: page
title: Tiny Survivor - Browser Roguelike for Web Game Platforms
description: Vampire Survivors-like built in Unity for WebGL and web game publishers
img: assets/img/projects/tinysurvivor/cover.png
importance: 1
category: personal projects
published: true
---

### Overview

Tiny Survivor is a top-down auto-attacking roguelike (a Vampire Survivors-like) built with Unity and shipped as a WebGL game. It runs directly in the browser on desktop and mobile - no install, click and play. The game was built for web game portals from the start: it shipped on Yandex Games, with the monetization layer designed to plug into Facebook Instant Games, VK and similar platforms. The current build is on itch.io.

<div class="project-video">
  <iframe
    src="https://www.youtube.com/embed/ckKrsjGWKQM"
    title="Tiny Survivor gameplay"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>
</div>

**Play in browser:**
- [skaperdev.itch.io/tiny-survivor](https://skaperdev.itch.io/tiny-survivor)

**Source code:**
- [BlockSurvivor on GitHub](https://github.com/Skaper/BlockSurvivor)

### Technical Stack

Unity 6, C#, URP 2D, FMOD Studio, BulletPro, Newtonsoft.Json, TextMesh Pro, custom responsive WebGL template

---

## Core loop

You control one character on a field that keeps filling with enemies. Weapons fire automatically - your job is positioning: dodge, kite, decide what's worth picking up. Killed enemies drop XP crystals. On level up the game offers a choice of upgrades: a new weapon, a passive item, or a stat boost.

There are 8 weapon types - axe, whip, bow, fire wand, lightning, fire shield, orbiting beholder, spikes - and each run you assemble a different loadout from what the level-up screen offers. That choice is the game. A run takes 10-15 minutes, which fits how people actually play browser games: short sessions, often on a phone.

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/tinysurvivor/1_en.png" title="Gameplay" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/tinysurvivor/2_en.png" title="Level up choice" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/tinysurvivor/3_en.png" title="Meta progression" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

### Enemies and pacing

Each world is split into stages, and each stage defines its own waves: which enemies spawn, how many, and when the boss shows up. Enemy types force different behavior from the player - melee swarms that chase, rangers that keep distance and shoot, exploders that punish standing still, and bosses that combine patterns.

All of this lives in data assets, not code. Wave composition, enemy counts, boss timing, weapon stats - a designer can rebalance a stage or add a new world without a programmer touching anything. That's also how the game was actually tuned: most balance changes after release were data edits.

### Meta-progression

Dying is the expected outcome, so the game needs a reason to come back. Between runs you spend earned currency in a shop: permanent stat upgrades, unlockable skins and new worlds. Chests give randomized rewards, and timed bonuses reward returning to the game later. Reward timers are checked against server time, so changing the device clock doesn't skip the wait.

This layer exists for retention - web portals measure it, and it directly affects how a game gets promoted on the platform.

---

## Under the Hood

The core is split into layers with assembly definitions, so dependency direction is enforced at compile time - gameplay code physically can't reference an ad SDK:

```
Game.Domain          pure C# game model (player progress, stats, upgrade types), no engine references
Game.Application     use cases and service contracts (ProgressService, IProgressRepository,
                     IAdsService, IAudioService, IPauseService), no engine references
Game.Infrastructure  implementations: persistence, FMOD audio, server time, device info
Game.Presentation    reusable UnityEngine/uGUI components
```

Services are resolved at a single composition point (`GameServices`). The patterns doing the actual work:

- **Repository** - saves go through `IProgressRepository`, with `PlayerPrefs` and browser `localStorage` implementations behind the same interface
- **Null Object** - `NullAdsService` and `NullAudioService` let the same build run on platforms without ads or before audio is ready; gameplay code never checks platform or service availability
- **Observer/Presenter** - meta-game UI (shop, upgrades, stats) subscribes to progress changes instead of polling
- **ScriptableObject-driven content** - weapons, enemies, stages, shop items and progression are all data assets

The rest of this page is the two problems that took the most effort: making a horde game run on WebGL, and making one build work across different publishers.

---

## Challenge 1: WebGL Performance

### One thread, no DOTS

My first instinct for a game with hundreds of enemies on screen was DOTS - it's the tool built exactly for this. But Unity's WebGL player runs everything on a single thread: no worker threads for the job system, and the parallelism that makes DOTS worth its complexity just isn't there. I dropped it and went with plain MonoBehaviours plus aggressive reuse of everything.

The rule became: nothing is instantiated during a wave. Enemies, projectiles, pickups, particles and floating damage numbers all come from pools. Pool sizes aren't guessed - each stage's data declares how many of each enemy it can have alive, and the pools are pre-warmed from that data on level load. During gameplay the pool only grows in the rare case a spawner asks for more than the stage declared.

The same discipline applies to garbage: coroutine waits are cached instead of allocated per call, and hot paths avoid per-frame allocations. On a single thread, a GC spike is a visible hitch - there's no other core to hide it on.

### Adaptive quality during gameplay

Browser games run on anything from a gaming PC to a five-year-old phone inside a webview, and you can't ship separate quality builds. So quality adapts at runtime. A `PerformanceOptimizer` measures FPS and walks URP's render scale up or down between limits defined in a graphics preset:

<details>
<summary>Show adaptive resolution code</summary>
<div markdown="1">

```csharp
private IEnumerator CheckForLowFps()
{
    yield return _waitIdle;
    while (true)
    {
        yield return _waitOptimizePerformanceInterval;
        ResolutionUpdate();
        StickyAdUpdate();
        BackgroundMusicUpdate();
    }
}

private void ResolutionUpdate()
{
    if (ActiveGraphicPresset.MaxFps < _fps)
        ImproveResolution();      // renderScale += dampen, up to MaxDPI

    if (ActiveGraphicPresset.MinFps > _fps)
        SubtractResolution();     // renderScale -= dampen, down to MinDPI
}

private void StickyAdUpdate()
{
    if (_fps <= ActiveGraphicPresset.DisableStickyAdFpsLimit)
        GetAdsService().StickyAdActivity(false);
    else if (_fps >= ActiveGraphicPresset.EnableStickyAdFpsLimit)
        GetAdsService().StickyAdActivity(true);
}
```

Each threshold pair is deliberately asymmetric (disable at 30 FPS, re-enable at 40) so the system doesn't oscillate around a boundary.

</div>
</details>

Resolution is only the first step of the degradation ladder. If FPS keeps dropping, the game turns off the sticky ad banner (browser ads cost real frame time) and then mutes background music to cut audio mixing cost. Device class is detected up front too: mobile browsers get a separate graphics preset with a lighter URP asset and a cheaper physics timestep.

### Audio: replacing the Unity engine with FMOD

Unity's built-in audio on WebGL was the single most browser-dependent thing in the project - in some browsers sounds lagged behind the action, in others they didn't play at all. I moved the whole project to FMOD Studio, which uses its own Web Audio backend and behaves the same across browsers.

FMOD on the web wants its banks loaded before anything plays, so the master bank loads during the initial loading screen and the game waits for sample loading to finish. Buses gave me clean control points for free: one call mutes the master bus when the browser tab loses focus, and the ads system uses the same mechanism to silence the game during a video ad - portals check for that during moderation.

### UI and the itch.io iframe

The game runs inside an iframe on someone else's page, on screens from a 4:3 monitor to a tall phone. The stock Unity WebGL template doesn't survive that, so I wrote a custom one. The nastiest part was mobile: percentage and viewport-height sizing are unreliable inside a cross-origin iframe and behind mobile browser bars, and when the canvas CSS height can't resolve, it falls back to the attribute size - the desktop resolution - cropping the right and bottom of the game. The fix is sizing the canvas in pixels from `window.innerWidth`/`innerHeight` on every resize and orientation change. `window.visualViewport` looks like the right API but inside a cross-origin iframe it can report the host page's viewport, so I deliberately avoided it.

In-game UI adapts too: layouts scale from a reference resolution and a virtual joystick appears only for touch input.

### Saves that survive an update

A dumb problem that cost real players' progress: on WebGL, `PlayerPrefs` is stored in IndexedDB keyed by the page URL - and itch.io changes the build URL on every upload. Every update wiped every player's save. The fix is a second `IProgressRepository` implementation that writes to browser `localStorage` through a small `.jslib` plugin with a fixed key, and falls back to reading old `PlayerPrefs` data for migration.

<details>
<summary>Show localStorage repository</summary>
<div markdown="1">

```csharp
public class LocalStorageProgressRepository : IProgressRepository
{
    private const string StorageKey = "BlockSurvivor.GameProgress";

    private readonly PlayerPrefsProgressRepository _playerPrefs = new();

    [DllImport("__Internal")]
    private static extern void BlockSurvivorStorageSave(string key, string data);

    [DllImport("__Internal")]
    private static extern string BlockSurvivorStorageLoad(string key);

    public PlayerProgress Load()
    {
        if (BlockSurvivorStorageHasKey(StorageKey) == 1)
        {
            var dto = JsonUtility.FromJson<ProgressSaveDto>(BlockSurvivorStorageLoad(StorageKey));
            if (dto != null)
                return ProgressDtoMapper.ToModel(dto);
        }

        return _playerPrefs.Load(); // migrate old saves
    }

    public void Save(PlayerProgress progress)
    {
        BlockSurvivorStorageSave(StorageKey, JsonUtility.ToJson(ProgressDtoMapper.ToDto(progress)));
    }
}
```

The `.jslib` side is four small functions wrapping `localStorage.setItem`/`getItem` with try/catch, since storage access can throw in private browsing modes.

</div>
</details>

---

## Challenge 2: One Game, Many Publishers

Every web game portal has its own JavaScript SDK with its own ad calls, its own events, its own moderation checklist. Yandex Games, Facebook Instant Games, VK - same idea, completely different APIs. And itch.io has no SDK at all. I didn't want a single `#if YANDEX` in gameplay code.

The whole ads surface is one interface in the Application layer:

```csharp
public interface IAdsService
{
    event Action OpenFullAdEvent;
    event Action CloseFullAdEvent;
    event Action<int> RewardVideoEvent;

    bool IsAdActive();
    void FullscreenShow();
    bool IsReadyFullscreenAd();
    void StickyAdActivity(bool state);
    void RewardShow(int id = 0);
}
```

The target platform is a field in a build settings asset, and the provider behind the interface switches on it - the Yandex implementation wraps the Yandex Games SDK events, other portals get their own adapter, and the itch.io build just uses `NullAdsService`, where every method is a no-op. Gameplay code calls `FullscreenShow()` either way and never knows whether an ad exists.

<details>
<summary>Show platform ad provider</summary>
<div markdown="1">

```csharp
public static void FullscreenShow()
{
    switch (SystemTools.GetBuildSettings().TargetPlatform)
    {
        case BuildSettings.Platforms.Yandex:
            YandexGame.FullscreenShow();
            break;
        case BuildSettings.Platforms.Vk:
            // VK bridge call
            break;
        case BuildSettings.Platforms.PC:
            break;
    }
}

public static bool IsReadyFullscreenAd()
{
    var currentSessionNumber = GameProgress.GetData().totalGameSessions;
    // Don't show ads during the first 3 sessions
    if (currentSessionNumber < 3)
        return false;
    ...
}
```

</div>
</details>

The interface is thin, but most of the work is in the details around it:

- **Ad pacing as game design.** No interstitials at all for a player's first 3 sessions - a new player who hits an ad before they're hooked just closes the tab. Interstitials only appear at natural pauses (level-up screens), behind a 3-second countdown so the cut to an ad never feels like a bug.
- **Audio contract.** The FMOD master bus mutes when an ad opens and restores when it closes. Portals test for this during review; a game that plays music over an ad gets rejected.
- **Rewarded ads feed the meta-game.** Watch a video, get premium currency or a chest - the reward hook is one event subscription away from any UI element.
- **Sticky banners respect performance.** The same FPS monitor that drops resolution also disables the banner on struggling devices. An ad that kills the framerate costs more players than it earns money.
- **Moderation is a real dev phase.** Each portal reviews builds against its own rules - several release commits in the history are literally titled "moderation fixes." The abstraction meant those fixes stayed inside one adapter instead of leaking into gameplay.

---

## What I'd Do Differently

The service layer arrived by refactoring, not by design - early versions used static singletons everywhere, and a few (`PerformanceOptimizer.instance`, the pools) still exist alongside `GameServices`. Migrating the rest is mechanical work I haven't prioritized. Starting the project with the layered structure would have been cheaper than retrofitting it.

I'd also budget for browser testing much earlier. Most of the WebGL pain in this project - audio, saves, the iframe canvas sizing - was invisible in the editor and only showed up on real devices in real browsers.

---

## Result

Shipped on Yandex Games, current build live on [itch.io](https://skaperdev.itch.io/tiny-survivor). Runs in mobile and desktop browsers with adaptive quality holding playable framerates on low-end phones. New weapons, enemies and worlds are added as data assets without touching code - and the monetization layer swaps per publisher without touching gameplay.
