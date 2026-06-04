# GasKya UI — design-system ship report

Shipped the **GasKya Studio design system** ("the calm before the test") into
`@gaskya/ui`, with a live viewer at `apps/design-system`. Date: 2026-06-04.

**Canonical visual spec (source of truth, never edited):**
`…/2026/dockito/design-system/projects/gaskya/` — 34 HTML specimens + `_foundation.css`.
The HTML survives as the reference; these React components are its production sibling.

---

## What the repo looked like (calibration)

Nx + pnpm monorepo, React 19, TypeScript (very strict: `noUncheckedIndexedAccess`,
`exactOptionalPropertyTypes` — the latter turned **off** inside `packages/ui`), Vite,
Tailwind 3 (per-app config, literal palette — not CSS-var-driven). The UI package
(`@gaskya/ui`) had a generic **navy/blue/orange + Inter/Georgia template** palette and two
placeholder components (`AppButton`, `AppText`). Conventions: `forwardRef`, named exports,
`interface` props, `cn = twMerge(clsx())` at `utils/cn`, `App*` naming, `lucide-react` via
`@icons`.

Three findings were surfaced and resolved with the user before writing:

1. **Re-theme.** The scaffold palette was not GasKya. Replaced with the aubergine /
   warm-paper / Fraunces+Inter+JetBrains-Mono spec. (Decision: re-theme — the point of the
   ship.)
2. **Import extensions.** `packages/ui` used `.js` on relative imports; the apps used
   `.tsx`. Standardised on **`.ts/.tsx`** everywhere (incl. flipping the two existing files),
   per the standing rule. Required `allowImportingTsExtensions: true` and switching the
   package build to `emitDeclarationOnly: true` (consumers use `src` via Vite alias; the
   build now emits `.d.ts` only).
3. **`exactOptionalPropertyTypes`** is off in `packages/ui` — optional props stay simple.

---

## Tokens re-themed (foundation)

- `packages/ui/src/theme/index.ts` — `COLORS` / `FONTS` / `RADII` / `KEY_LIFT`.
- `packages/ui/src/styles.css` — the full CSS-var layer (components consume `var(--ac)`
  etc.), the `.gk-key` physical-press rule, and keyframes (`gk-clockpulse`, `gk-shimmer`,
  `gk-spin`, `gk-indet`). Reduced-motion respected globally.
- `apps/{design-system,web,admin-web,website}/tailwind.config.ts` — extended `theme` with
  the aubergine palette, the three font families, gk radii, and the `key` box-shadow.
- `apps/design-system/index.html` — fonts (Fraunces + Inter + JetBrains Mono) via the
  repo's existing Google-Fonts `<link>` approach. **No package install needed.**
- `apps/design-system/src/styles.css` — imports `@gaskya/ui/styles.css`; uses the new vars.

---

## Components generated (24 component files)

All under `packages/ui/src`, `App*`-named, exported through `src/index.ts`.

**Primitives** (`primitives/`):
`AppButton` (re-themed to the hand-tuned physical key-press: 5 variants × 3 sizes),
`AppText`, `AppField` / `AppInput` / `AppTextarea` / `AppSelect`, `AppIconSelect` /
`AppMultiSelect` (hand-rolled, no headless lib), `AppBubble` (A/B/C/D answer mark),
`AppOtp`, `AppCheckbox` / `AppRadio` / `AppSwitch` / `AppSegmented` / `AppChip`,
`AppStepper` / `AppSlider` / `AppTagInput` / `AppSearch` / `AppDropzone`, `AppClock`.

**Display** (`display/`):
`AppPill` / `AppTag`, `AppAvatar` / `AppAvatarStack` / `AppLogo` (circle/squircle/rounded/
square shapes), `AppCard` / `AppResultCard`, `AppTrack` / `AppProgressRing` / `AppSpinner` /
`AppIndeterminate` / `AppPipeline`, `AppSkeleton` / `AppEmptyState` / `AppErrorState`.

**Data** (`data/`):
`AppTable` (generic, column-driven), `AppSparkline` / `AppTrendLine`, `AppFunnelStepper`,
`AppQuestionCard` / `AppWorkedSolution` / `AppAnswerGrid` / `AppBubbleReview`,
`AppAudioPlayer` / `AppVideoPlayer` / `AppTranscript` (presentational — see below).

**Overlays** (`overlays/`):
`AppTooltip` / `AppPopover` (hand-rolled); feedback — `AppToast` / `AppBanner` /
`AppInlineAlert` (tones: default · good · warn · crit · accent); modals — a shared
`ModalShell` primitive driving `AppModal` (intent: standard/danger), `AppCriticalModal`
(type-to-confirm — the mandatory irreversible idiom), `AppCustomModal` (arbitrary body + X),
and the back-compat `AppTypedConfirmModal`. Every modal supports **five positions**
(`center` / `top` / `bottom` → sheets / `left` / `right` → side drawers) and
`closeOnOutsideClick` · `closeOnEscape` · `sticky`.

**Services** (`services/drawer/`) — the full imperative layer (modelled on the Gbedity
drawer, adapted to GasKya tokens + `.ts` imports):
- `drawerStore` — pub-sub store with **three queues** (toasts, banners, modal).
- `DrawerService` — `toast(msg, {tone, position, sticky, durationMs, subtitle, action})` with
  **six toast zones** (top/bottom × left/center/right); `banner(title, {tone, position
  top/bottom, sticky, durationMs, cta, icon, description})`; `confirm(title, {destructive,
  …})`; `critical(title, {confirmPhrase, confirmPrompt, …})`; `openModal(body, {position,
  sticky, hideCloseButton, …})`; plus `dismissToast` / `dismissBanner` / `closeModal`.
- `SwipeableToast` — drag-to-dismiss (pointer-capture, 30% commit threshold, spring-back);
  disabled for sticky toasts.
- Hosts: `ToastHost` (six zones), `BannerHost` (top/bottom, full-width stack), `ModalHost`
  (delegates to the right modal kind). **All three are mounted at the viewer root**
  (`apps/design-system/src/app.tsx`); mount the same three once at any consuming app's root.

---

## The viewer (`apps/design-system`)

Rebuilt from the 2-route placeholder into a Solon-style shell: a grouped sidebar
(`Shell` + `nav-items` + `routes`), shared `preview-canvas` helpers
(`ScreenHeader`/`Scene`/`SectionBreak`/`Row`/`Note`), and **22 lazy-loaded screens** — one
per component group, each component shown in scenes (the no-catalogue rule). Dev: `pnpm
--filter @gaskya/design-system dev` (port 5173).

The template placeholders (`features/example`, `features/health`, the duplicate `App.tsx`)
were removed.

---

## Presentational media (a deliberate boundary)

`AppAudioPlayer` / `AppVideoPlayer` / `AppTranscript` render the controls, waveform, frame
strip and transcript **UI only**. Real playback (audio/video elements, `currentTime`,
upload, frame capture) is application code — drive the visuals with `progressPct` and the
segment/frame data. This keeps the library presentational and honours the "store-heavy,
process-light" cost model rather than baking pipeline logic into UI.

---

## Skipped (scenes, not library building blocks)

These Studio specimens are full situations for **application code**, not library exports.
Build them in `apps/web` using the components above; visual spec in the Studio folder:

- `40-sample-mock` · the no-signup sample flow
- `41-aptitude-test` · the live timed-mock test chrome
- `42-video-coach` · the full video-coaching report surface
- `43-dashboard` · the funnel & readiness home base
- `52-cross` · cross-record patterns (originality check, partner cohort, AI assist)
- `32-question-bank` · the admin extraction/review queue
- `31-questions-figure` · the SVG figure questions are *content* (generated shape
  sequences / matrices); the option chrome ships via `AppBubble` + `AppQuestionCard`, but the
  figures themselves are data, not components.

---

## Manual work remaining

- Mount `<ModalHost />` + `<ToastHost />` + `<BannerHost />` at the root of `apps/web` /
  `apps/admin-web` when those apps start using `DrawerService`.
- Wire real media playback behind the presentational players.
- The figure-question SVGs (diagrammatic/abstract) come from the generation engine; the UI
  renders whatever SVG/markup the item carries.
- `apps/website` (Next.js) was re-themed in its tailwind config but has no viewer wiring.

---

## Completeness pass (2026-06-04, round 3)

The first pass shipped one component per concept; this pass built out the *variety* in each
specimen so the library mirrors the Studio fully. Added:

- **Charts** (`data/app-charts`): `AppBarChart`, `AppStackedBar`, `AppDonut`, `AppHeatmap`,
  `AppBullet`, `AppRadar`, `AppDistribution` (joining the existing sparkline/trend/ring).
- **Tables** (`data/app-table`): sortable headers + expandable rows on `AppTable`, plus
  `AppComparisonTable` and `AppPagination`.
- **Questions — text** (`data/app-question`): `AppQuestionCard` gained `passage`, `twoColumn`,
  `footer`; added `AppNumericEntry`. The screen renders all 10 families (number series, ratio
  word-problem, numeric entry, analogy, syllogism, comprehension, cloze, assumption,
  T/F/cannot-say, ordering).
- **Questions — figure** (`data/app-figure-question`, full SVG): `AppShapeSequence`,
  `AppFlowRule`, `AppMatrix3x3` + data-interpretation via `AppQuestionCard` with an SVG passage.
- **Question bank / admin** (`data/app-question-bank`): `AppItemRecord`, `AppValidityGate`,
  `AppReviewQueue`, `AppBankStat`.
- **Cards** (`display/app-card`): added `AppStatTile`, `AppTipCard`; the screen covers
  drill / pack / written-prompt / stat / funnel-stage / history / partner / sponsor / tip.
- **Media** (`data/app-media`): `AppAudioPlayer` gained `variant` (full / inline / recording).
- **Navigation** (`display/app-nav`): `AppTopBar`, `AppTabBar` (phone), `AppCommandMenu`.
- **Overlays** (`overlays/app-overlay`): added `AppHovercard`.
- **Progress**: autosave pip, count-up, generating, page-splash states added to the screen.

New viewer routes: Questions · text / figure / bank, Tooltips, Navigation. Total now
**30 component files · 26 viewer screens**.

## Checks (all green)

- `pnpm --filter @gaskya/ui typecheck` → 0
- `apps/design-system` `tsc -p tsconfig.app.json --noEmit` → 0
- `pnpm --filter @gaskya/ui lint` → 0 · `pnpm --filter @gaskya/design-system lint` → 0
- `pnpm --filter @gaskya/ui build` → 0 (emits `.d.ts`)

Conventions honoured: `forwardRef` where the existing button used it, named exports,
`interface` props, `cn` from `utils/cn`, `App*` naming, `.ts/.tsx` imports, `@icons` for
lucide, CSS-var token consumption, no tests (none existed next to components).
