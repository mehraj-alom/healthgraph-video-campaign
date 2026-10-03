# HealthGraph — Autonomous Viral Video Campaign (Master Brief)

Owner: MASTER DIRECTOR. This file is the single source of creative truth for all agents.
Repo: /home/opticpulse/healthgraph (READ-ONLY). Production: /home/opticpulse/Desktop/videos_marketting/healthgraph-video-campaign/

## Deliverables
- 1 horizontal discovery film: 1920x1080, English, ~180s -> renders/horizontal/healthgraph-discovery-en.mp4
- 20 reel concepts x 2 languages (en/de): 1080x1920, ~45-100s each -> renders/vertical/en/, renders/vertical/de/
- 41 thumbnails (1080x1080), 41 scripts, 41 subtitle sets, 41 voice tracks, manifests, QA reports, FINAL_CATALOG.md

## Product truth (verified against screenshots — see references/screen-inventory.md)
HealthGraph = personal health knowledge & history system. Core idea:
HEALTH INFORMATION SHOULD BECOME CONNECTED CONTEXT, NOT A COLLECTION OF DISCONNECTED ENTRIES.
Verified features (from real UI screenshots):
- Explore grid of 20 health areas: Log day, Timeline, Medications, Food scan, Priority, Body map, Symptom map, Pulse check, Sleep, Activity, Nutrition, Heart, Wellbeing, Weight, Discipline, Documents, Scan prescription, Cycle, Substance, Voice check-in
- Home dashboard: "Today Done 100%", Medication card, "Your patterns" (Week/Month/Year), pattern charts (Sleep duration 420min "steady", Overall wellbeing 5/5)
- Health Overview radar: REST 7h, MEALS 4, WATER 1.9L, HEART 59 bpm, WELLBEING 5/5, "2d avg · 5 SIGNALS", Improve/Keep
- Daily Report: paper-style cream card, "3 OCT Today", Pulse 59 BPM Fair 5:14 PM, "ALSO Pulse — Fingertip 61 BPM · Fair", "Log ×6, tap to open"
- Health Graph: "12 nodes · 22 connections", filters (All/Visit/Heart/Sleep/Nutrition), "Drag to travel through time · Pinch to zoom", legend Event/Visit/Heart/Sleep/Nutrition
- AI Chat: "How may I Assist you today", "Wellness info only. Not medical advice.", suggested: "How did I sleep this week?", "2 AI messages / month FREE", "Ask about your health…"
- Records upload: PDF, PNG, JPG, max 50 MB, "Upload new / Past uploads"
- Pulse check (PPG/fingertip): "Measurement complete", 67 BPM · FINGERTIP, 58% gauge, "Quality Fair · 60s · ppg-1.1.0", 80.3 MS · HRV RMSSD, "Baseline builds after 4 morning readings.", green sensor trace "1742 PTS · 60.0S", "Saved · synced"
- Daily Log: Mood "Very good", Sleep 7h, "Recent history: Nutrition Log · Sleep Log · Wellbeing Log · 3 events"
- Nutrition: "Estimated calories 977 kcal", ring 977/3000, protein/carbs/fat bars, "Scans estimate. Not measured, not a target.", Fasting windows
- "Everything you track." stats page; Drawer: My Priorities, Measure Pulse, Scan Food, Upload Record, Symptom Map, Chat, Timeline, 3D Body, Health Graph, My records
- Voice: red pulse FAB (voice check-in)
- Premium: "Go Premium — 3 days free, then from €11 a month"; Version 1.0.0; Google Play open beta
- Voice architecture (verify in repo): mobile mic -> HealthGraph API -> Pakeet STT (server) -> LangGraph processing -> sanoTTS (mobile) response

## Positioning
New micro-category: THE HEALTH GRAPH APP. Longitudinal connected history vs isolated records.
German category claim: "Eine App statt fünf. Dein ganzes Gesundheitsbild in einem Graph."
Standing German trust line: "Kostenlos · DSGVO-konform · Ohne Werbung" (verified posture from repo marketing docs).

## Forbidden (hard rules)
- No medical claims: no "AI doctor", "diagnoses you", "replaces your doctor", "clinically proven", "doctor-approved", "guaranteed", "the only...", "world's first", health-improvement percentages.
- No invented: customers, user counts, downloads, reviews, ratings, hospitals, partnerships, certifications, statistics.
- No competitor names or attacks. No fake social proof. No fake urgency.
- Never alter numbers/names/measurements/dates in screenshots.
- German: no anglicisms, no American hype ("revolutionary", "game-changing"), calm/precise/trustworthy tone.
- No "Download now" unless true — say "Explore HealthGraph at healthgraph.shop" / "Erlebe HealthGraph auf healthgraph.shop".

## Visual identity
- Real screenshots are the hero; animate them (parallax, push-in, masked reveal, perspective, depth layering, section focus).
- Dark premium UI (warm charcoal + deep navy from screenshots), cream/white info, controlled green/teal signal (#4E9B5F / #2E8B7A), apricot accent (#E8862E), red voice pulse (#E8355B).
- Editorial grotesque typography (Archivo), mono data labels (Roboto Mono).
- Recurring motif: disconnected objects (PDF, NOTE, MEDICATION, SYMPTOM, MEASUREMENT, MEAL, SLEEP, HEART RATE, TIMELINE EVENT) -> HEALTHGRAPH hub -> records/timeline/measurements -> CONNECTED HISTORY.
- Health Diary = physical archive of daily paper reports, NOT a card list.
- 3D (Three.js) is supporting storytelling: human silhouette + orbiting health info; camera through the health graph; document -> nodes; paper report -> timeline. No fake diagnostic visuals, no generic AI-brain, no holograms.
- Motion communicates hierarchy: WHAT AM I LOOKING AT / WHY / WHAT DID IT JUST BECOME / WHY IT MATTERS.
- No cheesy corporate stock, no fake hospital/doctor/patient footage, no generic AI SaaS look, no neon overload.

## Reel rules
- Structure: 0-2s HOOK (visual+verbal), 2-8s problem/curiosity, 8-25s development, 25-45s payoff, 45-70s demonstration, 70-90s differentiation, final 3-5s CTA. Compress for shorter concepts. Never filler.
- Never open with "Hello everyone", "My name is", "Today I want to show you", "Introducing...".
- Vary CTAs: Explore HealthGraph. / See how your health history could connect. / Explore the health diary. / Ask your records. / Discover HealthGraph. / Learn more at healthgraph.shop / Follow for the next part. / Save this for later. / Send this to someone who keeps health records everywhere.
- Subtitles: burned-in, large mobile type, inside bottom safe zone (y >= 1380 of 1920), never over critical UI/evidence. EN->EN subs, DE->DE subs.
- Every reel: 1 hook, 1 story, 1 payoff, 1 CTA. 20 DISTINCT concepts (no two reels may reuse the same core visual sequence).
- German versions are localized (pacing, sentence length, examples, cultural tone, typography for compound words), not literal translations.

## Clusters
A fragmentation: 01 03 10 17 | B AI/records: 02 06 11 18 | C Health Diary: 05 08 14 | D Documents/structure: 04 16 | E Measurements: 12 13 | F Medication: 07 | G Voice: 15 | H Vision/brand: 09 19 20

## Reel concepts (fixed by master brief)
01 "Your health data is probably everywhere." fragmentation -> connected
02 "What if you could ask your own health history?" ask your records
03 "This isn't another health tracker." why not attack: connected longitudinal history
04 "Imagine your medical documents actually becoming part of your timeline." doc -> extraction -> structured event -> timeline
05 "Your health history has dates. Why shouldn't you see it like a story?" Daily Health Diary
06 "You forgot when you uploaded that report?" AI navigation
07 "One medication entry isn't your health history." scheduled -> reminder -> taken/not taken -> recorded -> history
08 "What happened to my health on Tuesday?" daily report opening
09 "Your health isn't a spreadsheet." data -> visual graph
10 "Your records are connected. Your apps usually aren't." disconnected -> one HealthGraph
11 "Imagine asking your health records instead of searching through PDFs." document retrieval
12 "A health measurement is more useful when you can see it over time." heart/pulse/PPG/RPPG, no diagnosis
13 "Your health history should remember the context." measurement + date + medication + daily log + document connected
14 "Open a day from your health history." physical report opening as hero
15 "What if your health journal could answer back?" voice + AI
16 "From document to health history." technical: extraction -> normalization -> structured health event -> graph/timeline
17 "One place for the pieces of your health history." fast montage sleep/nutrition/medication/symptoms/measurements/documents/timeline
18 "Don't just get an AI answer. Find the record behind it." answer -> evidence -> report, transparency
19 "What does your health history look like when everything connects?" most cinematic 3D
20 "Meet HealthGraph." 60-90s overview: problem -> idea -> product -> diary -> records -> measurements -> AI -> voice -> CTA

## Discovery film (9 acts, ~180s) — scripts/discovery/discovery.en.narration.json
1 FRAGMENTATION 0:00-0:20 | 2 THE QUESTION 0:20-0:40 | 3 THE HEALTHGRAPH 0:40:1:05 | 4 YOUR HISTORY (real screenshots, the flow, no feature checklist) 1:05-1:30 | 5 DAILY HEALTH DIARY hero 1:30-1:55 | 6 ASK YOUR RECORDS (blood-report question -> timeline -> daily page -> evidence highlighted) 1:55-2:20 | 7 MEASUREMENTS + CONTEXT 2:20-2:40 | 8 VOICE (short, not primary) 2:40-2:52 | 9 FINAL: "Your health, connected." + healthgraph.shop. Disclaimer allowed where appropriate: "For visualization purposes only. Not a medical prescription, medical record, or medical report."

## Audio
- Original/generative/royalty-free only. Procedural score + SFX (synthesized, seeded, deterministic). Music always below narration.
- EN voice: piper en_US-lessac-medium (calm premium). DE voice: piper de_DE-thorsten-medium (calm precise). One consistent voice per language.
- Sync: per-line TTS, measured durations, narration drives scene timing.

## QA gates (every video)
Visual: no blank/black frames, no clipping, correct screenshots, correct logo/colors/typography.
Audio: narration audible, no clipping, music < narration, no accidental silence.
Language: EN native / DE native, no machine-translation artifacts, no EN leftovers in DE.
Product: no invented functionality/data/claims, no fake UI.
Social: 1080x1920, safe areas, readable subs, hook in first 2s.
