# AI Tells — Technical Writing Reference

Companion reference for `blog-humanize`. Organized so Step 3 (vocabulary) can check a word against three buckets instead of one flat banlist — this is the part generic humanizer skills get wrong for engineering content.

## Table of contents
1. Always flag
2. Flag only in clusters
3. Legitimate in technical context — never flag
4. Structure and hedging phrases
5. Connective tissue
6. Domain-specific notes (software engineering)

---

## 1. Always flag

These almost never appear in genuine engineering writing and are near-certain AI tells regardless of context:

delve, delve into, tapestry, paradigm shift, embark on a journey, myriad (as adjective), plethora, multifaceted, in today's fast-paced world, unlock the potential of, game-changer / game-changing, testament to, a journey through, at the end of the day (as filler opener), it goes without saying.

## 2. Flag only in clusters

Fine once, a tell when 3+ appear in one post: robust, seamless, streamline, comprehensive, cutting-edge, innovative, transformative, foster/fostering, bolster, underscore, nuanced, compelling, unprecedented, evolving, imperative, overarching, intricate.

Also cluster-only: "leverage" as a verb, "landscape" as a metaphor, "ecosystem" as a metaphor, "navigate" as a metaphor ("navigate this challenge"), "harness," "realm," "synergy." See section 3 for when these are just normal technical words instead.

## 3. Legitimate in technical context — never flag

This is the list that matters most for this skill. Do not flag these when used literally/technically, only when used as vague metaphorical filler:

- **leverage** — fine: "we leverage Burst compilation for the hot path." Tell: "we leverage cutting-edge technology to deliver value."
- **robust** — fine: "robust error handling around the network layer," "robust to frame drops." Tell: "a robust and comprehensive solution."
- **seamless** — fine: describing an actual UX property you tested ("teleportation feels seamless with < 50ms latency"). Tell: "seamlessly integrates with your workflow" as an unsupported claim.
- **ecosystem** — fine: "the Unity ECS ecosystem," "the .NET package ecosystem." Tell: "the evolving AI ecosystem" (vague, non-technical referent).
- **architecture / pipeline / infrastructure** — always fine, these are literal terms in engineering writing, never flag regardless of frequency.
- **scalable / scalability** — fine when backed by a real claim (thread count, entity count, load numbers). Tell when used as an unsupported adjective ("a scalable and maintainable codebase" with nothing to back it).
- **streamline** — fine: "we streamlined the build pipeline by removing the manual step." Tell: "streamline your development process" as a generic claim.
- **cutting-edge / state-of-the-art** — borderline even in technical writing; usually better replaced with the actual version/technique name ("using DOTS 1.3" beats "cutting-edge ECS tech").

Rule of thumb: if the word is doing real technical work and could be replaced by a synonym without losing precision, it's fine. If removing the word changes nothing about the sentence's information content, it's filler.

## 4. Structure and hedging phrases

- "It's worth noting that..." / "It's important to note that..." / "It should be mentioned that..."
- "This can potentially lead to issues in certain scenarios"
- "While there are certainly tradeoffs..."
- "To be fair..." / "To be sure..."
- "In order to achieve this" → "to achieve this" / "to do this"
- "Due to the fact that" → "because"
- "The system has the ability to" → "the system can"
- "At this point in time" → "now"
- vague attribution: "many developers report," "it's a well-known issue in the community," "industry best practice suggests" — without a link/source, cut or replace with the actual source.

## 5. Connective tissue

Overused when repeated: "Moreover," "Furthermore," "Additionally," "That said," "With that in mind," "Moving forward," "When it comes to." One use per post is fine; three or more in a row is the tell.

---

## 6. Domain-specific notes (software engineering)

General principle for any stack: a term is standard vocabulary — never flag it regardless of frequency — if it names a real, checkable thing (a language feature, a component, a protocol, a measured property). A term is a tell only when it's doing decorative work instead of technical work. Judge the sentence around the term, not the term in isolation.

**Categories of terms that are always fine, in any language/framework/domain:**
- **Structural/architectural nouns**: architecture, pipeline, infrastructure, module, interface, dependency, abstraction, runtime, compiler, scheduler, allocator, cache, index, thread, process, protocol, endpoint, schema, namespace, registry. These describe real things in a system; flagging them as "AI vocabulary" would break every legitimate technical sentence.
- **Measured/quantifiable properties**: latency, throughput, memory footprint, frame time, GC pressure, allocation count, build size, cold-start time, p99, error rate. Fine at any frequency — these are what technical writing is supposed to talk about.
- **Named technologies, APIs, language/framework features**: always exempt, regardless of how "buzzwordy" they sound elsewhere (e.g. "async/await," "dependency injection," "job system," "garbage collector," "reactive stream"). A tech name is not a stylistic choice.

**Where the actual tell hides in software writing**: not in these nouns, but in the adjectives and verbs wrapped around them with no data behind them. "A robust, scalable, and seamless architecture" is a tell (three unsupported adjectives). "A three-layer architecture that handles up to 10k concurrent connections" is not, even though it's a longer sentence — it's carrying real information.

**Generic pattern to apply regardless of stack:**
- Fine: `[named technology/technique] + [what it does, ideally with a number]` — e.g. "the job scheduler cut per-frame cost from 3.1ms to 0.4ms," "switching to connection pooling dropped p99 latency by 40%."
- Tell: `[named technology] + [vague adjective, no data]` — e.g. "the job scheduler delivers a seamless, cutting-edge performance boost," "our robust and comprehensive connection pooling."

This means the same check applies whether the post is about a Unity ECS system, a Kubernetes rollout, a React component, or a database migration — swap the nouns, the pattern-matching rule doesn't change.
