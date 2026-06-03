import { lazy, Suspense, type ReactNode } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ROUTES } from '@shared/routes.ts';
import { Shell } from '@features/shell/shell.tsx';

const PaletteScreen = lazy(() =>
  import('@features/palette/palette-screen.tsx').then((m) => ({ default: m.PaletteScreen })),
);
const TypeScreen = lazy(() =>
  import('@features/type/type-screen.tsx').then((m) => ({ default: m.TypeScreen })),
);
const GeometryScreen = lazy(() =>
  import('@features/geometry/geometry-screen.tsx').then((m) => ({ default: m.GeometryScreen })),
);
const MotionScreen = lazy(() =>
  import('@features/motion/motion-screen.tsx').then((m) => ({ default: m.MotionScreen })),
);
const ButtonsScreen = lazy(() =>
  import('@features/buttons/buttons-screen.tsx').then((m) => ({ default: m.ButtonsScreen })),
);

function Lazy({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="p-8 font-mono text-[11px]" style={{ color: 'var(--ink-4)' }}>
          Loading…
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

export function AppRoutes() {
  return (
    <Shell>
      <Routes>
        <Route path={ROUTES.PALETTE} element={<Lazy><PaletteScreen /></Lazy>} />
        <Route path={ROUTES.TYPE} element={<Lazy><TypeScreen /></Lazy>} />
        <Route path={ROUTES.GEOMETRY} element={<Lazy><GeometryScreen /></Lazy>} />
        <Route path={ROUTES.MOTION} element={<Lazy><MotionScreen /></Lazy>} />
        <Route path={ROUTES.BUTTONS} element={<Lazy><ButtonsScreen /></Lazy>} />
        <Route path="*" element={<Navigate to={ROUTES.PALETTE} replace />} />
      </Routes>
    </Shell>
  );
}
