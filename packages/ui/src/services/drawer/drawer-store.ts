// Imperative toast + modal store — a plain pub-sub class, no framework dep.
// Mirrors the Solon drawer pattern; hosts subscribe via useSyncExternalStore.

export type ToastVariant = 'default' | 'good' | 'warn' | 'crit';

export interface ToastItem {
  id: string;
  title: string;
  subtitle?: string;
  action?: string;
  variant?: ToastVariant;
  durationMs?: number;
}

export type ModalVariant = 'confirm' | 'crit';

export interface ModalItem {
  id: string;
  title: string;
  body: string;
  variant?: ModalVariant;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export interface DrawerState {
  toasts: ToastItem[];
  modal: ModalItem | null;
}

type Listener = () => void;

export class DrawerStore {
  private state: DrawerState = { toasts: [], modal: null };
  private listeners = new Set<Listener>();
  private seq = 0;

  getState(): DrawerState {
    return this.state;
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    this.listeners.forEach((l) => l());
  }

  private setState(next: Partial<DrawerState>): void {
    this.state = { ...this.state, ...next };
    this.notify();
  }

  private nextId(prefix: string): string {
    this.seq += 1;
    return `${prefix}-${this.seq}`;
  }

  toast(item: Omit<ToastItem, 'id'>): void {
    const id = this.nextId('toast');
    const toast: ToastItem = { id, durationMs: 4000, ...item };
    this.setState({ toasts: [...this.state.toasts, toast] });
    if (toast.durationMs && toast.durationMs > 0) {
      setTimeout(() => this.dismissToast(id), toast.durationMs);
    }
  }

  dismissToast(id: string): void {
    this.setState({ toasts: this.state.toasts.filter((t) => t.id !== id) });
  }

  showModal(item: Omit<ModalItem, 'id'>): void {
    this.setState({ modal: { id: this.nextId('modal'), ...item } });
  }

  dismissModal(): void {
    this.setState({ modal: null });
  }
}
