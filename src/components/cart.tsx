"use client";

import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore } from "react";

export type CartLine = {
  handle: string;
  name: string;
  size: string;
  price: number;
  image: string;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  ready: boolean;
  open: () => void;
  close: () => void;
  add: (line: Omit<CartLine, "quantity">, quantity?: number) => void;
  setQuantity: (handle: string, size: string, quantity: number) => void;
  remove: (handle: string, size: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const KEY = "tm_cart_v1";
const EMPTY: CartLine[] = [];

let current: CartLine[] | null = null;
const listeners = new Set<() => void>();

function read(): CartLine[] {
  if (current) return current;
  try {
    const saved = localStorage.getItem(KEY);
    current = saved ? JSON.parse(saved) : EMPTY;
  } catch {
    current = EMPTY;
  }
  return current!;
}

function write(update: (prev: CartLine[]) => CartLine[]) {
  const next = update(read());
  if (next === current) return;
  current = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {}
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key !== KEY) return;
    current = null;
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

const noopSubscribe = () => () => {};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const lines = useSyncExternalStore(subscribe, read, () => EMPTY);
  const ready = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const [isOpen, setOpen] = useState(false);

  const add = useCallback((line: Omit<CartLine, "quantity">, quantity = 1) => {
    write((prev) => {
      const hit = prev.find((l) => l.handle === line.handle && l.size === line.size);
      if (hit) return prev.map((l) => (l === hit ? { ...l, quantity: Math.min(10, l.quantity + quantity) } : l));
      return [...prev, { ...line, quantity }];
    });
    setOpen(true);
  }, []);

  const setQuantity = useCallback((handle: string, size: string, quantity: number) => {
    write((prev) =>
      quantity <= 0
        ? prev.filter((l) => !(l.handle === handle && l.size === size))
        : prev.map((l) => (l.handle === handle && l.size === size ? { ...l, quantity: Math.min(10, quantity) } : l)),
    );
  }, []);

  const remove = useCallback((handle: string, size: string) => {
    write((prev) => prev.filter((l) => !(l.handle === handle && l.size === size)));
  }, []);

  const clear = useCallback(() => write((prev) => (prev.length ? EMPTY : prev)), []);
  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      ready,
      count: lines.reduce((n, l) => n + l.quantity, 0),
      subtotal: lines.reduce((n, l) => n + l.quantity * l.price, 0),
      isOpen,
      open,
      close,
      add,
      setQuantity,
      remove,
      clear,
    }),
    [lines, ready, isOpen, open, close, add, setQuantity, remove, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
