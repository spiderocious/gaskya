import { useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';

import { cn } from '../../utils/cn.ts';
import { AppBanner } from '../../overlays/app-feedback/index.ts';
import { DrawerService } from './drawer-service.ts';
import { drawerStore, type BannerEntry, type BannerPosition } from './drawer-store.ts';

const POSITIONS: readonly BannerPosition[] = ['top', 'bottom'];

const ZONE: Record<BannerPosition, string> = {
  top: 'top-0 inset-x-0 flex-col',
  bottom: 'bottom-0 inset-x-0 flex-col-reverse',
};

/**
 * BannerHost — mount once at the app root. Renders the banner queue grouped by
 * position (top/bottom), full-width, stacking when multiple share a position.
 */
export function BannerHost() {
  const state = useSyncExternalStore(drawerStore.subscribe, drawerStore.getState);
  if (state.banners.length === 0 || typeof document === 'undefined') return null;

  return createPortal(
    <>
      {POSITIONS.map((pos) => {
        const zone = state.banners.filter((b) => b.position === pos);
        if (zone.length === 0) return null;
        return (
          <div key={pos} className={cn('pointer-events-none fixed z-[55] flex gap-2 p-4', ZONE[pos])}>
            {zone.map((b) => (
              <BannerSlot key={b.id} banner={b} />
            ))}
          </div>
        );
      })}
    </>,
    document.body,
  );
}

function BannerSlot({ banner }: { banner: BannerEntry }) {
  const cta = banner.cta;
  const effectiveCta =
    cta !== undefined
      ? { label: cta.label, onClick: () => { cta.onClick(); DrawerService.dismissBanner(banner.id); } }
      : !banner.sticky
        ? { label: 'Dismiss', onClick: () => DrawerService.dismissBanner(banner.id) }
        : undefined;

  return (
    <div className="pointer-events-auto mx-auto w-full max-w-[1100px]">
      <AppBanner
        tone={banner.tone}
        title={banner.title}
        {...(banner.description !== undefined ? { description: banner.description } : {})}
        {...(banner.icon !== undefined ? { icon: banner.icon } : {})}
        {...(effectiveCta !== undefined ? { cta: effectiveCta } : {})}
      />
    </div>
  );
}
