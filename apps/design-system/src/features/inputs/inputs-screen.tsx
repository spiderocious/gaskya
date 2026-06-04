import { useState } from 'react';

import {
  AppField,
  AppInput,
  AppTextarea,
  AppSelect,
  AppIconSelect,
  AppMultiSelect,
  AppBubble,
  AppOtp,
} from '@gaskya/ui';
import { Landmark, Building2, Fuel, GraduationCap, Calculator, BookOpen, Shapes, Brain } from '@icons';

import { ScreenHeader, Scene, SectionBreak, Note } from '@shared/preview-canvas.tsx';

const ic = { size: 16, strokeWidth: 2 };

const TARGETS = [
  { value: 'banks', label: 'Banks — Graduate Trainee', sub: 'Numerical-heavy · video stage common', icon: <Landmark {...ic} /> },
  { value: 'big4', label: 'Big 4 — Audit & Advisory', sub: 'Critical reasoning · case write-up', icon: <Building2 {...ic} /> },
  { value: 'oil', label: 'Oil & Gas — NNPC / Shell', sub: 'Diagrammatic · async video', icon: <Fuel {...ic} /> },
  { value: 'general', label: 'General graduate trainee', sub: 'Balanced across families', icon: <GraduationCap {...ic} /> },
];

const SUBSKILLS = [
  { value: 'calc', label: 'Numerical reasoning', sub: 'Series, ratio, data interpretation', icon: <Calculator {...ic} /> },
  { value: 'verbal', label: 'Verbal reasoning', sub: 'Analogy, syllogism, comprehension', icon: <BookOpen {...ic} /> },
  { value: 'dia', label: 'Diagrammatic', sub: 'Shape sequences, flow rules', icon: <Shapes {...ic} /> },
  { value: 'abs', label: 'Abstract reasoning', sub: '3×3 matrices', icon: <Brain {...ic} /> },
];

const FAMILIES = [
  { value: 'num', label: 'Numerical' },
  { value: 'vrb', label: 'Verbal' },
  { value: 'dia', label: 'Diagrammatic' },
  { value: 'abs', label: 'Abstract reasoning' },
  { value: 'crt', label: 'Critical reasoning' },
  { value: 'log', label: 'Logical' },
];

export function InputsScreen() {
  const [target, setTarget] = useState('banks');
  const [subskill, setSubskill] = useState('calc');
  const [families, setFamilies] = useState<string[]>(['num', 'vrb', 'crt']);
  const [answer, setAnswer] = useState<string>('B');

  return (
    <div>
      <ScreenHeader num="11 · Primitives" title="Inputs" blurb="Phone-first — the test before the form. Rounded sheets on warm paper, aubergine focus." />

      <Scene title="Domain · the answer field" subtitle="AppBubble — choose A/B/C/D">
        <p className="mb-3.5 font-serif text-[16px]" style={{ color: 'var(--ink)' }}>
          A sum doubles in 6 years at simple interest. What is the rate per annum?
        </p>
        <div className="flex max-w-[420px] flex-col gap-3">
          {[
            { l: 'A', t: '12.5%' },
            { l: 'B', t: '16⅔%' },
            { l: 'C', t: '20%' },
            { l: 'D', t: '8.33%' },
          ].map((o) => (
            <button
              key={o.l}
              onClick={() => setAnswer(o.l)}
              className="flex items-center gap-3.5 rounded-[14px] border px-3.5 py-3 text-left transition-colors"
              style={{
                borderColor: answer === o.l ? 'var(--ac)' : 'var(--hair)',
                background: answer === o.l ? 'var(--ac-soft)' : 'var(--sheet)',
              }}
            >
              <AppBubble letter={o.l} state={answer === o.l ? 'on' : 'idle'} />
              <span className="text-[14px]">{o.t}</span>
            </button>
          ))}
        </div>
        <Note>The whole row is the tap target — thumbs on a cracked screen miss small circles.</Note>
      </Scene>

      <Scene title="Domain · phone-first sign-in" subtitle="AppField + AppInput + AppOtp">
        <div className="max-w-[420px]">
          <AppField label="Phone number">
            <AppInput mono defaultValue="+234 803 412 9920" />
          </AppField>
          <AppField label="Email · optional" hint="May be secondary — the target user lives on their phone.">
            <AppInput placeholder="you@example.com" />
          </AppField>
          <div className="mt-2">
            <AppOtp value="492" />
          </div>
        </div>
      </Scene>

      <Scene title="Domain · what are you aiming for?" subtitle="AppSelect / AppIconSelect">
        <div className="grid max-w-[680px] grid-cols-1 gap-6 sm:grid-cols-2">
          <AppField label="Native select (no per-option icons)">
            <AppSelect
              options={TARGETS.map((t) => ({ value: t.value, label: t.label }))}
              defaultValue="banks"
            />
          </AppField>
          <AppField label="Icon select — target employer">
            <AppIconSelect options={TARGETS} value={target} onChange={setTarget} />
          </AppField>
        </div>
        <Note>
          The icon-select renders a real <code>lucide-react</code> icon per option (via <code>@icons</code>),
          a label, and a one-line read of what each target's test emphasises. A native <code>&lt;select&gt;</code>
          can't show per-option icons, so the icon path is always <code>AppIconSelect</code>.
        </Note>
      </Scene>

      <Scene title="Icon select — pick a sub-skill to drill" subtitle="AppIconSelect (second example)">
        <div className="max-w-[420px]">
          <AppIconSelect options={SUBSKILLS} value={subskill} onChange={setSubskill} />
        </div>
      </Scene>

      <Scene title="Multi-select — families to drill" subtitle="AppMultiSelect (tokens + checkable menu)">
        <div className="max-w-[420px]">
          <AppMultiSelect options={FAMILIES} value={families} onChange={setFamilies} />
        </div>
      </Scene>

      <SectionBreak label="Generic — text · error · textarea" />
      <div className="max-w-[420px]">
        <AppField label="What should we call you?">
          <AppInput defaultValue="Halima" />
        </AppField>
        <AppField label="Phone number" error="That doesn't look like a complete Nigerian number.">
          <AppInput mono invalid defaultValue="0803 412" />
        </AppField>
        <AppField label="Your draft answer">
          <AppTextarea defaultValue="I want this graduate role because" />
        </AppField>
      </div>
    </div>
  );
}
