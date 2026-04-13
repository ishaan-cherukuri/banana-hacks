"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { GenerationBar } from "@/components/svgs/StudioDecorations";

const FAKE_OUTPUTS = [
  { label: "banana robot in a gallery",   gradient: "linear-gradient(135deg, #FDD835 0%, #FF6B35 50%, #4C6EF5 100%)" },
  { label: "neon jungle at dusk",          gradient: "linear-gradient(135deg, #1A1A2E 0%, #2E7D32 40%, #FDD835 100%)" },
  { label: "pixel cathedral, dawn light",  gradient: "linear-gradient(135deg, #FFEE82 0%, #FF6B35 60%, #1A1A2E 100%)" },
  { label: "impressionist AI studio",      gradient: "linear-gradient(135deg, #BACBFF 0%, #FDD835 50%, #4C6EF5 100%)" },
  { label: "surreal banana dreamscape",    gradient: "linear-gradient(135deg, #FDD835 0%, #FF6B35 30%, #BACBFF 100%)" },
];

const STYLE_PRESETS = [
  "Photorealistic", "Pixel Art", "Watercolor", "Oil Painting", "Anime", "Sketch", "Neon", "Impressionist",
];

const COLORS = ["#1A1A2E", "#FDD835", "#FF6B35", "#4C6EF5", "#2E7D32", "#E91E63", "#ffffff", "#888888"];
const WIDTHS  = [1, 3, 6, 12];

export default function SketchPanel() {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  // Use refs for drawing state — avoids stale closure problem in pointer event callbacks
  const isDrawing   = useRef(false);
  const lastPt      = useRef<{ x: number; y: number } | null>(null);
  const historyRef  = useRef<ImageData[]>([]);

  const [color,      setColor]      = useState("#1A1A2E");
  const [lineWidth,  setLineWidth]  = useState(3);
  const [eraser,     setEraser]     = useState(false);
  const [prompt,     setPrompt]     = useState("");
  const [style,      setStyle]      = useState("Photorealistic");
  const [generating, setGenerating] = useState(false);
  const [progress,   setProgress]   = useState(0);
  const [output,     setOutput]     = useState<typeof FAKE_OUTPUTS[0] | null>(null);

  const getCtx = () => canvasRef.current?.getContext("2d") ?? null;

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#FFFBF0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  useEffect(() => { initCanvas(); }, [initCanvas]);

  const getPos = (e: React.PointerEvent): { x: number; y: number } => {
    const canvas = canvasRef.current!;
    const rect   = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (canvas.width  / rect.width),
      y: (e.clientY - rect.top)  * (canvas.height / rect.height),
    };
  };

  const saveHistory = () => {
    const ctx    = getCtx();
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    historyRef.current = [
      ...historyRef.current.slice(-10),
      ctx.getImageData(0, 0, canvas.width, canvas.height),
    ];
  };

  const undo = () => {
    const ctx = getCtx();
    if (!ctx || historyRef.current.length === 0) return;
    const prev = historyRef.current.pop()!;
    ctx.putImageData(prev, 0, 0);
  };

  const clearCanvas = () => {
    saveHistory();
    initCanvas();
    setOutput(null);
  };

  /* ── Pointer handlers (all refs — no stale state) ─────── */
  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId); // keep events even if cursor leaves
    saveHistory();
    isDrawing.current = true;
    const pt = getPos(e);
    lastPt.current = pt;

    const ctx = getCtx();
    if (!ctx) return;
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, (eraser ? lineWidth * 2 : lineWidth) / 2, 0, Math.PI * 2);
    ctx.fillStyle = eraser ? "#FFFBF0" : color;
    ctx.fill();
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current || !lastPt.current) return;
    const ctx = getCtx();
    if (!ctx) return;
    const pt = getPos(e);
    ctx.beginPath();
    ctx.moveTo(lastPt.current.x, lastPt.current.y);
    ctx.lineTo(pt.x, pt.y);
    ctx.strokeStyle = eraser ? "#FFFBF0" : color;
    ctx.lineWidth   = eraser ? lineWidth * 3 : lineWidth;
    ctx.lineCap     = "round";
    ctx.lineJoin    = "round";
    ctx.stroke();
    lastPt.current = pt;
  };

  const onPointerUp = () => {
    isDrawing.current = false;
    lastPt.current    = null;
  };

  /* ── "Generate" ────────────────────────────────────────── */
  const handleGenerate = async () => {
    if (generating) return;
    setGenerating(true);
    setProgress(0);
    setOutput(null);
    for (let i = 0; i <= 20; i++) {
      await new Promise((r) => setTimeout(r, 75));
      setProgress(i * 5);
    }
    setOutput(FAKE_OUTPUTS[Math.floor(Math.random() * FAKE_OUTPUTS.length)]);
    setGenerating(false);
  };

  return (
    <div className="h-full flex bg-banana-100 overflow-hidden">
      {/* ── Canvas area ──────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <div className="flex items-center gap-3 px-4 py-2 border-b border-studio-ink/06 bg-white/60 shrink-0 flex-wrap">
          {/* Eraser toggle */}
          <button
            className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all ${
              eraser
                ? "bg-studio-ink text-white"
                : "bg-studio-ink/08 text-studio-ink/60 hover:bg-studio-ink/15"
            }`}
            onClick={() => setEraser((v) => !v)}
            title={eraser ? "Eraser (active)" : "Switch to eraser"}
          >
            {eraser ? "⬜" : "✏️"}
          </button>

          <div className="w-px h-5 bg-studio-ink/10 shrink-0" />

          {/* Colors */}
          <div className="flex gap-1 flex-wrap">
            {COLORS.map((c) => (
              <button
                key={c}
                title={c}
                className={`w-5 h-5 rounded-full border-2 transition-all hover:scale-110 ${
                  color === c && !eraser ? "border-studio-ink scale-110" : "border-transparent hover:border-studio-ink/30"
                }`}
                style={{ background: c }}
                onClick={() => { setColor(c); setEraser(false); }}
              />
            ))}
          </div>

          <div className="w-px h-5 bg-studio-ink/10 shrink-0" />

          {/* Brush sizes */}
          <div className="flex items-center gap-1.5">
            {WIDTHS.map((w) => (
              <button
                key={w}
                title={`${w}px`}
                className={`rounded-full transition-all ${
                  lineWidth === w ? "ring-2 ring-banana-400 ring-offset-1" : "opacity-40 hover:opacity-70"
                }`}
                style={{
                  width:      Math.max(8, w * 2),
                  height:     Math.max(8, w * 2),
                  background: "#1A1A2E",
                }}
                onClick={() => setLineWidth(w)}
              />
            ))}
          </div>

          <div className="ml-auto flex gap-2">
            <button
              className="text-xs font-mono text-studio-ink/50 hover:text-studio-ink px-2 py-1 rounded-lg hover:bg-studio-ink/06 transition-all"
              onClick={undo}
            >
              ↩ Undo
            </button>
            <button
              className="text-xs font-mono text-studio-ink/50 hover:text-red-500 px-2 py-1 rounded-lg hover:bg-red-50 transition-all"
              onClick={clearCanvas}
            >
              ✕ Clear
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 flex items-center justify-center bg-banana-50 p-4 overflow-hidden">
          <div
            className="relative shadow-window rounded-lg overflow-hidden bg-banana-100"
            style={{ width: "100%", maxWidth: 420, aspectRatio: "4/3" }}
          >
            <canvas
              ref={canvasRef}
              width={840}
              height={630}
              className="sketch-canvas block w-full h-full"
              style={{ touchAction: "none" }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            />
            {/* Hint when canvas is blank */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ opacity: historyRef.current.length > 0 ? 0 : 0.45, transition: "opacity 0.3s" }}
            >
              <div className="text-center">
                <div className="text-4xl mb-2">✏️</div>
                <p className="text-xs font-mono text-studio-ink/60">Draw something, then hit AI Generate</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Generation sidebar ────────────────────────────── */}
      <div className="w-56 flex flex-col border-l border-studio-ink/08 bg-white/40 shrink-0">
        <div className="flex-1 overflow-y-auto window-scroll p-4 space-y-4">
          {/* Prompt */}
          <div>
            <label className="block text-[10px] font-mono font-bold text-studio-ink/50 uppercase tracking-wider mb-1.5">
              Text Prompt
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="a banana robot in a neon gallery..."
              rows={3}
              className="w-full px-2.5 py-2 rounded-lg border border-studio-ink/10 bg-white text-xs font-body text-studio-ink placeholder:text-studio-ink/30 resize-none focus:outline-none focus:border-banana-400 focus:ring-2 focus:ring-banana-400/20 transition-all"
            />
          </div>

          {/* Style preset pills */}
          <div>
            <label className="block text-[10px] font-mono font-bold text-studio-ink/50 uppercase tracking-wider mb-1.5">
              Style
            </label>
            <div className="flex flex-wrap gap-1">
              {STYLE_PRESETS.map((s) => (
                <button
                  key={s}
                  className={`px-2 py-1 rounded-md text-[10px] font-mono font-medium transition-all ${
                    style === s
                      ? "bg-banana-400 text-studio-ink"
                      : "bg-studio-ink/06 text-studio-ink/55 hover:bg-banana-400/25 hover:text-studio-ink"
                  }`}
                  onClick={() => setStyle(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Generate button */}
          <button
            className="w-full py-2.5 rounded-xl font-display font-bold text-sm bg-banana-400 text-studio-ink hover:bg-banana-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-icon active:scale-95 flex items-center justify-center gap-1.5"
            onClick={handleGenerate}
            disabled={generating}
          >
            {generating ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-studio-ink/30 border-t-studio-ink rounded-full animate-spin inline-block" />
                Generating...
              </>
            ) : (
              "✨ AI Generate"
            )}
          </button>

          {/* Progress bar */}
          {generating && (
            <div className="space-y-1.5">
              <GenerationBar progress={progress} />
              <p className="text-[10px] font-mono text-studio-ink/45 text-center">
                Diffusion step {Math.round(progress / 5)} / 20
              </p>
            </div>
          )}

          {/* Generated output */}
          {output && !generating && (
            <div className="animate-bounce-in space-y-2">
              <p className="text-[10px] font-mono font-bold text-studio-ink/50 uppercase tracking-wider">
                Generated Output
              </p>
              <div
                className="w-full rounded-xl overflow-hidden shadow-icon"
                style={{ aspectRatio: "1", background: output.gradient }}
              >
                <div
                  className="w-full h-full"
                  style={{
                    background:
                      "repeating-linear-gradient(0deg,rgba(255,255,255,0.06) 0,transparent 1px,transparent 8px), repeating-linear-gradient(90deg,rgba(255,255,255,0.06) 0,transparent 1px,transparent 8px)",
                  }}
                />
              </div>
              <p className="text-[9px] font-mono text-studio-ink/40 text-center leading-relaxed">
                &ldquo;{prompt || output.label}&rdquo; · {style}
              </p>
              <div className="flex gap-1.5">
                <button
                  className="flex-1 py-1.5 text-[10px] font-mono font-bold rounded-lg bg-studio-ink/06 text-studio-ink/60 hover:bg-studio-ink/12 transition-all"
                  onClick={handleGenerate}
                >
                  🔄 Vary
                </button>
                <button className="flex-1 py-1.5 text-[10px] font-mono font-bold rounded-lg bg-banana-400/20 text-banana-700 hover:bg-banana-400/40 transition-all">
                  ⬇ Save
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="p-3 border-t border-studio-ink/06 shrink-0">
          <p className="text-[9px] font-mono text-studio-ink/35 text-center leading-relaxed">
            Demo mode · Real generation after registration
          </p>
        </div>
      </div>
    </div>
  );
}
