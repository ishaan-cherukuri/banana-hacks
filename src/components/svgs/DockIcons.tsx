"use client";

/**
 * Line-art widget icons for the dock / desktop / window chrome.
 * Black (studio-ink) outlines with subtle color accents, replaces emoji.
 */

interface IconProps {
  className?: string;
  size?: number;
}

const INK = "#191A17";

function Base({ size = 22, className = "", children, label }: IconProps & { children: React.ReactNode; label: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={label}
      stroke={INK}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

/** About → banana */
export function BananaLineIcon(props: IconProps) {
  return (
    <Base {...props} label="About">
      <path d="M5 6c0 6 4 11 11 12.5 1.6.3 2.6-.2 2.9-1.2.2-.8-.2-1.4-1-1.6-5.6-1.4-9.4-5.4-9.9-10.2C7.9 4.4 7.4 4 6.7 4.2 5.6 4.5 5 5 5 6Z" fill="#FDD835" />
      <path d="M5 6c-.4-.7-.4-1.4 0-1.8" />
      <path d="M18.9 17.3c.9-.1 1.5-.5 1.8-1.2" />
    </Base>
  );
}

/** AI Studio → palette */
export function PaletteLineIcon(props: IconProps) {
  return (
    <Base {...props} label="AI Studio">
      <path d="M12 3.5c-4.7 0-8.5 3.5-8.5 7.9 0 4.3 3.4 6.9 6.6 6.9 1.4 0 1.9-1 1.9-1.8 0-.5-.2-.8-.2-1.3 0-1 .8-1.7 1.8-1.7h1.4c2.8 0 4.5-1.9 4.5-4.6C19.5 6.5 16.1 3.5 12 3.5Z" fill="white" />
      <circle cx="8" cy="9" r="1.1" fill="#2C7466" stroke="none" />
      <circle cx="12" cy="7.2" r="1.1" fill="#E2542A" stroke="none" />
      <circle cx="15.7" cy="9" r="1.1" fill="#2E7D32" stroke="none" />
      <circle cx="16.5" cy="12.6" r="1.1" fill="#FDD835" stroke="none" />
    </Base>
  );
}

/** Schedule → calendar */
export function CalendarLineIcon(props: IconProps) {
  return (
    <Base {...props} label="Schedule">
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" fill="white" />
      <path d="M3.5 9h17" />
      <path d="M8 3.5v3M16 3.5v3" />
      <path d="M7.5 13h2M14.5 13h2M7.5 16.5h2M14.5 16.5h2" stroke="#2C7466" />
    </Base>
  );
}

/** Prizes → medal */
export function MedalLineIcon(props: IconProps) {
  return (
    <Base {...props} label="Prizes">
      <path d="M8.5 3.5l3.5 6 3.5-6" stroke="#E2542A" />
      <circle cx="12" cy="15" r="5.5" fill="#FDD835" />
      <path d="M12 12.4l.9 1.8 2 .3-1.45 1.4.35 2-1.8-.95-1.8.95.35-2L9.1 14.5l2-.3.9-1.8Z" fill="white" stroke={INK} strokeWidth="1" />
    </Base>
  );
}

/** Apply → document + pencil */
export function ApplyLineIcon(props: IconProps) {
  return (
    <Base {...props} label="Register">
      <path d="M6 3.5h7l5 5v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" fill="white" />
      <path d="M13 3.5V8.5h5" />
      <path d="M8 12.5h5M8 15.5h8M8 18h5" stroke="#2C7466" />
    </Base>
  );
}

/** FAQ → question bubble */
export function QuestionLineIcon(props: IconProps) {
  return (
    <Base {...props} label="FAQ">
      <path d="M4 6.5a2.5 2.5 0 0 1 2.5-2.5h11A2.5 2.5 0 0 1 20 6.5v7A2.5 2.5 0 0 1 17.5 16H10l-4 3.5V16h-.5A1.5 1.5 0 0 1 4 14.5v-8Z" fill="white" />
      <path d="M9.7 8.6a2.3 2.3 0 0 1 4.4.8c0 1.6-2.1 1.9-2.1 3.2" stroke="#E2542A" />
      <circle cx="12" cy="14.4" r=".4" fill="#E2542A" stroke="#E2542A" strokeWidth=".8" />
    </Base>
  );
}

/** Sponsors → heart */
export function HeartLineIcon(props: IconProps) {
  return (
    <Base {...props} label="Sponsors">
      <path d="M12 19.5C6.5 16 4 12.8 4 9.5 4 7 5.9 5.3 8.1 5.3c1.5 0 2.9.8 3.9 2.2 1-1.4 2.4-2.2 3.9-2.2C18.1 5.3 20 7 20 9.5c0 3.3-2.5 6.5-8 10Z" fill="#FDD835" />
    </Base>
  );
}

/** GPU Credits → bolt */
export function BoltLineIcon(props: IconProps) {
  return (
    <Base {...props} label="GPU Credits">
      <path d="M13 3 5.5 13H11l-1 8 8.5-10.5H13l0-7.5Z" fill="#FDD835" />
    </Base>
  );
}

/** Workshops → mortarboard */
export function CapLineIcon(props: IconProps) {
  return (
    <Base {...props} label="Workshops">
      <path d="M2.5 8.5 12 4.5l9.5 4-9.5 4-9.5-4Z" fill="#2C7466" />
      <path d="M6.5 10.5v4c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5v-4" fill="white" />
      <path d="M21.5 8.5v4.5" />
    </Base>
  );
}

/** Builders → globe */
export function GlobeLineIcon(props: IconProps) {
  return (
    <Base {...props} label="Builders">
      <circle cx="12" cy="12" r="8.5" fill="white" />
      <path d="M3.5 12h17" stroke="#2E7D32" />
      <path d="M12 3.5c2.5 2.3 3.8 5.3 3.8 8.5S14.5 18.2 12 20.5C9.5 18.2 8.2 15.2 8.2 12S9.5 5.8 12 3.5Z" stroke="#2E7D32" />
    </Base>
  );
}

/** Get Info → the OS "info" mark: who made this, how to reach them. */
export function InfoLineIcon(props: IconProps) {
  return (
    <Base {...props} label="Get Info">
      <circle cx="12" cy="12" r="8.5" fill="#FDD835" />
      <path d="M12 11v5" />
      <path d="M12 8.2v.6" />
    </Base>
  );
}

/** Organizers → two people */
export function PeopleLineIcon(props: IconProps) {
  return (
    <Base {...props} label="Organizers">
      <circle cx="9" cy="8" r="3" fill="#FDD835" />
      <circle cx="16.5" cy="9" r="2.5" fill="#B8D8D0" />
      <path d="M3.5 20c.4-4.1 2.4-6.2 5.5-6.2s5.1 2.1 5.5 6.2" fill="white" />
      <path d="M13.2 14.7c1-.8 2.1-1.2 3.3-1.2 2.5 0 4 1.8 4.3 5.2" />
    </Base>
  );
}

export const DOCK_ICON_MAP: Record<string, (p: IconProps) => React.JSX.Element> = {
  info:     InfoLineIcon,
  about:    BananaLineIcon,
  sketch:   PaletteLineIcon,
  schedule: CalendarLineIcon,
  prizes:   MedalLineIcon,
  apply:    ApplyLineIcon,
  faq:      QuestionLineIcon,
  sponsors: HeartLineIcon,
  organizers: PeopleLineIcon,
};
