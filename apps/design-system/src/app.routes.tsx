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
const InputsScreen = lazy(() =>
  import('@features/inputs/inputs-screen.tsx').then((m) => ({ default: m.InputsScreen })),
);
const SelectionScreen = lazy(() =>
  import('@features/selection/selection-screen.tsx').then((m) => ({ default: m.SelectionScreen })),
);
const MoreInputsScreen = lazy(() =>
  import('@features/more-inputs/more-inputs-screen.tsx').then((m) => ({ default: m.MoreInputsScreen })),
);
const DatetimeScreen = lazy(() =>
  import('@features/datetime/datetime-screen.tsx').then((m) => ({ default: m.DatetimeScreen })),
);
const AvatarsScreen = lazy(() =>
  import('@features/avatars/avatars-screen.tsx').then((m) => ({ default: m.AvatarsScreen })),
);
const CardsScreen = lazy(() =>
  import('@features/cards/cards-screen.tsx').then((m) => ({ default: m.CardsScreen })),
);
const ProgressScreen = lazy(() =>
  import('@features/progress/progress-screen.tsx').then((m) => ({ default: m.ProgressScreen })),
);
const SkeletonsScreen = lazy(() =>
  import('@features/skeletons/skeletons-screen.tsx').then((m) => ({ default: m.SkeletonsScreen })),
);
const TablesScreen = lazy(() =>
  import('@features/tables/tables-screen.tsx').then((m) => ({ default: m.TablesScreen })),
);
const ChartsScreen = lazy(() =>
  import('@features/charts/charts-screen.tsx').then((m) => ({ default: m.ChartsScreen })),
);
const QuestionsScreen = lazy(() =>
  import('@features/questions/questions-screen.tsx').then((m) => ({ default: m.QuestionsScreen })),
);
const AnswerReviewScreen = lazy(() =>
  import('@features/answer-review/answer-review-screen.tsx').then((m) => ({ default: m.AnswerReviewScreen })),
);
const MediaScreen = lazy(() =>
  import('@features/media/media-screen.tsx').then((m) => ({ default: m.MediaScreen })),
);
const ModalsScreen = lazy(() =>
  import('@features/modals/modals-screen.tsx').then((m) => ({ default: m.ModalsScreen })),
);
const FeedbackScreen = lazy(() =>
  import('@features/feedback/feedback-screen.tsx').then((m) => ({ default: m.FeedbackScreen })),
);
const DrawerScreen = lazy(() =>
  import('@features/drawer/drawer-screen.tsx').then((m) => ({ default: m.DrawerScreen })),
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
        <Route path={ROUTES.INPUTS} element={<Lazy><InputsScreen /></Lazy>} />
        <Route path={ROUTES.SELECTION} element={<Lazy><SelectionScreen /></Lazy>} />
        <Route path={ROUTES.MORE_INPUTS} element={<Lazy><MoreInputsScreen /></Lazy>} />
        <Route path={ROUTES.DATETIME} element={<Lazy><DatetimeScreen /></Lazy>} />
        <Route path={ROUTES.AVATARS} element={<Lazy><AvatarsScreen /></Lazy>} />
        <Route path={ROUTES.CARDS} element={<Lazy><CardsScreen /></Lazy>} />
        <Route path={ROUTES.PROGRESS} element={<Lazy><ProgressScreen /></Lazy>} />
        <Route path={ROUTES.SKELETONS} element={<Lazy><SkeletonsScreen /></Lazy>} />
        <Route path={ROUTES.TABLES} element={<Lazy><TablesScreen /></Lazy>} />
        <Route path={ROUTES.CHARTS} element={<Lazy><ChartsScreen /></Lazy>} />
        <Route path={ROUTES.QUESTIONS} element={<Lazy><QuestionsScreen /></Lazy>} />
        <Route path={ROUTES.ANSWER_REVIEW} element={<Lazy><AnswerReviewScreen /></Lazy>} />
        <Route path={ROUTES.MEDIA} element={<Lazy><MediaScreen /></Lazy>} />
        <Route path={ROUTES.MODALS} element={<Lazy><ModalsScreen /></Lazy>} />
        <Route path={ROUTES.FEEDBACK} element={<Lazy><FeedbackScreen /></Lazy>} />
        <Route path={ROUTES.DRAWER} element={<Lazy><DrawerScreen /></Lazy>} />
        <Route path="*" element={<Navigate to={ROUTES.PALETTE} replace />} />
      </Routes>
    </Shell>
  );
}
