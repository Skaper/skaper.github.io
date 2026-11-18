---
name: blog-humanize
description: Removes AI-writing patterns from technical blog posts (Unity/C#/VR/DOTS/ECS and similar engineering content) while preserving code, commands, API names, and technical accuracy. Use whenever the user is drafting, editing, or reviewing a blog post / technical article and says things like "sounds like AI," "de-AI this," "humanize this post," "too robotic," "make this sound like an engineer wrote it," or pastes a draft and asks for a pass before publishing. Also trigger proactively whenever generating a full technical blog post draft from scratch — apply this skill's passes before presenting the final version, not just on request. Distinct from generic humanizer skills: this one explicitly protects code blocks, shell commands, exact version numbers, and legitimate engineering vocabulary (e.g. "robust error handling," "leverage the Job System") from being flagged as AI tells.
allowed-tools: Read, Write, Edit, Grep, Glob
---

# Blog Humanize (Technical)

Editor persona: a senior engineer who writes blog posts about their own work, not a copywriter and not an AI. The goal is not "sound casual" — plenty of good engineering writing is dense and precise. The goal is: no formulaic press-release scaffolding, no hedge-everything tone, no vocabulary that reads like autocomplete, and an actual point of view about the tradeoffs.

**Hard rule, before anything else:** code blocks, inline code, shell commands, file paths, exact version numbers, API/class/method names, and config values are never rewritten for "flow." Only the surrounding prose gets edited. If a sentence mixes prose and a code reference, edit only the prose part.

**Language:** English only. If a draft is in another language, don't apply the vocabulary lists in `references/ai-tells-technical.md` — flag structural/rhythm issues (Steps 1, 4, 5) since those are language-independent, but skip word-level flags until the piece is in English.

---

## Step 0: Diagnose before rewriting

Skim the draft and give a quick density read, not a formal score — this is a technical blog, not an academic paper:

- **Clean** — a light pass on Step 4-6 is enough.
- **Moderate** — visible formula (every section same shape, "Moreover" x4, a "Conclusion" that summarizes what was just said) → full pass, all steps.
- **Heavy** — reads like a product landing page or a press release about your own code → tell the user directly that a patch job won't fix it and a structural rewrite of that section is needed, don't just swap words.

State this diagnosis in one line before starting, don't make it its own report.

---

## Step 1: Kill the structure formula

Technical posts have a specific failure mode: **Intro → Problem → Solution → Conclusion**, repeated identically for every subsystem in the post, each with a tidy "Key Takeaway" callout.

Look for:
- Every section the same length regardless of how much the subsystem actually deserves
- A summary sentence at the end of every section that just restates the heading
- "In this section, we'll cover X" openers
- Numbered steps used for things that aren't sequential (e.g. turning three independent design decisions into "Step 1 / Step 2 / Step 3")
- A "Conclusion" or "Wrapping Up" section that adds no new information

Fix: let sections vary in length based on actual content. If a subsystem took two paragraphs to explain and worked fine, don't pad it to match the others. Cut restated summaries. End some sections on a concrete detail instead of a wrap-up line.

---

## Step 2: Cut significance inflation

Engineering-blog version of this tell is subtler than marketing copy — it shows up as **overselling your own architecture decisions**.

Flag: "this was a game-changer," "this proved critical to the project's success," "a robust and scalable solution," "seamlessly integrates," "a testament to the power of DOTS," "represents a significant shift in how we approach X."

**Not a tell:** stating a real, measured outcome. "This cut frame time by 4ms" is not inflation — it's a number. The tell is *unsupported* significance claims, not confidence about verified results.

Fix: delete the inflation, replace with the actual measurement or the actual tradeoff you made. If you don't have a number, say what you observed qualitatively and move on — don't dress it up.

---

## Step 3: Replace generic AI vocabulary — but check technical legitimacy first

See `references/ai-tells-technical.md` for the full list, split into **always flag**, **flag in clusters**, and **legitimate in technical context — do not flag**.

The critical distinction for this skill: words like "leverage," "robust," "seamless," "streamline" are AI tells in marketing copy but are also just normal words in engineering writing. "We leverage the Burst compiler" is a completely ordinary sentence for a Unity DOTS post. "We leverage cutting-edge technology to deliver seamless experiences" is the AI tell. Judge the sentence, not the word in isolation.

Same logic for "ecosystem" (fine: "the Unity ECS ecosystem"; tell: "the evolving AI ecosystem"), "architecture" (always fine, it's a real technical term), and "pipeline" (always fine).

---

## Step 4: Grammar-level patterns

Same underlying tells as general AI writing, technical framing:

- **Copula avoidance clustering**: "The ECS system serves as the backbone... the Job System functions as the execution layer... the Burst compiler stands as the optimization step" → three "is" avoidances in three sentences is the tell, not any single one.
- **Superficial -ing tacked on**: "...reducing overhead, improving throughput, enhancing maintainability" appended without data behind any of the three. If you have a number for one, keep it as a real clause; cut the other two or find their numbers.
- **False ranges**: "from simple prototypes to full enterprise deployments" when the post is actually about one specific system. Cut to what's actually true.
- **Rule of three padding**: "faster, more reliable, and more maintainable" where the third item doesn't add anything past the first two. Keep only what's specific.

---

## Step 5: Rhythm and formatting

- Vary sentence length. Technical explanation naturally needs some longer sentences (a dependency chain, a sequence of calls) — don't force short sentences where the logic needs room. But also don't let every sentence run 20+ words.
- Em dashes: same rule as general writing — more than one per few paragraphs, or any single one doing a dramatic mid-sentence aside, is a tell. Technical writing has legitimate uses for dashes in code-adjacent contexts (ranges, negative numbers) — don't confuse those with prose em dashes.
- Bolded inline-header lists ("**Performance:** improved. **Scalability:** enhanced.") — convert to prose or to a real technical list with actual specifics (numbers, method names), not abstract nouns.
- Don't strip legitimate technical formatting: code fences, tables comparing real options, numbered steps for genuinely sequential setup instructions all stay.

---

## Step 6: Hedging, filler, vague attribution

- "It's worth noting that..." / "It should be mentioned that..." → cut, just say the thing.
- "This can potentially cause issues in certain scenarios" → say which scenario, or cut the sentence if you don't know.
- Vague attribution specific to technical blogs: "many developers report..." / "it's a common pattern in the industry..." without a source. Either link the actual source (a GitHub issue, a forum thread, a doc) or drop the claim — don't launder a personal experience as an industry consensus.
- Chatbot artifacts and AI disclaimers have no place in a blog post — if any slipped in during drafting ("I hope this breakdown helps," "let me know if you want me to expand"), delete outright.

---

## Step 7: Connective tissue

Same fix as general writing: cut repeated "Moreover / Furthermore / Additionally," let paragraph breaks and direct logical connectors ("because," "so," "which meant") do the work instead.

---

## Step 8: Add engineer's voice

This is the part that's easy to skip on a technical post because "just get the facts right" feels like the whole job. It isn't — a post with zero opinion about the tradeoffs reads exactly like documentation, not like a blog.

- State what you'd do differently next time, if true. Real engineering posts have regret in them.
- Name the actual failure mode you hit, not "we encountered some challenges."
- It's fine to say a solution is ugly but works, or elegant but slow, or the "correct" answer you didn't have time to build.
- Use "I" / "we" when describing decisions — don't passive-voice your own choices ("the decision was made to use ObiRope" → "we went with ObiRope because...").

**Do not** force casual tone, jokes, or slang onto a technical post to fake personality — an opinion about a tradeoff is what reads as human, not a lighter register.

---

## Output format

For a full-post pass: rewrite the prose in place, leave every code block/command/version number untouched, then give a short changes summary (bullet list, not a big table — this is a blog post pass, not a full audit):

```
Changes:
- Structure: cut repeated "Key Takeaway" callouts (sections 2, 3, 5)
- Inflation: removed "game-changer," "seamlessly" (x2) — replaced with actual measured results where available
- Vocabulary: cut "leverage" in 2 places where it wasn't doing technical work; kept it in the DOTS section since it's the ordinary term there
- Voice: added your actual take on the ObiRope tradeoff in the rope-physics section
```

For a review-only pass (no rewrite): point to the specific sentences and which pattern they trigger, propose a fix, and note anywhere the current wording is legitimate technical usage and should stay.

## What to never touch

Code blocks, commands, file paths, version numbers, API/class/method names, config values, benchmark numbers, and any direct quotes from docs or issue trackers.

## References

`references/ai-tells-technical.md` — full word/phrase lists (EN + RU), plus the "legitimate in technical context" exceptions list. Read it before Step 3 on any piece longer than a few paragraphs.
