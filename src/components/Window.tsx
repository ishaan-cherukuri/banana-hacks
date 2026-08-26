"use client";

import { useRef, useState, useCallback, useEffect, ReactNode } from "react";
import { useIsMobile } from "@/lib/useIsMobile";

interface WindowProps {
  id: string;
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  initialX?: number;
  initialY?: number;
  initialW?: number;
  initialH?: number;
  zIndex: number;
  /** Drives the accent shadow on the active window. */
  focused?: boolean;
  onFocus: () => void;
  onClose: () => void;
}

export default function Window({
  id,
  title,
  icon,
  children,
  initialX = 100,
  initialY = 60,
  initialW = 640,
  initialH = 480,
  zIndex,
  focused = false,
  onFocus,
  onClose,
}: WindowProps) {
  const isMobile = useIsMobile();
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const [size, setSize] = useState({ w: initialW, h: initialH });
  const [isMaximized, setIsMaximized] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [prevState, setPrevState] = useState({ pos, size });

  const dragRef  = useRef<{ startX: number; startY: number; startPosX: number; startPosY: number } | null>(null);
  const resizeRef = useRef<{ startX: number; startY: number; startW: number; startH: number } | null>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  /* ── Drag ─────────────────────────────────────────────── */
  const onTitleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (isMaximized || isMobile) return;
      // Don't start drag if clicking a window-control button
      if ((e.target as HTMLElement).closest("button")) return;
      e.preventDefault();
      onFocus();
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        startPosX: pos.x,
        startPosY: pos.y,
      };

      const onMove = (ev: MouseEvent) => {
        if (!dragRef.current) return;
        const dx = ev.clientX - dragRef.current.startX;
        const dy = ev.clientY - dragRef.current.startY;
        setPos({
          x: Math.max(52, dragRef.current.startPosX + dx),
          y: Math.max(36, dragRef.current.startPosY + dy),
        });
      };
      const onUp = () => {
        dragRef.current = null;
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [isMaximized, isMobile, onFocus, pos]
  );

  /* ── Resize ───────────────────────────────────────────── */
  const onResizeMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      resizeRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        startW: size.w,
        startH: size.h,
      };
      const onMove = (ev: MouseEvent) => {
        if (!resizeRef.current) return;
        const dw = ev.clientX - resizeRef.current.startX;
        const dh = ev.clientY - resizeRef.current.startY;
        setSize({
          w: Math.min(Math.max(320, resizeRef.current.startW + dw), Math.floor(window.innerWidth  * 0.90)),
          h: Math.min(Math.max(240, resizeRef.current.startH + dh), Math.floor(window.innerHeight * 0.90)),
        });
      };
      const onUp = () => {
        resizeRef.current = null;
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [size]
  );

  /* ── Maximize / Restore ───────────────────────────────── */
  const toggleMaximize = () => {
    if (isMaximized) {
      setPos(prevState.pos);
      setSize(prevState.size);
      setIsMaximized(false);
    } else {
      setPrevState({ pos, size });
      setPos({ x: 52, y: 36 });
      setSize({ w: window.innerWidth - 52, h: window.innerHeight - 36 });
      setIsMaximized(true);
    }
  };

  const style: React.CSSProperties = isMobile
    ? {
        // Full-screen sheet on phones: fill the area between the menu bar and
        // the dock so nothing overflows horizontally.
        position: "fixed",
        left: 0,
        right: 0,
        top: 36,
        bottom: "calc(72px + env(safe-area-inset-bottom))",
        width: "auto",
        height: "auto",
        borderRadius: 0,
        zIndex,
      }
    : isMaximized
    ? { position: "fixed", left: 52, top: 36, right: 0, bottom: 0, width: "auto", height: "auto", zIndex }
    : { position: "fixed", left: pos.x, top: pos.y, width: size.w, height: size.h, zIndex };

  if (minimized) return null;

  return (
    <div
      ref={windowRef}
      style={style}
      className={`window-chrome flex flex-col overflow-hidden animate-bounce-in ${focused ? "is-focused" : ""}`}
      onMouseDown={onFocus}
    >
      {/* Title bar */}
      <div
        className="flex items-center px-2.5 h-9 shrink-0 cursor-grab active:cursor-grabbing"
        style={{
          background: focused ? "#FDD835" : "#F2EEE2",
          borderBottom: "1.5px solid #191A17",
        }}
        onMouseDown={onTitleMouseDown}
        onDoubleClick={toggleMaximize}
      >
        {/* Window controls. Squared and outlined rather than macOS
            traffic lights — a cloned OS chrome is its own kind of
            stock look, and the glyphs make the actions legible. */}
        <div className="flex items-center gap-1 mr-2.5">
          {([
            { label: "Close window",    glyph: "\u00d7", fill: "#E2542A", onClick: onClose },
            { label: "Minimize window", glyph: "\u2013", fill: "#F2EEE2", onClick: () => setMinimized(true) },
            { label: "Maximize window", glyph: "\u25a1", fill: "#F2EEE2", onClick: toggleMaximize },
          ] as const).map((b) => (
            <button
              key={b.label}
              className="w-[15px] h-[15px] rounded-[3px] flex items-center justify-center font-mono text-[9px] leading-none text-studio-ink hover:bg-studio-ink hover:text-banana-400 transition-colors"
              style={{ background: b.fill, border: "1.5px solid #191A17" }}
              onClick={(e) => { e.stopPropagation(); b.onClick(); }}
              onMouseDown={(e) => e.stopPropagation()}
              aria-label={b.label}
            >
              {b.glyph}
            </button>
          ))}
        </div>

        {/* Title */}
        <div className="flex-1 flex items-center gap-1.5 pointer-events-none min-w-0">
          {icon && <span className="flex items-center shrink-0">{icon}</span>}
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.10em] text-studio-ink truncate">
            {title}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>

      {/* Resize handle */}
      {!isMaximized && !isMobile && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
          onMouseDown={onResizeMouseDown}
          aria-hidden
        >
          <svg width="16" height="16" viewBox="0 0 16 16">
            <path
              d="M15 6 L6 15 M15 10 L10 15 M15 14 L14 15"
              stroke="#191A17"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.55"
            />
          </svg>
        </div>
      )}

    </div>
  );
}
