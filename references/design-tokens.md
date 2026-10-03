# Design Tokens (extracted from app repo, read-only: frontend/src/theme/tokens.ts + screenshots)

Campaign theme (in `remotion/src/system/theme.ts`) — matches actual app:

Dark (primary campaign surface):
- bg deep: #0B0F16 (screenshot dark navy), surface #141B26, card #1A2331, line #26303F
- text primary: #F4EFE6 (warm cream), secondary #A9B4C2, muted #5F6B7A
- green signal: #4E9B5F (success/nutrition), teal #2E8B7A, green bright #7FC48D
- apricot accent: #E8862E (app "brand"/wellbeing), apricot dim #C96A1E
- red voice pulse: #E8355B
- category colors (app healthCategories): sleep/medication #8A7BC8, heart/vitals #C2503E, nutrition #4E9B5F, activity #4A90C2, wellbeing #E8862E, mood #E8A07C

Paper (Daily Health Diary reports):
- paper: #F5F0E1, paper dim #EAE3D0, ink #23201A, ink soft #6B6353, hairline #D8CFBA
- paper accent green: #2F7D5B

Light app cream (secondary context): bg #EAE4D6, surface #FFFBF3, ink #1D1B17

Typography:
- Display/body: Archivo (variable, 100–900, italic) via @remotion/google-fonts
- Data/labels: Roboto Mono (400/500/700)
- Hierarchy: OVERLINE 11px/700/track 1.2 uppercase → section 28–40 → headline 64–140 (reel) / 96–160 (1080p) → body 26–34 → caption 18–22
- Subtitles: Archivo 600, 42–52px (1080 wide), white, max 2 lines, pill scrim rgba(6,10,16,.55) rounded 18, bottom safe zone

Easing (app tokens): easeOutQuart (entrances), easeInOutCubic (travels), easeInCubic (exits), springGentle (dials), premium glide cubic-bezier(0.22,1,0.36,1)

Motion rules:
- Duration bands: fast 150ms (micro), standard 250ms, emphasized 350ms, slow 500ms; scene moves 0.8–1.6s
- Screenshot movement: parallax ≤ 30px, push-in ≤ 8% scale, perspective rotateX ≤ 8deg / rotateY ≤ 10deg
- One active protagonist per scene. Camera almost still; motion in the content.
- Data pings: 200–300ms, green #4E9B5F, radius ≤ 4px core + 24px halo

Logo: use real mark from screenshots (graph node + pulse waveform). App logo.png exists in repo root — copy to references/ as logo-reference.png for manual reference only (rebuild vector in component: 3 nodes + polyline pulse in cream/green on dark, wordmark "healthgraph" Archivo 600 lowercase, tracking -0.5).
