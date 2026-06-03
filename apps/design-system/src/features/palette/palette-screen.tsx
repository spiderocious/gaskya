import { ScreenHeader, SectionBreak, Note } from '@shared/preview-canvas.tsx';

/** Visual spec: design-system/projects/gaskya/preview/01-palette.html */
function Sw({ name, hex, varName }: { name: string; hex: string; varName: string }) {
  return (
    <div className="overflow-hidden rounded-[18px] border" style={{ borderColor: 'var(--hair)', background: 'var(--sheet)' }}>
      <div style={{ height: 72, background: `var(${varName})`, borderBottom: '1px solid var(--hair)' }} />
      <div className="px-3 py-2.5">
        <div className="text-[12.5px] font-semibold" style={{ color: 'var(--ink)' }}>{name}</div>
        <div className="font-mono text-[11px]" style={{ color: 'var(--ink-3)' }}>{hex}</div>
      </div>
    </div>
  );
}

const GRID = 'grid gap-3.5 [grid-template-columns:repeat(auto-fill,minmax(150px,1fr))]';

export function PaletteScreen() {
  return (
    <div>
      <ScreenHeader num="01 · Foundation" title="Palette" blurb="Truth is one colour. Aubergine — deep, earned, scholarly. Crimson stays reserved." />

      <div className="mb-10 rounded-[22px] px-9 py-10" style={{ background: 'var(--ac)', color: '#fff' }}>
        <div className="max-w-[16ch] font-serif text-[40px] font-semibold leading-[1.05]">
          Truth is one colour. We chose it carefully.
        </div>
        <div className="mt-3.5 max-w-[52ch] font-serif text-[16px] italic opacity-85">
          Not the blue or green every Nigerian test-prep tool reaches for. It means: this was
          measured fairly, and it's yours.
        </div>
      </div>

      <SectionBreak label="Accent — the one colour that does work" />
      <div className={GRID}>
        <Sw name="Aubergine" hex="#5A2A4D · primary" varName="--ac" />
        <Sw name="Aubergine deep" hex="#421E39 · hover / edge" varName="--ac-deep" />
        <Sw name="Aubergine mid" hex="#8A4F7C" varName="--ac-mid" />
        <Sw name="Aubergine soft" hex="#F3EBF1 · fill" varName="--ac-soft" />
        <Sw name="Aubergine edge" hex="#DFCBDA · border" varName="--ac-edge" />
      </div>

      <SectionBreak label="Paper & ink — warm, no pure black" />
      <div className={GRID}>
        <Sw name="Paper" hex="#F6F1EC · canvas" varName="--paper" />
        <Sw name="Paper 2" hex="#EFE8E0" varName="--paper-2" />
        <Sw name="Sheet" hex="#FFFFFF · cards" varName="--sheet" />
        <Sw name="Ink" hex="#2C2620" varName="--ink" />
        <Sw name="Ink 2" hex="#4A4338 · body" varName="--ink-2" />
        <Sw name="Ink 3" hex="#7C7264" varName="--ink-3" />
        <Sw name="Ink 4" hex="#A89E90" varName="--ink-4" />
        <Sw name="Hair" hex="#E3DACF" varName="--hair" />
      </div>

      <SectionBreak label="Reserved states — crimson never decorates" />
      <div className={GRID}>
        <Sw name="Crimson" hex="#A1281E · clock / irreversible" varName="--crit" />
        <Sw name="Amber" hex="#9A6612 · everyday warn" varName="--warn" />
        <Sw name="Sage" hex="#4E6B4F · saved / on-track" varName="--good" />
      </div>

      <Note>
        Crimson is the only red, and it is reserved: the live clock running out, and a genuinely
        irreversible action. Everyday warnings use the calm amber; “on track” uses sage. One accent
        carries everything interactive — the discipline is the point.
      </Note>
    </div>
  );
}
