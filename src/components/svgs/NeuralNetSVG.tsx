"use client";

interface NeuralNetSVGProps {
  className?: string;
  size?: number;
  animated?: boolean;
}

export default function NeuralNetSVG({
  className = "",
  size = 200,
  animated = true,
}: NeuralNetSVGProps) {
  const nodes = {
    input:  [{ x: 30, y: 40 }, { x: 30, y: 80 }, { x: 30, y: 120 }, { x: 30, y: 160 }],
    hidden: [{ x: 100, y: 55 }, { x: 100, y: 100 }, { x: 100, y: 145 }],
    output: [{ x: 170, y: 75 }, { x: 170, y: 125 }],
  };

  const connections: [number, number, number, number][] = [];
  nodes.input.forEach((inp) =>
    nodes.hidden.forEach((hid) =>
      connections.push([inp.x, inp.y, hid.x, hid.y])
    )
  );
  nodes.hidden.forEach((hid) =>
    nodes.output.forEach((out) =>
      connections.push([hid.x, hid.y, out.x, out.y])
    )
  );

  return (
    <svg
      width={size}
      height={(size * 200) / 200}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Neural network visualization"
    >
      <defs>
        <radialGradient id="nodeGrad" cx="30%" cy="30%">
          <stop offset="0%" stopColor="#FFF176" />
          <stop offset="100%" stopColor="#FDD835" />
        </radialGradient>
        <radialGradient id="outputGrad" cx="30%" cy="30%">
          <stop offset="0%" stopColor="#BACBFF" />
          <stop offset="100%" stopColor="#4C6EF5" />
        </radialGradient>
        {animated && (
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        )}
      </defs>

      {/* Connections */}
      {connections.map(([x1, y1, x2, y2], i) => (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="rgba(76,110,245,0.18)"
          strokeWidth="1"
        />
      ))}

      {/* Animated signal pulses */}
      {animated &&
        connections.slice(0, 6).map(([x1, y1, x2, y2], i) => (
          <circle key={`pulse-${i}`} r="3" fill="#FDD835" opacity="0.9" filter="url(#glow)">
            <animateMotion
              dur={`${1.4 + i * 0.3}s`}
              repeatCount="indefinite"
              begin={`${i * 0.25}s`}
            >
              <mpath
                href={`#path-${i}`}
              />
            </animateMotion>
          </circle>
        ))}

      {/* Input nodes */}
      {nodes.input.map((n, i) => (
        <circle
          key={`in-${i}`}
          cx={n.x}
          cy={n.y}
          r="10"
          fill="url(#nodeGrad)"
          stroke="#C49A00"
          strokeWidth="1.5"
          filter={animated ? "url(#glow)" : undefined}
        />
      ))}

      {/* Hidden nodes */}
      {nodes.hidden.map((n, i) => (
        <g key={`hid-${i}`}>
          <circle cx={n.x} cy={n.y} r="12" fill="url(#nodeGrad)" stroke="#C49A00" strokeWidth="1.5" />
          {animated && (
            <circle cx={n.x} cy={n.y} r="12" fill="none" stroke="#FDD835" strokeWidth="1" opacity="0.5">
              <animate
                attributeName="r"
                values="12;18;12"
                dur={`${2 + i * 0.4}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.5;0;0.5"
                dur={`${2 + i * 0.4}s`}
                repeatCount="indefinite"
              />
            </circle>
          )}
        </g>
      ))}

      {/* Output nodes */}
      {nodes.output.map((n, i) => (
        <circle
          key={`out-${i}`}
          cx={n.x}
          cy={n.y}
          r="14"
          fill="url(#outputGrad)"
          stroke="#3A56DB"
          strokeWidth="1.5"
        />
      ))}

      {/* Layer labels */}
      <text x="30" y="190" textAnchor="middle" fontSize="9" fill="rgba(26,26,46,0.45)" fontFamily="JetBrains Mono, monospace">input</text>
      <text x="100" y="190" textAnchor="middle" fontSize="9" fill="rgba(26,26,46,0.45)" fontFamily="JetBrains Mono, monospace">hidden</text>
      <text x="170" y="190" textAnchor="middle" fontSize="9" fill="rgba(26,26,46,0.45)" fontFamily="JetBrains Mono, monospace">output</text>

      {/* Image pixel grid on output nodes (generative AI metaphor) */}
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2, 3].map((col) => (
          <rect
            key={`px-${row}-${col}`}
            x={157 + col * 4}
            y={80 + row * 4}
            width="3"
            height="3"
            rx="0.5"
            fill={
              (row + col) % 3 === 0
                ? "#FDD835"
                : (row + col) % 3 === 1
                ? "#4C6EF5"
                : "#FF6B35"
            }
            opacity="0.6"
          />
        ))
      )}
    </svg>
  );
}
