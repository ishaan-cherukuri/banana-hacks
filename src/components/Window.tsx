"use client";

import { useRef, useState, useCallback, useEffect, ReactNode } from "react";

interface WindowProps {
  id: string;
  title: string;
  icon?: string;
  children: ReactNode;
  initialX?: number;
  initialY?: number;
  initialW?: number;
  initialH?: number;
  zIndex: number;
  onFocus: () => void;
  onClose: () => void;
}

export default function Window({
  id,
  title,
  icon = "📄",
  children,
  initialX = 100,
  initialY = 60,
  initialW = 640,
  initialH = 480,
  zIndex,
  onFocus,
  onClose,
}: WindowProps) {
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
      if (isMaximized) return;
      // Don't start drag if clicking traffic light buttons
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
    [isMaximized, onFocus, pos]
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
          w: Math.max(320, resizeRef.current.startW + dw),
          h: Math.max(240, resizeRef.current.startH + dh),
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

  const style: React.CSSProperties = isMaximized
    ? { position: "fixed", left: 52, top: 36, right: 0, bottom: 0, width: "auto", height: "auto", zIndex }
    : { position: "fixed", left: pos.x, top: pos.y, width: size.w, height: size.h, zIndex };

  if (minimized) return null;

  return (
    <div
      ref={windowRef}
      style={style}
      className={`window-chrome flex flex-col overflow-hidden animate-bounce-in`}
      onMouseDown={onFocus}
    >
      {/* Title bar */}
      <div
        className="flex items-center px-3 h-9 shrink-0 cursor-grab active:cursor-grabbing border-b border-studio-ink/06"
        style={{ background: "rgba(255,251,240,0.98)" }}
        onMouseDown={onTitleMouseDown}
        onDoubleClick={toggleMaximize}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5 mr-3">
          <button
            className="w-3 h-3 rounded-full bg-[#FF5F57] hover:brightness-90 border border-[#E0443E] transition-all"
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            onMouseDown={(e) => e.stopPropagation()}
            aria-label="Close window"
          />
          <button
            className="w-3 h-3 rounded-full bg-[#FEBC2E] hover:brightness-90 border border-[#D4960A] transition-all"
            onClick={(e) => { e.stopPropagation(); setMinimized(true); }}
            onMouseDown={(e) => e.stopPropagation()}
            aria-label="Minimize window"
          />
          <button
            className="w-3 h-3 rounded-full bg-[#28C840] hover:brightness-90 border border-[#1AAB29] transition-all"
            onClick={(e) => { e.stopPropagation(); toggleMaximize(); }}
            onMouseDown={(e) => e.stopPropagation()}
            aria-label="Maximize window"
          />
        </div>

        {/* Title */}
        <div className="flex-1 flex items-center justify-center gap-1.5 pointer-events-none">
          <span className="text-sm">{icon}</span>
          <span className="text-sm font-display font-semibold text-studio-ink/75 truncate">
            {title}
          </span>
        </div>

        {/* Right spacer */}
        <div className="w-[54px]" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>

      {/* Resize handle */}
      {!isMaximized && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize opacity-30 hover:opacity-70 transition-opacity"
          onMouseDown={onResizeMouseDown}
          style={{
            background: "linear-gradient(135deg, transparent 50%, rgba(26,26,46,0.5) 50%)",
            borderRadius: "0 0 12px 0",
          }}
        />
      )}
    </div>
  );
}
