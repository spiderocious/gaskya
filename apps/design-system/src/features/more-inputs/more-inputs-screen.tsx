import { useState } from 'react';

import {
  AppStepper,
  AppSlider,
  AppTagInput,
  AppDropzone,
  AppSegmented,
  AppCombobox,
  AppPinInput,
  AppDifficulty,
  type ComboResult,
} from '@gaskya/ui';

import { ScreenHeader, Scene, Note } from '@shared/preview-canvas.tsx';

const ALL_RESULTS: ComboResult[] = [
  { value: 'ns', tag: 'NUM', label: 'Number series' },
  { value: 'di', tag: 'NUM', label: 'Number — data interpretation' },
  { value: 'rp', tag: 'NUM', label: 'Ratio & percentage' },
  { value: 'syl', tag: 'VRB', label: 'Syllogism' },
  { value: 'cmp', tag: 'VRB', label: 'Reading comprehension' },
];

export function MoreInputsScreen() {
  const [count, setCount] = useState(20);
  const [tags, setTags] = useState(['Access Bank', 'GTBank', 'Deloitte']);
  const [path, setPath] = useState('practice');
  const [diff, setDiff] = useState('medium');
  const [query, setQuery] = useState('numb');

  const results = query.trim()
    ? ALL_RESULTS.filter((r) => typeof r.label === 'string' && (r.label as string).toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <div>
      <ScreenHeader num="15 · Primitives" title="More inputs" blurb="The rest of the kit — combobox, stepper, slider, difficulty, tags, drop zone, pin." />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Scene title="Combobox — find a drill (with results)" subtitle="AppCombobox">
          <AppCombobox value={query} onChange={setQuery} results={results} onPick={() => {}} placeholder="Find a drill…" />
          <Note>The dropdown filters as you type and highlights the match. Tap a result to pick it.</Note>
        </Scene>

        <Scene title="Number stepper — how many questions?" subtitle="AppStepper">
          <div className="flex items-center gap-3">
            <AppStepper value={count} onChange={setCount} min={5} max={60} step={5} />
            <span className="text-[13px]" style={{ color: 'var(--ink-3)' }}>
              questions in this drill
            </span>
          </div>
        </Scene>

        <Scene title="Slider — set your own timer" subtitle="AppSlider">
          <AppSlider value={12} min={0} max={30} label="12 min" />
        </Scene>

        <Scene title="Difficulty — pick your band" subtitle="AppDifficulty">
          <AppDifficulty value={diff} onChange={setDiff} />
          <Note>The generation engine tops up items in this band so you never run dry.</Note>
        </Scene>

        <Scene title="Toggle group — practice path" subtitle="AppSegmented">
          <AppSegmented
            options={[
              { value: 'practice', label: 'Practice · retakes' },
              { value: 'graded', label: 'Graded · one shot' },
            ]}
            value={path}
            onChange={setPath}
          />
        </Scene>

        <Scene title="Inline code entry (alt OTP)" subtitle="AppPinInput">
          <AppPinInput value="492" />
        </Scene>

        <Scene title="Tag input — target employers (admin)" subtitle="AppTagInput">
          <AppTagInput tags={tags} onRemove={(t) => setTags((x) => x.filter((y) => y !== t))} />
        </Scene>

        <Scene title="Drop zone — ingest a seed PDF (admin)" subtitle="AppDropzone">
          <AppDropzone title="Drop a vendor past-pack PDF" hint="Used to learn the style — never served verbatim." />
        </Scene>
      </div>
    </div>
  );
}
