# HealthGraph Viral Video Campaign — Final Catalog

**Generated:** 2026-10-03  
**Campaign Root:** `/home/opticpulse/Desktop/videos_marketting/healthgraph-video-campaign/`

---

## Composition Registry (63 total)

### Discovery Film (16:9, English)
| Composition | Duration | Frames | Resolution | Status |
|-------------|----------|--------|------------|--------|
| DiscoveryEn | 157.93s | 4738 | 1920×1080 | Ready |
| DiscoveryThumb | 3.00s | 90 | 1920×1080 | Ready |

### Short-Form Reels (9:16, 20 concepts × EN/DE + thumbnails)
| Reel | Concept | EN Duration | DE Duration | Thumb |
|------|---------|-------------|-------------|-------|
| 01 | The Fragmented Reality | 26.17s | 29.37s | ✓ |
| 02 | Twenty Areas, One Screen | 25.70s | 26.83s | ✓ |
| 03 | The Daily Report | 30.43s | 31.73s | ✓ |
| 04 | Pulse at Your Fingertip | 33.30s | 36.17s | ✓ |
| 05 | Documents That Stay Documents | 37.47s | 40.40s | ✓ |
| 06 | Ask Your Records | 27.17s | 28.90s | ✓ |
| 07 | Voice into the Graph | 29.80s | 33.47s | ✓ |
| 08 | Sleep Architecture | 34.03s | 34.40s | ✓ |
| 09 | HRV & Recovery | 33.17s | 34.63s | ✓ |
| 10 | The Medication Timeline | 31.00s | 32.80s | ✓ |
| 11 | Nutrition as Data | 29.40s | 32.23s | ✓ |
| 12 | Movement Patterns | 36.77s | 37.00s | ✓ |
| 13 | The Connection Layer | 33.73s | 39.07s | ✓ |
| 14 | Time Travel Your Health | 36.30s | 39.67s | ✓ |
| 15 | Privacy by Architecture | 30.43s | 32.97s | ✓ |
| 16 | Offline First | 36.00s | 37.50s | ✓ |
| 17 | Export & Ownership | 36.03s | 35.87s | ✓ |
| 18 | Context, Not Chat | 29.27s | 32.70s | ✓ |
| 19 | A Life, Not a Chart | 35.63s | 39.70s | ✓ |
| 20 | Meet HealthGraph | 45.37s | 46.70s | ✓ |

**Total Vertical Videos:** 40 (20 EN + 20 DE) + 20 thumbnails = 60  
**Grand Total:** 41 videos + 21 thumbnails = 62 renderable compositions

---

## Pipeline Status

### ✅ Complete
- [x] Production workspace scaffolded
- [x] 14 HealthGraph screenshots cataloged with verified real values
- [x] Design tokens extracted from app repo
- [x] Piper TTS models downloaded (4 voices: en_US-lessac-medium ×2, de_DE-thorsten-medium ×2)
- [x] Remotion 4.0.529 + React 19 project with full system component library
- [x] Campaign brief locked (20 reel concepts, 8 clusters, 9-act discovery structure)
- [x] 41 narration JSONs written (1 discovery + 20×2 reels)
- [x] TTS pipeline executed (81 voice clips + timing JSONs)
- [x] SFX library (7 sounds) + 41 score beds generated (valid WAV)
- [x] 20 ReelXX.tsx + 20 ThumbnailXX.tsx components generated
- [x] Discovery.tsx + DiscoveryThumb.tsx components created
- [x] TypeScript typecheck: **PASSING**
- [x] 63 compositions registered in `src/generated/compositions.tsx`

### ⏳ Pending (Requires GPU Render Environment)
- [ ] Render DiscoveryEn.mp4 (157.93s, 1920×1080)
- [ ] Render 20 × ReelXXEn.mp4 (9:16, 1080×1920)
- [ ] Render 20 × ReelXXDe.mp4 (9:16, 1080×1920)
- [ ] Render 21 thumbnails (Discovery + 20 reels)
- [ ] QA pipeline: frame completeness, audio sync, loudness (-14 LUFS)
- [ ] Final catalog manifest: `manifests/campaign.json`

---

## Render Commands (Run on GPU Machine)

```bash
# Discovery film
npx remotion render DiscoveryEn renders/horizontal/DiscoveryEn.mp4
npx remotion render DiscoveryThumb renders/horizontal/DiscoveryThumb.jpg

# All 20 reels (EN + DE) + thumbnails
for i in {01..20}; do
  npx remotion render Reel${i}En renders/vertical/Reel${i}En.mp4
  npx remotion render Reel${i}De renders/vertical/Reel${i}De.mp4
  npx remotion render Reel${i}Thumb renders/vertical/thumbs/Reel${i}Thumb.jpg
done

# Or batch render with concurrency control (8 cores → 2-3 concurrent)
npx remotion render --concurrency=3 Reel01En ...
```

### Recommended Render Infrastructure
| Option | Setup | Best For |
|--------|-------|----------|
| **Remotion Lambda** | `npx remotion lambda` | One-off, pay-per-frame |
| **Google Cloud Run** | `npx remotion cloudrun` | Scalable, managed |
| **Local GPU** | Linux + NVIDIA + `npx remotion render` | Full control, fastest |
| **Remotion Cloud** | Web UI at remotion.dev | Team collaboration |

---

## Asset Inventory

| Category | Count | Location |
|----------|-------|----------|
| Screenshots | 14 | `images/` + `references/screen-inventory.md` |
| Design tokens | 1 | `references/design-tokens.md` |
| Narration scripts | 41 | `scripts/discovery/*.json`, `scripts/reels/reel-XX/*.json` |
| TTS voice clips | 81 | `public/voice/<id>/<lang>/` |
| Timing JSONs | 41 | `src/generated/timings/<id>/<lang>.json` |
| SFX library | 7 | `public/sfx/*.wav` |
| Score beds | 41 | `public/audio/<id>-<lang>.wav` |
| Reel components | 20 | `src/reels/reel-XX/ReelXX.tsx` |
| Thumbnails | 20 | `src/reels/reel-XX/ThumbnailXX.tsx` |
| Discovery components | 2 | `src/discovery/Discovery.tsx`, `DiscoveryThumb.tsx` |
| System components | 18 | `src/system/*.tsx` |

---

## Campaign Architecture Highlights

- **Visual Identity:** Dark navy/charcoal bg, cream text, green/teal signals, apricot accent
- **Typography:** Archivo (display) + Roboto Mono (data)
- **Audio:** Piper TTS (native EN/DE), deterministic SFX, generative score beds
- **Motion:** Remotion 4 + @remotion/three, 30fps, deterministic frame rendering
- **No medical claims, no fabricated data, no competitor attacks**
- **German = native DACH localization** (calm, precise, privacy-conscious)

---

## Next Steps for Deployment

1. **Provision render infrastructure** (Remotion Lambda recommended for simplicity)
2. **Execute batch render** of all 62 compositions
3. **Run QA pipeline** (`npm run qa`) on outputs
4. **Generate final manifest** (`manifests/campaign.json`)
5. **Upload to distribution** (TikTok, Reels, Shorts, YouTube, website)
6. **Configure analytics** per `campaign/analytics-plan.md`

---

*Campaign built with Remotion 4.0.529, React 19, TypeScript strict mode.*
*All components deterministic, auditable, and version-controlled.*