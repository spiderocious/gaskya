import {
  useCallback,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react';

const COMMIT_THRESHOLD_PCT = 0.3;
const EXIT_ANIMATION_MS = 200;

interface SwipeableToastProps {
  children: ReactNode;
  onDismiss: () => void;
  /** Drag disabled for sticky toasts. */
  disabled: boolean;
}

/**
 * SwipeableToast — drag a toast horizontally past 30% of its width to dismiss;
 * release earlier and it springs back. Uses pointer capture so the drag keeps
 * tracking even when the pointer leaves the element. Disabled for sticky toasts.
 */
export function SwipeableToast({ children, onDismiss, disabled }: SwipeableToastProps) {
  const ref = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);
  const elementWidth = useRef(0);
  const [dragX, setDragX] = useState(0);
  const [exiting, setExiting] = useState<null | 'left' | 'right'>(null);

  const transition =
    exiting !== null
      ? `transform ${EXIT_ANIMATION_MS}ms cubic-bezier(0.4,0,1,1), opacity ${EXIT_ANIMATION_MS}ms cubic-bezier(0.4,0,1,1)`
      : dragStartX.current === null
        ? 'transform 200ms cubic-bezier(0.34,1.56,0.64,1)'
        : 'none';

  const transform =
    exiting === 'left' ? 'translateX(-120%)' : exiting === 'right' ? 'translateX(120%)' : `translateX(${dragX}px)`;

  const opacity =
    exiting !== null ? 0 : 1 - Math.min(Math.abs(dragX) / (elementWidth.current * 0.6 || 1), 0.6);

  const commit = useCallback(
    (dir: 'left' | 'right') => {
      setExiting(dir);
      window.setTimeout(onDismiss, EXIT_ANIMATION_MS);
    },
    [onDismiss],
  );

  function onPointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    if (disabled || exiting !== null) return;
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    dragStartX.current = e.clientX;
    elementWidth.current = ref.current?.getBoundingClientRect().width ?? 0;
    ref.current?.setPointerCapture(e.pointerId);
  }
  function onPointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (dragStartX.current === null) return;
    setDragX(e.clientX - dragStartX.current);
  }
  function onPointerEnd(e: ReactPointerEvent<HTMLDivElement>) {
    if (dragStartX.current === null) return;
    const distance = e.clientX - dragStartX.current;
    const threshold = elementWidth.current * COMMIT_THRESHOLD_PCT;
    dragStartX.current = null;
    if (Math.abs(distance) >= threshold) commit(distance < 0 ? 'left' : 'right');
    else setDragX(0);
    ref.current?.releasePointerCapture(e.pointerId);
  }

  return (
    <div
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
      className="select-none"
      style={{
        transform,
        opacity,
        transition,
        touchAction: disabled ? 'auto' : 'pan-y',
        cursor: disabled ? 'default' : dragStartX.current !== null ? 'grabbing' : 'grab',
      }}
    >
      {children}
    </div>
  );
}
