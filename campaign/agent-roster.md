# HealthGraph — Agent Roster & File Ownership

Owner: STRATEGY agent. Documents the multi-agent structure for the campaign and each agent's file ownership. The app repo (/home/opticpulse/healthgraph) is READ-ONLY for every agent — no agent writes to it. Production root: /home/opticpulse/Desktop/videos_marketting/healthgraph-video-campaign/.

## Structure

| Agent | Role | Owns (writes) | Reads (truth inputs) |
|---|---|---|---|
| MASTER DIRECTOR | Creative authority; owns the master brief; arbitrates conflicts between agents | `campaign/00-brief.md` | all of the above (final review) |
| PRODUCT FACTS | Verifies every product claim against real screenshots; maintains the verified value list; rejects any invented number/name/feature | `references/screen-inventory.md`, `references/design-tokens.md`, `references/logo-reference.png` | app repo (READ-ONLY, screenshots + UI code), `campaign/00-brief.md` |
| STRATEGY | Campaign architecture, hooks, CTA rotation, localization, distribution, site messaging, this roster | `campaign/campaign-architecture.md`, `campaign/website-cta-en.md`, `campaign/website-cta-de.md`, `campaign/agent-roster.md` | `00-brief.md`, `references/*`, repo marketing docs (READ-ONLY: `marketing/plan.md`, `DE-SOCIAL-MEDIA-STRATEGY.md`, `marketing/ausfuehrungsplan-de.md`) |
| SCRIPT TEAM 1 | Reels 01–04 (script + subtitles + voice timing, EN + DE) | `scripts/reels/reel-01.*` … `reel-04.*` (`.en.json`, `.de.json`, subtitle sets) | `00-brief.md` (hooks per §3 of campaign-architecture), `references/screen-inventory.md` |
| SCRIPT TEAM 2 | Reels 05–08 | `scripts/reels/reel-05.*` … `reel-08.*` | same as above |
| SCRIPT TEAM 3 | Reels 09–12 | `scripts/reels/reel-09.*` … `reel-12.*` | same as above |
| SCRIPT TEAM 4 | Reels 13–16 | `scripts/reels/reel-13.*` … `reel-16.*` | same as above |
| SCRIPT TEAM 5 | Reels 17–20 | `scripts/reels/reel-17.*` … `reel-20.*` | same as above |
| DISCOVERY SCRIPTER | Horizontal discovery film (~180s EN, 9 acts); narration drives scene timing | `scripts/discovery/discovery.en.narration.json`, `scripts/discovery/discovery.en.json` | `00-brief.md` (9-act structure), `references/screen-inventory.md` |
| BUILD TEAM A (reels 01/03/10/17) | Remotion composition, motion, render for its cluster | compositions + render inputs for reels 01, 03, 10, 17; `renders/vertical/en|de/reel-0{1,3},reel-1{0,7}*` | `references/design-tokens.md`, script files (READ) |
| BUILD TEAM B (reels 02/06/11/18) | same | compositions + renders for reels 02, 06, 11, 18 | same |
| BUILD TEAM C (reels 05/08/14) | same | compositions + renders for reels 05, 08, 14 | same |
| BUILD TEAM D (reels 04/16) | same | compositions + renders for reels 04, 16 | same |
| BUILD TEAM E (reels 12/13) | same | compositions + renders for reels 12, 13 | same |
| BUILD TEAM F (reel 07) | same | compositions + renders for reel 07 | same |
| BUILD TEAM G (reel 15) | same | compositions + renders for reel 15 | same |
| BUILD TEAM H (reels 09/19/20 + discovery film) | same, incl. 3D (Three.js) scenes and the horizontal render | compositions + renders for reels 09, 19, 20; `renders/horizontal/healthgraph-discovery-en.mp4` | same |
| QA | Per-video gates (visual/audio/language/product/social); signs off or returns each reel | `qa/reel-NN-qa.md` (per reel, EN + DE), `qa/discovery-qa.md`, `FINAL_CATALOG.md` | all deliverables, `00-brief.md` QA gates, `references/screen-inventory.md` |
| DISTRIBUTION | Posting calendar, captions, hashtag/caption rules, experiment log, metrics review | `campaign/distribution/posting-calendar.md`, `campaign/distribution/captions.md`, `campaign/distribution/experiment-log.md` | `campaign-architecture.md` §6–§7, repo strategy docs (READ-ONLY) |

## Dependency flow (who gates whom)

1. MASTER DIRECTOR brief → PRODUCT FACTS verifies (values locked) → STRATEGY fixes hooks/CTAs/thumbnails.
2. SCRIPT TEAMS write against the locked hook + CTA; DISCOVERY SCRIPTER runs in parallel on its own act structure.
3. BUILD TEAMS render only from accepted script + verified screens; never invent UI.
4. QA gates every render against the brief's 5 gate groups; only QA can mark a reel FINAL.
5. DISTRIBUTION posts only FINAL reels, per the sequence and measurement rules in campaign-architecture §6–§7.
6. MASTER DIRECTOR signs FINAL_CATALOG.md after QA clearance of all 41 deliverables.

## Rules that apply to every agent

- No medical claims, no invented data/customers/stats, no competitor names, no fake urgency or social proof — per `00-brief.md` hard rules.
- German copy: no anglicisms, no hype, calm/precise/trustworthy; compound-word typography per `campaign-architecture.md` §5.
- Real screen values only, never altered; "Hole Hole" name framing avoided.
- The app repo is never modified; all writes go to the production workspace only.
