import { type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import { NAV_GROUPS, NAV_ITEMS } from '@shared/nav-items.ts';

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full" style={{ background: 'var(--paper)' }}>
      <nav
        className="flex w-[224px] shrink-0 flex-col overflow-y-auto border-r"
        style={{ borderColor: 'var(--hair)', background: 'var(--sheet)' }}
      >
        <div className="border-b px-5 py-4" style={{ borderColor: 'var(--hair)' }}>
          <span className="font-serif text-[19px] font-semibold" style={{ color: 'var(--ink)' }}>
            GasKya<span style={{ color: 'var(--ac)' }}>.</span>
          </span>
          <div className="mt-1 font-mono text-[10px]" style={{ color: 'var(--ink-3)' }}>
            the calm before the test
          </div>
        </div>

        <div className="flex-1 py-3">
          {NAV_GROUPS.map((group) => {
            const items = NAV_ITEMS.filter((i) => i.group === group);
            if (items.length === 0) return null;
            return (
              <div key={group} className="mb-4">
                <div
                  className="px-5 py-1 font-mono text-[10px] uppercase tracking-[0.14em]"
                  style={{ color: 'var(--ink-4)' }}
                >
                  {group}
                </div>
                {items.map((item) => (
                  <NavLink
                    key={item.route}
                    to={item.route}
                    className="block px-5 py-[6px] text-[13px] transition-colors"
                    style={({ isActive }) => ({
                      color: isActive ? 'var(--ac)' : 'var(--ink-2)',
                      background: isActive ? 'var(--ac-soft)' : 'transparent',
                      fontWeight: isActive ? 600 : 400,
                    })}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            );
          })}
        </div>
      </nav>

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[1100px] px-12 py-12">{children}</div>
      </main>
    </div>
  );
}
