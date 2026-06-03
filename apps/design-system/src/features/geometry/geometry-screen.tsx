import { ScreenHeader, SectionBreak, Note } from '@shared/preview-canvas.tsx';

/** Visual spec: design-system/projects/gaskya/preview/03-geometry.html */
function Rad({ r, label }: { r: string; label: string }) {
  return (
    <div className="text-center">
      <div
        style={{
          width: 90,
          height: 60,
          background: 'var(--ac-soft)',
          border: '1px solid var(--ac-edge)',
          borderRadius: r,
        }}
      />
      <div className="mt-2 font-mono text-[10px]" style={{ color: 'var(--ink-3)' }}>
        {label}
      </div>
    </div>
  );
}

export function GeometryScreen() {
  return (
    <div>
      <ScreenHeader num="03 · Foundation" title="Spacing & geometry" blurb="Soft, this is a calm place. Rounded edges, hairlines not shadows." />

      <SectionBreak label="Radius lineup — rounded, never sharp" />
      <div className="flex flex-wrap items-end gap-[18px]">
        <Rad r="10px" label="10px · chips" />
        <Rad r="14px" label="14px · inputs" />
        <Rad r="18px" label="18px · cards" />
        <Rad r="22px" label="22px · result tile" />
        <Rad r="999px" label="999px · pills & keys" />
      </div>

      <SectionBreak label="Edges — hairlines, not shadows" />
      <div className="flex flex-wrap gap-5">
        <div className="w-[200px] rounded-[18px] border p-[18px]" style={{ borderColor: 'var(--hair)', background: 'var(--sheet)' }}>
          Hairline card
          <div className="text-[12px]" style={{ color: 'var(--ink-3)' }}>
            1px var(--hair)
          </div>
        </div>
        <div className="w-[200px] rounded-[18px] p-[18px]" style={{ background: 'var(--paper-2)' }}>
          Recessed well
          <div className="text-[12px]" style={{ color: 'var(--ink-3)' }}>
            paper-2, no border
          </div>
        </div>
      </div>
      <Note>
        The only intentional shadow in the whole system is the key-press button — and even that is a
        hard coloured edge, not a blur. Everywhere else: a line, or a recess.
      </Note>
    </div>
  );
}
