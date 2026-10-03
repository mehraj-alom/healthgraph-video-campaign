# HealthGraph — Product Facts (repo-verified marketing cheat-sheet)
Verified against /home/opticpulse/healthgraph on 2026-10-03. READ-ONLY audit; every line below cites files.
Rule: anything not listed here as VERIFIED may not be narrated.

## SAY (verified, quotable)

1. "Voice check-in" is real: a scheduled, call-style daily check-in. The device asks 5 questions
   (mood, energy, stress, sleep, water); your voice answers are transcribed and parsed into the
   daily log. Unparseable answers are re-asked once, then skipped — never guessed.
   (frontend/src/screens/VoiceCheckin/VoiceCheckinScreen.tsx; services/voiceCheckin/questions.ts)
2. Speech recognition is server-side: mic → authenticated API → self-hosted Pakeet sidecar
   (NVIDIA Parakeet TDT 0.6B int8 via sherpa-onnx, 127.0.0.1:8477, 5 MB / 60 s caps).
   (deploy/voice-pakeet-server/server.py; app/api/v1/voice.py)
3. The AI chat runs on a LangGraph agent (agent → tools → synthesize) with 17 retrieval tools over
   Neo4j + PostgreSQL + Qdrant; answers carry citations that are validated post-hoc before display.
   (agents/orchestrator.py:584-636; services/retrieval/evidence.py; app/api/v1/chat.py:175)
4. Exact UI disclaimer (verbatim, on the chat screen): "Wellness info only. Not medical advice."
   (frontend/src/screens/Chat/ChatScreen.tsx:661)
5. Free plan row (displayed in-app): "2 AI messages a month", "3 meal scans a month". Paid plans:
   3 days free, then from €11/month; tiers Free €0 / General €11/mo / All-in €18/mo.
   (frontend/src/screens/Onboarding/PricingScreen.tsx:71-97; ChatScreen.tsx:688-693;
   components/ProfileSheet.tsx:319-320 "Go Premium — 3 days free, then from €11 a month")
6. Documents: PDF/PNG/JPG/JPEG accepted; upload → OCR triage (medical?) → structured extraction →
   de-identification → structured events/observations → Neo4j graph + timeline. "Past uploads" is
   the real screen title. (app/api/v1/documents.py; workers/ingestion_tasks.py:104-230;
   frontend/src/screens/Documents/DocumentsScreen.tsx:108)
7. Health Graph is a real Neo4j graph with temporal navigation: one-finger drag pans the timeline
   ("Drag to travel through time · Pinch to zoom" is a real UI hint, and the gesture is implemented).
   (frontend/src/screens/Body/HealthGraphScreen.tsx:2698, 1103-1127; workers/graph_sync.py; core/neo4j_client.py)
8. "12 nodes · 22 connections" is a live counter on the graph HUD — real for the screenshot patient,
   not a constant. (HealthGraphScreen.tsx:2690, 2757)
9. Pulse check: on-device fingertip camera PPG (rear camera + LED flash, PPGbetter signal path;
   algorithm ppg-1.1.0) → BPM + HRV RMSSD (SDNN on longer sessions) + signal quality + server-computed
   reliability. "Baseline builds after 4 morning readings." is a real in-app line.
   (modules/healthgraph-ppg/README.md + PpgSignalProcessor.kt:19; app/api/v1/ppg.py;
   frontend/src/screens/PpgMeasure/PulseInstrumentScreen.tsx:589)
10. Face pulse (rPPG): on-device PhysFormer (rppg-1.0.0 / physformer-rppg-1.0.0), front camera,
    BPM + quality only — no HRV on face by design. (frontend/src/hooks/useRppgMeasurement.ts;
    frontend/src/services/rppg/types.ts)
11. Medications: scheduled times, daily schedule, taken/not-taken tracking, adherence %, call-like
    local reminders with snooze, refill hints. (app/api/v1/medications.py;
    Medications/MedicationReminderScreen.tsx; utils/medicationAdherence.ts)
12. Prescription scan is a real, premium-gated capture flow that feeds the standard document pipeline.
    (Medications/PrescriptionScannerScreen.tsx; services/premium.ts)
13. Daily Report: paper-style "Daily Report" sheet per day in the Health Diary; sections Symptoms /
    Pain / Measurements / Medications / Daily logs / Records / Observations; empty sections omitted,
    nothing fabricated. (Timeline/DiaryPaper.tsx; Timeline/reportDocument.ts)
14. Privacy: on-device database encrypted with SQLCipher (AES-256); no analytics SDKs in the app
    (Firebase = auth only); self-service export + verified two-step deletion (server PG+Neo4j+Qdrant
    + then local wipe); consent receipts + DSR endpoints + audit trail; PPG never stores frames.
    (frontend/src/db/encryption.ts; app/api/v1/privacy.py; services/erasure.py;
    frontend/src/services/deletionContract.ts; modules/healthgraph-ppg/README.md)
15. 3D Body is real (Three.js + GLTF/DRACO via expo-gl, on-device anatomy model download, tap-to-focus,
    AI can highlight/focus a structure). All-in tier feature per pricing copy.
    (frontend/src/screens/Body/BodyScreen.tsx; app/api/v1/chat.py:156-169)
16. Explore grid = 20 real tiles: Log day, Timeline, Medications, Food scan, Priority, Body map,
    Symptom map, Pulse check, Sleep, Activity, Nutrition, Heart, Wellbeing, Weight, Discipline,
    Documents, Scan prescription, Cycle, Substance, Voice check-in.
    (Dashboard/HealthDashboardScreen.tsx:650-676)
17. healthgraph.shop is served from the healthgraph_web React build (Caddy static deploy). It has an
    in-page English/German locale toggle (not a separate /de/ URL). Hero: EN "Health, connected." /
    DE "Gesundheit, verbunden."; meta "Kostenlos, DSGVO-konform, ohne Werbung"; pricing rows match app.
    (deploy/caddy-site.Caddyfile; healthgraph_web/index.html; healthgraph_web/src/i18n.tsx)

## DON'T SAY (not verifiable or wrong as phrased)

1. "Full voice chat / two-way voice conversation with the AI" — NOT shipped. The complete
   mic→STT→LangGraph→TTS loop exists only in the dev-only VoiceTurnScreen; response playback via
   sanoTTS is explicitly "pending on-device g2p". Shipping voice = guided check-in + free-form
   voice journal. sanoTTS itself is dev/test-only (SattsTestScreen).
   (frontend/src/screens/Voice/VoiceTurnScreen.tsx header; modules/healthgraph-satts/README.md;
   VoiceCheckinScreen.tsx uses expo-speech, not sanoTTS)
2. "Talk to your health history" as a voice feature — risky. The AI chat is text-in; voice answers
   are stored and you can ASK about them later in text. Say "your journal, recorded in your voice,
   and you can ask about it later." Do not promise voice-out AI answers.
3. "Up to 50 MB" in narration — the upload screen shows 50 MB, but the server hard cap is 20 MiB;
   files between 20–50 MB are rejected. Safe: "PDF, PNG or JPG, up to 20 MB" (or keep the real UI
   on screen and don't narrate a number). (frontend/src/screens/Documents/DocumentUploadScreen.tsx:40;
   app/api/v1/documents.py:34; storage/save_doc.py:30)
4. "Every document becomes a node" — only medical documents pass triage (lab report / prescription /
   discharge / imaging); non-medical uploads are rejected (FAILED_TRIAGE). Processing is async
   (queue). Say "medical reports become structured events in your history."
   (workers/ingestion_tasks.py:140-146)
5. Medical-device / diagnosis claims for pulse: "wellness measurement only… Not a certified medical
   device. No blood-pressure estimation." (modules/healthgraph-ppg/README.md; app/api/v1/ppg.py:8)
   Never: "detects arrhythmia", "measures blood pressure", "clinically validated HRV".
6. "Available on Google Play · Open beta" — NOT verifiable in the repo. In-app store buttons are
   mailto early-access links; EAS submit config is empty; app version 1.0.0. Verify the Play listing
   exists before using any Play/beta CTA. (frontend/web/index.html:485-486; frontend/eas.json;
   frontend/app.json:5)
7. "Subscriptions" / "from €11 a month" as a live billing fact — tiers are displayed in-app, but
   billing is not implemented: "Subscriptions open soon. Nothing is charged today."
   (PricingScreen.tsx:231; services/premium.ts:4 "no billing backend yet"). Entitlement is a local
   flag; only the prescription scanner is code-gated today (MedicationsScreen.tsx:371).
8. "No analytics at all" as an absolute — true for the mobile app; the .shop site runs Umami
   (privacy-focused, self-hosted) per deploy config. Say "no ads, no third-party ad tracking in the
   app" instead. (deploy/caddy-site.Caddyfile: "Umami analytics … -> 127.0.0.1:3000")
9. "12 nodes · 22 connections" as "your graph size" — it is a live HUD count for one demo patient.
   Use it only as the on-screen value, never as a product promise.
10. Invented stats/proof: users, downloads, reviews, hospitals, "trusted by", "the only", "first".
    None exist in the repo or on the site (brief's hard rule; no count anywhere in app/web code).
11. "GPT-4o / OpenAI" — the agent uses a configurable OpenAI-compatible endpoint (gpt-4o-mini as the
    configured model). If naming is needed: "an AI agent built on LangGraph". (agents/orchestrator.py:54-82)
12. Don't present free-tier limits as backend-enforced ("you will be blocked after 2 messages") —
    the in-app monthly limits are displayed plan facts; the backend enforces a 20-requests/10-min
    burst limit instead. (app/api/v1/chat.py:70-76)

## Evidence notes (per task item)

### 1. Voice architecture
- Pipeline as shipped (check-in): device TTS (expo-speech) asks → expo-audio records → POST
  /api/v1/voice/structure-checkin → Pakeet sidecar transcribes (Parakeet 0.6B int8, sherpa-onnx,
  localhost-only, no audio logged) → constrained LLM extracts ONLY the 5 daily fields (absent
  values come back null, "never invented") → saved to the daily check-in → prompts a pulse check.
  (app/api/v1/voice.py:110-147; deploy/voice-pakeet-server/server.py; VoiceCheckinScreen.tsx)
- "Pakeet" is the internal name of the self-hosted STT sidecar (settings.PAKEET_URL,
  core/config.py:123 "http://pakeet:8477"); the model is NVIDIA Parakeet TDT 0.6B v2 int8.
- Voice journal: free-form 12-second turns, same STT path, transcript appended to today's notes
  (frontend/src/screens/Voice/VoiceJournalScreen.tsx).
- sanoTTS: on-device TTS native module (Ampixa/sanoTTS, heartnano ~345 KB), vendored; explicitly
  "Disconnected from production flows: used only by SanoTTSProvider and the isolated voice test
  screen". (frontend/modules/healthgraph-satts/README.md)
- "What is voice check-in": a scheduled, ringing, call-style WELLNESS log — a 5-question guided
  interview, NOT a chat with the AI. Is it a recording feature or a full chat? Both parts exist:
  recording+structure (shipping) and turn-based Q&A via LangGraph (dev-only screen).

### 2. AI chat
- Engine: LangGraph StateGraph, nodes agent → tools → agent → synthesize; recursion_limit 15;
  Postgres checkpointer for threads. LLM: ChatOpenAI gpt-4o-mini, temp 0, via OPENAI_API_BASE.
  17 tools: daily summary, overview, timeline, trends, documents/evidence, medication context,
  condition evidence, measurement trend, lifestyle series, context-around, day timeline, anatomy
  resolve, body state, related observations. (agents/orchestrator.py; app/api/v1/chat.py)
- Limits: free = "2 AI messages / month" (displayed, PricingScreen.tsx:78 / ChatScreen.tsx:693);
  General = "Limited AI messages / month" (ChatScreen.tsx:692); All-in = "Unlimited AI chat"
  (PricingScreen.tsx:94, ChatScreen.tsx:690). Backend enforcement today = 20 chat requests / 10
  min per patient (chat.py:70-76); no monthly quota code.
- Disclaimer: "Wellness info only. Not medical advice." (ChatScreen.tsx:661) — exact, verbatim.
- Anti-hallucination: citations kept only if traceable to tool output (filter_valid_citations,
  orchestrator.py:550); "I don't have recorded data for that." contract (rule 6/7 in prompts).

### 3. Documents / records
- Accepted: .pdf .png .jpg .jpeg + magic-byte sniff; server cap 20 MiB (documents.py:34,
  save_doc.py:30); UI shows 50 MB (DocumentUploadScreen.tsx:40) — mismatch, see DON'T #3.
- Pipeline (async Celery): materialize from PG → LandingAI ADE classify (is_medical,
  document_type; medical set = LAB_REPORT/PRESCRIPTION/DISCHARGE/IMAGING; else FAILED_TRIAGE) →
  LandingAI ADE structured extraction (dpt-3-pro-latest + classify-latest, model versioning
  recorded) → markdown + JSON stored → de-identification (NER + patient-specific feeds) →
  ExtractionMapper.map_to_timeline creates events + observations → anatomical observations →
  Neo4j outbox projection. Statuses UPLOADED→PROCESSING→EXTRACTED→COMPLETED/FAILED.
  (workers/ingestion_tasks.py:104-258; services/ocr/{gateway,extraction}.py)
- "extraction → structured health event → graph node": CONFIRMED for medical documents.
- "Past uploads": real screen (DocumentsScreen.tsx:108), device + server documents list.

### 4. Health Graph
- Engine: Neo4j (core/neo4j_client.py) + PostgreSQL source of truth, outbox-synced
  (models/outbox.py; workers/graph_sync.py).
- Node types seen in sync code: Patient, Day, Visit, Condition, Medication, MedicationTakenEvent,
  Measurement, TimelineEvent, PatientStatement, SleepEpisode, ActivityEvent, NutritionIntake,
  FoodScan/FoodEntry, PPGMeasurement, Observation, Document. Link types incl. HAS_BIOMETRIC,
  OCCURRED_DURING (graph_sync.py _project_ppg_tx).
- UI filters: All/Visit/Heart/Sleep/Nutrition; legend "top categories by node count"
  (HealthGraphScreen.tsx:2483-2484, 2663-2708) — legend content is dynamic, so exact
  Event/Visit/Heart/Sleep/Nutrition legend depends on the demo data in the screenshot.
- Time travel: CONFIRMED — one-finger drag pans the timeline across days, pinch zooms
  (HealthGraphScreen.tsx:1103-1127; hint string :2698).
- "12 nodes · 22 connections": live counters ({graphCounts.nodes} nodes · {graphCounts.edges}
  connections · {graphCounts.relKinds} link types, :2690). Real for that screen only.

### 5. PPG / rPPG
- Fingertip PPG: native module healthgraph-ppg; rear camera + LED flash; per-frame green/luma mean
  → time series → low-pass → peak detection → HR/RR/RMSSD/SDNN/quality (PPGbetter approach).
  No frames/video stored, logged, or sent — only derived scalars (README + app/api/v1/ppg.py
  "accepts ONLY the compact derived payload"). Version ppg-1.1.0 (PpgSignalProcessor.kt:19).
- Outputs: heart_rate_bpm, rmssd_ms, sdnn_ms, signal_quality, reliable (server-side
  schemas/ppg.is_reliable), duration, algorithm/model versions, sampling rate.
- "Baseline builds after 4 morning readings." — verbatim UI (PulseInstrumentScreen.tsx:589);
  7-day baseline = mean + usual range once enough readings exist (:588).
- Face rPPG: rppg_models/ (physformer_rppg{,_int8,_fp16}.onnx), on-device ONNX, algorithm
  rppg-1.0.0, model label physformer-rppg-1.0.0, 16.7 MB download; BPM + quality; HRV unavailable
  for the short capture window by design (useRppgMeasurement.ts).

### 6. Medications
- CONFIRMED: scheduled times + daily schedule endpoint, taken events (DoseTakenStatus), adherence
  + refill insights, call-like reminder with fixed snooze options (local, no server).
  (app/api/v1/medications.py; MedicationReminderScreen.tsx; services/medicationReminders.ts)
- Prescription scan: multi-page camera capture, premium-gated (usePremiumEntitled,
  MedicationsScreen.tsx:371), uploads pages through the document pipeline tagged rx-scan-…
  (PrescriptionScannerScreen.tsx header).

### 7. Daily report
- In-app "Daily Report" (Health Diary): per-day paper sheet, sections Symptoms, Pain,
  Measurements, Medications, Daily logs, Records, Observations; "only sections that contain actual
  data… Never fabricated"; summary line like "3 symptoms · 2 measurements".
  (Timeline/reportDocument.ts; Timeline/DiaryPaper.tsx; ReportDocumentView.tsx)
- Separate "doctor report" PDF: 30 days from DEVICE storage only (meds+adherence, observations,
  sleep, weight), shared via OS sheet; "Nothing leaves the device except through the user's own
  share action." (Report/ReportScreen.tsx)

### 8. Premium
- Exact in-app line: "Go Premium" / "3 days free, then from €11 a month" (ProfileSheet.tsx:319-320).
- Tiers: Free €0 (daily logging, meds, timeline; 3 meal scans/mo; 2 AI messages/mo),
  General €11/mo (unlimited logging; camera pulse, health graph; 4 document scans/mo),
  All-in €18/mo "Recommended" (face pulse, 3D body, voice alarms; unlimited AI chat and scans);
  3 days free on paid plans; monthly renewal; cancel anytime. (PricingScreen.tsx:71-110)
- Gating reality: no billing backend; entitlement = local flag; dev builds always entitled;
  release default = Free; only prescription scanner wired to the gate today. "Voice alarms &
  call reminders" and "3D body" appear in tier copy but are not code-gated (feature screens are
  reachable; the gate is the purchase flow that doesn't exist yet).

### 9. Privacy / DSGVO posture
- On-device: SQLCipher AES-256 (256-bit hex key) for the local health DB; documented limits
  (not in-memory protection). (frontend/src/db/{encryption, schema}.ts)
- No analytics SDKs in app deps (no amplitude/sentry/firebase-analytics; Firebase = auth).
- Server: consent receipts + withdrawal (blocks new processing), DSR intake w/ SLA fields,
  self-service export, audit log (app/api/v1/privacy.py). Erasure: DELETE /privacy/data and
  /privacy/account wipe Postgres patient tables, Neo4j patient subgraph, Qdrant vectors,
  LangGraph checkpoints, Firebase user; honest completed/partial report; idempotent; then local
  wipe only after verified report (services/erasure.py; deletionContract.ts).
- PPG: frames never persisted; only scalars; raw images never enter Neo4j (graph_sync.py:1041).
- Marketing-safe: "DSGVO/GDPR aware, never sold", "export or delete everything, any time"
  (healthgraph_web/src/i18n.tsx:146,157,165). Avoid "certified/compliant" as an absolute claim.

### 10. Website
- healthgraph.shop + www are served by Caddy from the healthgraph_web dist (deploy/
  caddy-site.Caddyfile; root /opt/healthgraph-web/current on the VPS). frontend/web/index.html is
  NOT the .shop page — it is a different static "your whole health in one dial" page (a copy also
  sits at repo root index.html). The .shop hero/CTAs live in healthgraph_web (React + i18n).
- German: yes — in-page locale toggle (en default; de translations in i18n.tsx; document.lang
  switched; persisted in localStorage 'hg-locale'). No separate /de/ URL.
- .shop says: title "HealthGraph — Your health, connected"; hero EN "Health, connected." /
  DE "Gesundheit, verbunden."; kicker "10 apps send your data nowhere. HealthGraph connects it." /
  "10 Apps, 10 Abos, 0 Zusammenhänge."; trust "Free · No ads" / "Kostenlos · Ohne Werbung";
  meta "Kostenlos, DSGVO-konform, ohne Werbung"; pricing Free/11 €/18 €; "Your data rights:
  Export or delete everything, any time." CTA buttons are "Get the app / App holen" (in-page).

### 11. Truthful extras & known gaps
- Truthful extras: 20-tile Explore grid; "Everything you track." stats page
  (HealthAreas/HealthAreasScreen.tsx:155); drawer items My Priorities / Measure Pulse / Scan Food /
  Upload Record / Symptom Map / Chat / Timeline / 3D Body / Health Graph / My records
  (ProfileSheet.tsx); food scan "Scans estimate. Not measured, not a target."; user build-your-own
  correlation picker (≥3 shared dates required — honest gating); PPG "Saved · synced" = compact
  scalar sync to server + graph node.
- NOT yet implemented / not to claim: store listings (mailto early-access only); billing/payments;
  monthly quota enforcement; voice-out AI responses (sanoTTS production integration pending
  on-device g2p); blood pressure anywhere in PPG (API explicitly forbids BP fields); "3D body"
  as a free feature (All-in tier copy); face rPPG HRV.
- HealthGraph screen HUD is Three.js-based; the "3D" in the campaign is real app tech
  (three.js + expo-gl), not a placeholder.
