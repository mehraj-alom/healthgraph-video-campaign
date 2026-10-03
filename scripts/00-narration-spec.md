# Narration JSON spec (for script writers)

One JSON per video language:
`scripts/reels/reel-NN/reel-NN.en.narration.json` and `reel-NN.de.narration.json`
Discovery: `scripts/discovery/discovery.en.narration.json`

Schema:
{
  "id": "reel-01",              // video id
  "language": "en" | "de",
  "concept": "short slug",      // e.g. "fragmentation"
  "cluster": "A",
  "hook": "the on-screen hook line",
  "cta": "the CTA shown in end card",
  "thumbnail": "3-6 word thumbnail title (native language)",
  "caption": "Instagram caption incl. 8-12 hashtags, native language, ends with CTA",
  "lines": [
    { "id": "l1", "text": "spoken line", "beat": "visual beat this line drives (1 line, imperative)" }
  ]
}

Rules:
- lines are VOICE-ONLY (narration). On-screen text/labels are NOT lines unless also spoken.
- EN target: 8-14 lines, 45-100s spoken (aim 55-90s). DE: same structure, localized — German lines are slightly longer per word-count; keep duration equivalent.
- Discovery film: 26-40 lines, ~175-185s spoken total.
- Line text must be speakable: no "&", no "…", no all-caps, no emoji. Numbers spelled out where a voice actor would ("67 beats per minute" ok as "67 beats per minute").
- Every line <= 16 words EN / <= 20 words DE (subtitles fit 2 lines on mobile).
- Hook line (l1) = the reel's hook verbatim, <= 10 words.
- The final line(s) carry the CTA (e.g. "Explore HealthGraph at healthgraph.shop." / "Erlebe HealthGraph auf healthgraph.shop.").
- German: natural DACH German, no anglicisms, no literal EN sentence structure, no hype. Privacy/trust framing where natural (DSGVO, deine Daten).
- NO medical claims. NO "the only", "world's first", "proven", "doctor".
- Beats must reference real screens from references/screen-inventory.md where product UI appears, and name the visual motif (e.g. "fragmented objects float", "graph edges draw between nodes", "paper report opens").
- Each reel: ONE clear idea, ONE payoff. Do not recap the whole product in a reel.
- Reel durations are free within 45-100s — pick what the concept needs. Do not pad.
