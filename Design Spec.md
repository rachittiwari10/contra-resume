# Design Specification – Interactive Résumé Game

## Concept

The game takes inspiration from classic side‑scrolling shooters like *Contra*, but instead of defeating enemies the player discovers career milestones by collecting floating tokens.  Each token corresponds to a role in Rachit Tiwari’s professional journey.  The environment evokes a retro 8‑bit mountain landscape, with gentle parallax scrolling to provide depth.

The primary design goals are:

1. **Narrative Flow** – The game world represents a linear timeline from the earliest job to the latest.  Collectibles are ordered chronologically and evenly spaced across the level.
2. **Discoverability** – Each collectible reveals a tooltip summarising responsibilities, achievements and impact metrics from the résumé.  After all tokens are collected, a final summary appears.
3. **Simplicity & Accessibility** – Controls are limited to left, right and jump; no enemies or fail states are introduced.  Colour contrasts and font sizes respect WCAG guidance.

## Colour Palette

A 16‑colour palette derived from the DawnBringer DB16 set is used throughout.  Key swatches include:

- **Background blues** – for mountains and sky (`#30346d`, `#597dce`)
- **Accent reds** – player hat and UI highlights (`#d04648`)
- **Earth browns** – ground and boots (`#854c30`)
- **Soft yellows** – collectibles and highlights (`#dad45e`)
- **Pale skin** – character face and hands (`#d2aa99`)

Rachit should review this palette for personal preference.  Minor adjustments can be made without altering the overall retro aesthetic.

## Level Storyboard

| Stage | World Description | Game Event | Résumé Mapping |
|------|------------------|-----------|--------------|
| **1** | Grassy plain beneath foothills | Player spawns; tutorial message appears instructing controls. | Introduction and summary statement. |
| **2** | Rolling hills with coin hovering ahead | Collectible #1 reveals **Assistant Manager – Amazon** (Jan 2018 – Feb 2020), highlighting logistics analytics and security oversight【607478451001152†L66-L71】. | First professional role sets the foundation of Rachit’s managerial career. |
| **3** | Terrain becomes rocky; background changes gradient | Collectible #2 reveals **Assistant Manager – Jio Mart** (Nov 2020 – Dec 2021), launching 30+ stores and Akshaya Patra project【607478451001152†L56-L62】. | Transition to program management in retail. |
| **4** | Moonlit hillside with a small bridge | Collectible #3 reveals **Founder – Massoi** (Sep 2021 – Aug 2022), describing the home‑chef marketplace and revenue figures【607478451001152†L74-L75】. | Entrepreneurial chapter illustrating initiative and leadership. |
| **5** | Climb up steep slope; starry sky | Collectible #4 reveals **Senior Product Manager – VLCC Group** (Aug 2022 – Jan 2024), including CRM and AI Skin Analyzer achievements【607478451001152†L30-L41】. | Move into product management and AI‑driven solutions. |
| **6** | High plateau with aurora; sense of progression | Collectible #5 reveals **Product Owner – AuthBridge** (Jan 2024 – Aug 2024), explaining multi‑product portfolio and revenue impact【607478451001152†L12-L23】. | Demonstrates leadership across SaaS products. |
| **7** | Summit with sunrise; final stretch | Collectible #6 reveals **Product Manager – Fieldassist** (Aug 2024 – Jan 2025), onboarding enterprise CRM clients and driving >₹10 Cr revenue【607478451001152†L81-L85】. | Current role culminating the journey. |
| **8** | End of level; open sky | Summary panel appears with Rachit’s mission statement and contact details【607478451001152†L0-L5】【607478451001152†L10-L10】. | Encourages the player to reach out for collaboration. |

## User Flow

1. **Load & Preload:** The game preloads assets and résumé data.  A loading screen could be added in a future iteration.
2. **Tutorial:** Upon starting, a short on‑screen hint appears (“Use arrows to move and jump”).
3. **Exploration:** The player moves right, jumps over minor gaps and collects coins representing roles.  Each collection pauses movement momentarily while a tooltip fades in.
4. **Progress Tracking:** A subtle counter (e.g., `3/6`) could be added to indicate how many milestones remain.
5. **Conclusion:** After the final token, the game automatically displays a summary with contact information.  The player is free to explore the rest of the level or close the page.

## Audio (Optional)

No audio assets were included to minimise file size and complexity.  If desired, CC‑0 sound effects can be generated with [bfxr](https://www.bfxr.net/) or [freesound.org](https://freesound.org/) and placed in `assets/audio/`.  Background music should be a simple loop under 50 kB to avoid distracting from the résumé content.  Volume controls and a mute toggle should be provided for accessibility.

## Accessibility Considerations

- **Keyboard only:** All interactions are via keyboard; no pointer input is required.  Control hints appear at the start.
- **High contrast:** Text in tooltips uses light colours on dark translucent panels for readability.
- **Reduced motion:** Parallax and tween animations are subtle.  A “reduce motion” toggle could be added via a URL parameter to disable tweening.
- **Screen readers:** Critical information is stored in `resumeData.json` and mirrored in HTML.  Tooltips use `<h2>` and `<p>` tags so screen readers can announce role titles and durations.
