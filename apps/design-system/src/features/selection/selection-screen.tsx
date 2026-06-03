import { useState } from 'react';

import { AppCheckbox, AppRadio, AppSwitch, AppSegmented, AppChip } from '@gaskya/ui';

import { ScreenHeader, Scene, Note } from '@shared/preview-canvas.tsx';

const FAMILIES = ['Numerical', 'Verbal', 'Diagrammatic', 'Abstract', 'Critical reasoning', 'Logical'];

export function SelectionScreen() {
  const [mode, setMode] = useState('practice');
  const [noBack, setNoBack] = useState(true);
  const [flag, setFlag] = useState(false);
  const [paged, setPaged] = useState('single');
  const [sms, setSms] = useState(true);
  const [cohort, setCohort] = useState(false);
  const [picked, setPicked] = useState<string[]>(['Numerical', 'Verbal']);

  const toggle = (f: string) =>
    setPicked((p) => (p.includes(f) ? p.filter((x) => x !== f) : [...p, f]));

  return (
    <div>
      <ScreenHeader num="12 · Primitives" title="Selection" blurb="A tick, not a fill." />

      <Scene title="Mode · how do you want to practise?" subtitle="AppSegmented">
        <AppSegmented
          options={[
            { value: 'practice', label: 'Practice · retakes' },
            { value: 'graded', label: 'Graded mock · one shot' },
          ]}
          value={mode}
          onChange={setMode}
        />
        <Note>The default is the cheap, kind path; the expensive graded pipeline is opt-in by intent.</Note>
      </Scene>

      <Scene title="Checkbox & radio" subtitle="AppCheckbox · AppRadio">
        <AppCheckbox checked={noBack} onChange={setNoBack} label="No going back once I start (like the real test)" />
        <AppCheckbox checked={flag} onChange={setFlag} label="Allow me to flag questions for review" />
        <div className="my-3 h-px" style={{ background: 'var(--hair)' }} />
        <AppRadio name="paging" checked={paged === 'single'} onChange={() => setPaged('single')} label="One question at a time" />
        <AppRadio name="paging" checked={paged === 'paged'} onChange={() => setPaged('paged')} label="Section-paged, like Dragnet" />
      </Scene>

      <Scene title="Switches — settings that stay calm" subtitle="AppSwitch">
        <div className="flex flex-col gap-3">
          <AppSwitch checked={sms} onChange={setSms} label="SMS reminders before a known assessment date" />
          <AppSwitch checked={cohort} onChange={setCohort} label="Show me cohort averages" />
        </div>
      </Scene>

      <Scene title="Chips · pick the families to drill" subtitle="AppChip">
        <div className="flex flex-wrap gap-2.5">
          {FAMILIES.map((f) => (
            <AppChip key={f} selected={picked.includes(f)} onClick={() => toggle(f)}>
              {f}
            </AppChip>
          ))}
        </div>
      </Scene>
    </div>
  );
}
