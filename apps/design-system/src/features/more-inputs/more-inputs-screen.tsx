import { useState } from 'react';

import {
  AppStepper,
  AppSlider,
  AppTagInput,
  AppSearch,
  AppDropzone,
  AppSegmented,
} from '@gaskya/ui';

import { ScreenHeader, Scene } from '@shared/preview-canvas.tsx';

export function MoreInputsScreen() {
  const [count, setCount] = useState(20);
  const [tags, setTags] = useState(['Access Bank', 'GTBank', 'Deloitte']);
  const [path, setPath] = useState('practice');

  return (
    <div>
      <ScreenHeader num="15 · Primitives" title="More inputs" blurb="The rest of the kit — search, stepper, slider, tags, drop zone." />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Scene title="Search / combobox" subtitle="AppSearch">
          <AppSearch placeholder="Find a drill…" value="numb" onChange={() => {}} />
        </Scene>

        <Scene title="Number stepper" subtitle="AppStepper">
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
