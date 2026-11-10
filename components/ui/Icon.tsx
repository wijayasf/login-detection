export type IconName = "camera" | "monitor" | "dashboard" | "settings" | "users" | "logs" | "diagnostics" | "search" | "play" | "pause" | "restart" | "power" | "plus" | "edit" | "trash" | "download" | "shield" | "logout" | "switch" | "lock" | "check" | "alert" | "clock" | "filter" | "eye" | "close" | "chevron";

const paths: Record<IconName, React.ReactNode> = {
  camera: <><path d="M3 8a2 2 0 0 1 2-2h2l1.5-2h7L17 6h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><circle cx="12" cy="12.5" r="3.5"/></>,
  monitor: <><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></>,
  dashboard: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1-2.9 2.9-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21h-4v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1-2.8-2.8.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3v-4h.1A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.3-1.8l-.1-.1L7 4.3l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3h4v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1L19.7 7l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21v4h-.1a1.7 1.7 0 0 0-1.5 1z"/></>,
  users: <><circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16 5.5a3 3 0 0 1 0 5M18 14.5c2 .8 3 2.6 3 5.5"/></>,
  logs: <><path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5"/></>,
  diagnostics: <><path d="M3 12h4l2-6 4 12 2-6h6"/><path d="M4 21h16"/></>,
  search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></>,
  play: <path d="M8 5v14l11-7z"/>, pause: <path d="M8 5v14M16 5v14"/>, restart: <><path d="M20 11a8 8 0 0 0-14-4L4 9M4 4v5h5"/><path d="M4 13a8 8 0 0 0 14 4l2-2M20 20v-5h-5"/></>,
  power: <><path d="M12 3v9"/><path d="M7 5.8a8 8 0 1 0 10 0"/></>, plus: <path d="M12 5v14M5 12h14"/>, edit: <><path d="m4 20 4.5-1 10-10-3.5-3.5-10 10zM13.5 6.5l3.5 3.5"/></>,
  trash: <><path d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13M10 11v5M14 11v5"/></>, download: <><path d="M12 4v11M7 11l5 5 5-5M5 20h14"/></>,
  shield: <><path d="M12 3 4 6v6c0 4.5 3 8 8 9 5-1 8-4.5 8-9V6z"/><path d="m9 12 2 2 4-4"/></>, logout: <><path d="M10 5H5v14h5M13 8l4 4-4 4M8 12h9"/></>, switch: <><path d="M7 7h12l-3-3M17 17H5l3 3"/></>,
  lock: <><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>, check: <path d="m5 12 4 4L19 6"/>,
  alert: <><path d="M12 3 2.5 20h19z"/><path d="M12 9v5M12 17.5v.1"/></>, clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  filter: <path d="M4 5h16l-6 7v6l-4 2v-8z"/>, eye: <><path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="2.5"/></>,
  close: <path d="m6 6 12 12M18 6 6 18"/>, chevron: <path d="m9 6 6 6-6 6"/>,
};

export default function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
